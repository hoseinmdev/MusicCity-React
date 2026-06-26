import { TRACK_PAGE } from "@/pathes";
import type { ITrack } from "@/redux/Tracks/TracksSlice";
import React from "react";
import { AiFillPlayCircle, AiOutlinePause } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { setCurrentTrack, setQueue } from "@/redux/Player/PlayerSlice";

interface TrackBoxProps extends ITrack {
  queue?: ITrack[];
}

const TrackBox: React.FC<TrackBoxProps> = (props) => {
  const { musicName, singer, imageUrl, url, id, queue: contextQueue } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { tracks } = useSelector((state: RootState) => state.tracks);
  const { currentTrack, isPlaying } = useSelector(
    (state: RootState) => state.player,
  );

  const isActive = currentTrack?.id === id;

  const handleClick = () => {
    dispatch(setCurrentTrack({ id, musicName, singer, imageUrl, url }));
    dispatch(setQueue(contextQueue ?? tracks));
  };

  return (
    <Link
      to={`/${TRACK_PAGE}/${id}`}
      state={{ url, imageUrl, musicName, singer }}
      onClick={handleClick}
      className="group/trackBox relative flex w-32 flex-col items-start justify-between gap-2 text-sm dark:text-white lg:w-auto lg:cursor-pointer lg:text-base"
    >
      <img
        className={`h-full w-full rounded-lg transition-all hover:brightness-75 dark:hover:opacity-70 ${
          isActive ? "brightness-75 dark:opacity-70" : ""
        }`}
        src={imageUrl}
        alt=""
      />
      <p className={isActive ? "font-semibold" : ""}>{musicName}</p>
      <p className="dark:opacity-60">{singer}</p>
      <div
        className={`absolute right-1 hidden text-white opacity-0 transition-all hover:scale-105 group-hover/trackBox:opacity-100 lg:block lg:group-hover/trackBox:bottom-[4.25rem] ${
          isActive
            ? "!block animate-pulse text-2xl opacity-100 lg:bottom-[5.5rem] lg:right-9"
            : "bottom-[-5px] text-6xl"
        }`}
      >
        {isActive && isPlaying ? (
          <AiOutlinePause />
        ) : (
          <AiFillPlayCircle />
        )}
      </div>
    </Link>
  );
};

export default TrackBox;

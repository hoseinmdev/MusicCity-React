import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { TRACK_PAGE } from "@/pathes";
import type { ITrack } from "@/redux/Tracks/TracksSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { setCurrentTrack, setQueue } from "@/redux/Player/PlayerSlice";

interface TrackLineProps extends ITrack {
  queue?: ITrack[];
}

const TrackLine: React.FC<TrackLineProps> = (props) => {
  const { musicName, singer, imageUrl, url, id, queue: contextQueue } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { playlist } = useParams();
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
      to={`/${TRACK_PAGE}/${id}${playlist ? "/" + playlist : ""}`}
      state={{ url, imageUrl, musicName, singer }}
      onClick={handleClick}
      className={`flex min-h-[4rem] w-full items-center justify-between overflow-hidden rounded-md bg-neutral-300 hover:bg-gray-400/20 dark:bg-gray-200/10 dark:text-white dark:hover:bg-gray-200/50 lg:cursor-pointer ${
        isActive ? "!bg-gray-200/50 dark:!bg-white/20" : ""
      }`}
    >
      <div className="flex w-full items-center justify-start gap-3 lg:gap-4">
        <img className="h-16 w-16 flex-shrink-0 object-cover" src={imageUrl} alt="" />
        <div className="hidden text-sm lg:block">
          {isActive && isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <div className="flex w-full items-center justify-between pr-2 lg:gap-20 lg:pr-10">
          <p className={isActive ? "font-semibold" : ""}>{musicName}</p>
          <p className="dark:opacity-60">{singer}</p>
        </div>
      </div>
    </Link>
  );
};

export default TrackLine;

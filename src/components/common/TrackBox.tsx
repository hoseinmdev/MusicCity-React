import { TRACK_PAGE } from "@/pathes";
import { ITrack } from "@/redux/Tracks/TracksSlice";
import PlayedTrack from "@/utils/getTrackFromUrl";
import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const TrackBox: React.FC<ITrack> = ({
  musicName,
  singer,
  imageUrl,
  url,
  id,
}) => {
  const playingTrack = PlayedTrack();

  return (
    <Link
      to={`/${TRACK_PAGE}/${id}`}
      state={{ url }}
      className={`group/trackBox relative flex w-32  flex-col items-start justify-between gap-2 text-sm text-white lg:w-auto lg:lg:cursor-pointer lg:text-base`}
    >
      <img
        className={`h-full w-full rounded-lg hover:opacity-70 ${
          playingTrack?.musicName === musicName ? "brightness-75" : ""
        }`}
        src={imageUrl}
        alt=""
      />
      <p className="">{musicName}</p>
      <p className="opacity-60">{singer}</p>
      <button
        className={`absolute bottom-[-5px] right-1 hidden text-6xl opacity-0 hover:scale-105 group-hover/trackBox:opacity-100 lg:block lg:group-hover/trackBox:bottom-[4.25rem] ${
          playingTrack?.musicName === musicName
            ? "bottom-[5.5rem] right-9 !block animate-pulse text-2xl opacity-100"
            : ""
        } `}
      >
        <AiFillPlayCircle />
      </button>
    </Link>
  );
};
export default TrackBox;

import React from "react";
import { FaPlay } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import PlayedTrack from "@/utils/getTrackFromUrl";
import { TRACK_PAGE } from "@/pathes";
import { ITrack } from "@/redux/Tracks/TracksSlice";

const TrackLine: React.FC<ITrack> = ({
  musicName,
  singer,
  imageUrl,
  url,
  id,
}) => {
  const { playlist } = useParams();
  const playingTrack = PlayedTrack();
  return (
    <Link
      to={`/${TRACK_PAGE}/${id}${playlist ? "/" + playlist : ""}`}
      state={{ url }}
      className={`flex min-h-[4rem] w-full items-center justify-between dark:text-white overflow-hidden rounded-md bg-neutral-300 dark:bg-gray-200/10 hover:bg-gray-400/20 dark:hover:bg-gray-200/50 lg:cursor-pointer ${
        playingTrack?.musicName === musicName ? "bg-gray-200/50" : ""
      }`}
    >
      <div className="flex w-full items-center justify-start gap-3 lg:w-full lg:justify-center lg:gap-4">
        <img className="h-full w-16" src={imageUrl} alt="" />
        <div className="hidden lg:block">
          <FaPlay />
        </div>
        <div className="flex w-full items-center justify-between pr-2 lg:gap-20 lg:pr-10">
          <p>{musicName}</p>
          <p className="dark:opacity-60">{singer}</p>
        </div>
      </div>
    </Link>
  );
};
export default TrackLine;

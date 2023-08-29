import { TRACK_PAGE } from "@/pathes";
import PlayedTrack from "@/utils/trackToPlay";
import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

type TrackBoxProps = {
  musicName: string;
  singer: string;
  imageUrl: string;
  url: string;
};

const TrackBox: React.FC<TrackBoxProps> = ({
  musicName,
  singer,
  imageUrl,
  url,
}) => {
  const playingTrack = PlayedTrack();

  return (
    <Link
      to={`/${TRACK_PAGE}/${musicName}`}
      state={{ url }}
      className={`group/trackBox relative flex w-32  cursor-pointer flex-col items-start justify-between gap-2 text-sm text-white lg:w-auto lg:text-base`}
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

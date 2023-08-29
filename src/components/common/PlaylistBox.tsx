import { PLAYLIST_PAGE } from "@/pathes";
import React from "react";
import { Link } from "react-router-dom";

type PlaylistBoxProps = {
  title: string;
  imageUrl: string;
  followers: number;
};

const PlaylistBox: React.FC<PlaylistBoxProps> = ({
  title,
  imageUrl,
  followers,
}) => {
  return (
    <Link
      to={`/${PLAYLIST_PAGE}/${title}`}
      className="flex lg:cursor-pointer flex-col items-center justify-between gap-2 text-base text-white hover:opacity-70 "
    >
      <img className="rounded-xl" src={imageUrl} alt="" />
      <p className="text-sm lg:text-base">{title}</p>
      <p className="opacity-60">followers: {followers + "k"}</p>
    </Link>
  );
};
export default PlaylistBox;

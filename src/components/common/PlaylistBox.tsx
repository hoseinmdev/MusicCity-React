import { PLAYLIST_PAGE } from "@/pathes";
import { IPlaylist } from "@/redux/Playlists/PlaylistsSlice";
import React from "react";
import { Link } from "react-router-dom";


const PlaylistBox: React.FC<IPlaylist> = ({
  id,
  title,
  imageUrl,
  followers,
}) => {
  return (
    <Link
      to={`/${PLAYLIST_PAGE}/${id}`}
      className="flex flex-col items-center justify-between gap-2 text-base hover:brightness-75 dark:text-white dark:hover:opacity-70 lg:lg:cursor-pointer "
    >
      <img className="rounded-xl" src={imageUrl} alt="" />
      <p className="text-sm lg:text-base">{title}</p>
      <p className="text-sm lg:text-base dark:opacity-60">followers: {followers + "k"}</p>
    </Link>
  );
};
export default PlaylistBox;

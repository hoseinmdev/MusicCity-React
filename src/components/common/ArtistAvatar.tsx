import { SINGLE_ARTIST_PAGE } from "@/pathes";
import { IArtist } from "@/redux/Artists/ArtistsSlice";
import React from "react";
import { useMediaPredicate } from "react-media-hook";
import { Link } from "react-router-dom";

const ArtistAvatar: React.FC<IArtist> = ({ followers, id, imageUrl, name }) => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");

  return (
    <Link
      to={`/${SINGLE_ARTIST_PAGE}/${id}`}
      className="flex  flex-col items-center justify-between gap-2 text-sm text-white  lg:text-base"
    >
      <img
        className="h-full w-full rounded-full hover:opacity-70"
        src={imageUrl}
        alt=""
      />
      {isMobile ? (
        <p className="text-sm">
          {name.length <= 10 ? name : name.slice(0, 9) + "... "}
        </p>
      ) : (
        <p className="text-base">
          {name.length <= 15 ? name : name.slice(0, 14) + "... "}
        </p>
      )}

      <p className="text-xs opacity-60">{followers}k followers</p>
    </Link>
  );
};
export default ArtistAvatar;

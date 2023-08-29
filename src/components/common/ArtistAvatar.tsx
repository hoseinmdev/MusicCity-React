import { SINGLE_ARTIST_PAGE } from "@/pathes";
import React from "react";
import { useMediaPredicate } from "react-media-hook";
import { Link } from "react-router-dom";

type ArtistAvatarProps = {
  title: string;
  followers: number;
  imageUrl: string;
};

const ArtistAvatar: React.FC<ArtistAvatarProps> = ({
  title,
  followers,
  imageUrl,
}) => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");

  return (
    <Link
      to={`/${SINGLE_ARTIST_PAGE}/${title}`}
      className="flex  flex-col items-center justify-between gap-2 text-sm text-white  lg:text-base"
    >
      <img
        className="h-full w-full rounded-full hover:opacity-70"
        src={imageUrl}
        alt=""
      />
      {isMobile ? (
        <p className="text-sm">
          {title.length <= 10 ? title : title.slice(0, 9) + "... "}
        </p>
      ) : (
        <p className="text-base">
          {title.length <= 15 ? title : title.slice(0, 14) + "... "}
        </p>
      )}

      <p className="text-xs opacity-60">{followers}k followers</p>
    </Link>
  );
};
export default ArtistAvatar;

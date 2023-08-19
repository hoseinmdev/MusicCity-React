import React from "react";

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
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-white">
      <img className="h-40 w-40 rounded-full hover:opacity-70" src={imageUrl} alt="" />
      <p>{title}</p>
      <p className="opacity-60">{followers}k followers</p>
    </div>
  );
};
export default ArtistAvatar;

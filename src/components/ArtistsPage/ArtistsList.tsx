import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { ArtistAvatar } from "../common";
import { useMediaPredicate } from "react-media-hook";

interface Artist {
  name: string;
  followers: number;
  imageUrl: string;
  genre:string
}
type ArtistsList = Artist[];

const ArtistsList: React.FC<{
  artists: ArtistsList;
  title: string;
  type: string;
}> = ({ artists, title , type}) => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");

  return (
    <div className="flex  w-full flex-col items-start gap-2">
      <p className="text-lg italic opacity-70 lg:text-2xl">• {title}</p>
      <Swiper
        className="w-full"
        spaceBetween={isMobile ? 10 : 30}
        slidesPerView={isMobile ? 3.4 : 9}
      >
        <div className="flex w-full lg:cursor-pointer justify-between gap-4">
          {artists.map((artist) => {
            if (artist.genre === type) {
              return (
                <SwiperSlide key={artist.name}>
                  <ArtistAvatar
                    title={artist.name}
                    followers={artist.followers}
                    imageUrl={artist.imageUrl}
                  />
                </SwiperSlide>
              );
            }
          })}
        </div>
      </Swiper>
    </div>
  );
};
export default ArtistsList;

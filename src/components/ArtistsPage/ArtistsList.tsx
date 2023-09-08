import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { ArtistAvatar } from "../common";
import { useMediaPredicate } from "react-media-hook";
import { IArtist } from "@/redux/Artists/ArtistsSlice";

const ArtistsList: React.FC<{
  artists: IArtist[];
  title: string;
  type: string;
}> = ({ artists, title, type }) => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");

  return (
    <div className="flex  w-full flex-col items-start gap-2">
      <p className="text-lg italic dark:opacity-70 lg:text-2xl dark:text-white">• {title}</p>
      <Swiper
        className="w-full"
        spaceBetween={isMobile ? 10 : 30}
        slidesPerView={isMobile ? 3.4 : 9}
      >
        <div className="flex w-full justify-between gap-4 lg:lg:cursor-pointer">
          {artists.map((artist) => {
            if (artist.genre === type) {
              return (
                <SwiperSlide key={artist.id}>
                  <ArtistAvatar {...artist} />  
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

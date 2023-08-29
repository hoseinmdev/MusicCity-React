import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { PlaylistBox } from "../common";
import { useMediaPredicate } from "react-media-hook";

interface PlayList {
  title: string;
  followers: number;
  imageUrl: string;
}
type PlayLists = PlayList[];

const PlayLists: React.FC<{ playLists: PlayLists; playListsTitle: string }> = ({
  playListsTitle,
  playLists,
}) => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <p className="text-lg italic opacity-70 lg:text-2xl">
        • {playListsTitle}
      </p>
      <Swiper
        className=" w-full lg:h-60"
        spaceBetween={20}
        slidesPerView={isMobile ? 2.5 : 8.5}
      >
        <div className="flex w-full justify-between gap-4">
          {playLists.map((playList) => {
            return (
              <SwiperSlide key={playList.title}>
                <PlaylistBox
                  title={playList.title}
                  followers={playList.followers}
                  imageUrl={playList.imageUrl}
                />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
};
export default PlayLists;

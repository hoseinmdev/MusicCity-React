import React from "react";
import { TrackBox } from "../common";
import { useMediaPredicate } from "react-media-hook";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ITrack } from "@/redux/Tracks/TracksSlice";

const TracksList: React.FC<{
  tracks: ITrack[];
  title: string;
  musicsState: string;
}> = ({ tracks, title, musicsState }) => {
  const isMobile = useMediaPredicate("(max-width: 767px)");
  const isDesktop = useMediaPredicate("(min-width: 1024px)");

  return (
    <div className="flex  w-full flex-col items-start gap-2 fadeShow2">
      <p className="text-lg italic dark:text-white dark:opacity-70 lg:text-2xl">• {title}</p>
      <Swiper
        className="h-auto w-[100%]"
        spaceBetween={isDesktop ? 30 : isMobile ? 10 : 16}
        slidesPerView={isDesktop ? 8 : isMobile ? 3.5 : 5.5}
      >
        <div className="flex w-full justify-between gap-4">
          {tracks.map((track) => {
            if (track.state === musicsState) {
              return (
                <SwiperSlide key={track.musicName}>
                  <TrackBox {...track} />
                </SwiperSlide>
              );
            }
          })}
        </div>
      </Swiper>
    </div>
  );
};
export default TracksList;

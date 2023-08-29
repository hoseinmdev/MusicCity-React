import React from "react";
import { TrackBox } from "../common";
import { useMediaPredicate } from "react-media-hook";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
interface Track {
  musicName: string;
  singer: string;
  imageUrl: string;
  url: string;
  state?: string;
}
type TracksList = Track[];

const TracksList: React.FC<{
  tracks: TracksList;
  title: string;
  musicsState: string;
}> = ({ tracks, title ,musicsState}) => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");

  return (
    <div className="flex  w-full flex-col items-start gap-2">
      <p className="text-lg italic opacity-70 lg:text-2xl">• {title}</p>
      <Swiper
        className="h-auto w-full"
        spaceBetween={isMobile ? 10 : 30}
        slidesPerView={isMobile ? 2.5 : 8}
      >
        <div className="flex w-full justify-between gap-4">
          {tracks.map((track) => {
            if (track.state === musicsState) {
              return (
                <SwiperSlide key={track.musicName}>
                  <TrackBox
                    singer={track.singer}
                    url={track.url}
                    musicName={track.musicName}
                    imageUrl={track.imageUrl}
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
export default TracksList;

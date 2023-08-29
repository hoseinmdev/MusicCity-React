import React from "react";
import { TrackBox, TrackLine } from "../common";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { useMediaPredicate } from "react-media-hook";

interface Track {
  musicName: string;
  singer: string;
  imageUrl: string;
  url: string;
  genre?: string;
  state?: string;
}

const MoreMusics: React.FC<{ allTracks: Track[] }> = ({ allTracks }) => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");

  const renderMoreTracks = () => {
    return allTracks.map((track) => {
      return (
        <TrackLine
          url={track.url}
          key={track.imageUrl}
          imageUrl={track.imageUrl}
          singer={track.singer}
          musicName={track.musicName}
        />
      );
    });
  };
  const renderMobileMoreTracks = () => {
    return (
      <Swiper className="h-auto w-full" spaceBetween={10} slidesPerView={2.2}>
        <div className="flex w-full justify-between gap-4">
          {allTracks.map((track) => {
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
          })}
        </div>
      </Swiper>
    );
  };

  return (
    <>
      <div className=" z-50 hidden max-h-full w-full scale-95 flex-col items-start justify-start gap-5 overflow-auto  rounded-md p-2 lg:flex">
        {renderMoreTracks()}
      </div>
      <div className="z-40 h-72 w-full rounded-xl pb-[20rem] lg:hidden">
        <p className="pb-2 opacity-70">More Musics...</p>
        {isMobile ? renderMobileMoreTracks() : ""}
      </div>
    </>
  );
};
export default MoreMusics;

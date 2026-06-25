import React from "react";
import { TrackBox, TrackLine } from "../common";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useMediaPredicate } from "react-media-hook";
import { ITrack } from "@/redux/Tracks/TracksSlice";

const MoreMusics: React.FC<{ allTracks: ITrack[] }> = ({ allTracks }) => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");

  return (
    <>
      {/* Desktop: vertical list */}
      <div className="fadeShow3 z-50 hidden max-h-full w-full flex-col items-start justify-start gap-2 overflow-auto rounded-xl p-2 lg:flex [&_a]:!bg-white/10 [&_a]:!text-white [&_a]:hover:!bg-white/20">
        <p className="pb-1 text-sm font-medium uppercase tracking-widest text-white/60">
          Up Next
        </p>
        {allTracks.slice(0, 15).map((track) => (
          <TrackLine key={track.id} {...track} />
        ))}
      </div>

      {/* Mobile: horizontal swiper */}
      <div className="z-40 w-full pb-[20rem] lg:hidden">
        <p className="pb-2 text-sm font-medium uppercase tracking-widest text-white/60">
          Up Next
        </p>
        {isMobile && (
          <Swiper className="h-auto w-full rounded-xl" spaceBetween={10} slidesPerView={2.5}>
            {allTracks.slice(0, 15).map((track) => (
              <SwiperSlide key={track.id}>
                <TrackBox {...track} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};
export default MoreMusics;

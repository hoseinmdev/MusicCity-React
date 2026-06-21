import React from "react";
import SiteLogo from "../common/SiteLogo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useMediaPredicate } from "react-media-hook";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import siteLogoDark from "@/assets/siteLogoDark.png";
import ThemeChangerButton from "./ThemeChangerButton";
import { TRACK_PAGE } from "@/pathes";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Slider: React.FC = () => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");
  const tracks = useSelector((state: RootState) => state.tracks.tracks);
  const slidesTracks = tracks.filter((t) => t.state === "top").slice(0, 5);

  return (
    <div className="fadeShow flex flex-col items-center justify-center">
      <div className="flex w-full items-center justify-between pl-4 lg:hidden">
        <div className="hidden dark:flex dark:justify-center">
          <SiteLogo />
        </div>
        <img className="w-36 dark:hidden lg:hidden" src={siteLogoDark} />
        <ThemeChangerButton />
      </div>
      <Swiper spaceBetween={20} slidesPerView={isMobile ? 1 : 3.85}>
        {slidesTracks.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="group/trackBox relative h-60 !w-[100%] !scale-[0.86] dark:text-white lg:h-72 lg:!w-[25%] lg:!scale-100"
          >
            <Link
              className="flex flex-col items-start justify-center gap-2"
              to={`/${TRACK_PAGE}/${slide.id}`}
              state={{ url: slide.url }}
            >
              <img
                className="h-48 w-full rounded-xl object-cover transition-opacity duration-300 hover:opacity-70 lg:h-56"
                src={slide.imageUrl}
                alt={slide.musicName}
              />
              <p className="">{slide.musicName}</p>
              <p className="dark:opacity-60">{slide.singer}</p>
              <button className="absolute bottom-5 right-2 text-6xl text-white opacity-0 hover:scale-110 group-hover/trackBox:bottom-24 group-hover/trackBox:opacity-100">
                <AiFillPlayCircle />
              </button>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Slider;

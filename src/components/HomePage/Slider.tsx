import React from "react";
import naserZeynali from "@/assets/Slider/NaserZeynaliSlider.jpg";
import masihArash from "@/assets/Slider/MasihArashSlider.jpg";
import mohsenYeganeh from "@/assets/Slider/MohsenYeganehSlider.jpg";
import aminRostami from "@/assets/Slider/AminRostamiSlider.jpg";
import MesleGol from "@/assets/Slider/MesleGol.jpg";
import SiteLogo from "../common/SiteLogo";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useMediaPredicate } from "react-media-hook";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
const allSlides = [
  {
    singer: "Amin Rostami",
    musicName: "Ba Mani",
    imageUrl: aminRostami,
  },
  {
    singer: "Masoud Sadeghloo",
    musicName: "Mesle Gol",
    imageUrl: MesleGol,
  },
  {
    singer: "Naser Zeynali",
    musicName: "Almas",
    imageUrl: naserZeynali,
  },
  {
    singer: "Mohsen Yeganeh",
    musicName: "Dele Tanha",
    imageUrl: mohsenYeganeh,
  },
  {
    singer: "Arash & Masih",
    musicName: "Jaddeh",
    imageUrl: masihArash,
  },
];

const Slider: React.FC = () => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full items-center justify-start pl-4 lg:hidden">
        <SiteLogo />
      </div>
      <Swiper spaceBetween={20} slidesPerView={isMobile ? 1 : 3.85}>
        {allSlides.map((slide) => {
          return (
            <SwiperSlide
              key={slide.singer}
              className="group/trackBox relative  h-60 !w-[100%] !scale-[0.86] text-white lg:h-72 lg:!w-[25%]  lg:!scale-100"
            >
              <Link
                className="flex flex-col items-start justify-center gap-2"
                to={`/track/${slide.musicName}`}
              >
                <img
                  className="rounded-xl  transition-opacity duration-300 hover:opacity-70"
                  src={slide.imageUrl}
                  alt=""
                />
                <p className="">{slide.musicName}</p>
                <p className="opacity-60">{slide.singer}</p>
                <button className="absolute  bottom-5 right-2 text-6xl opacity-0 hover:scale-110 group-hover/trackBox:bottom-24 group-hover/trackBox:opacity-100">
                  <AiFillPlayCircle />
                </button>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default Slider;
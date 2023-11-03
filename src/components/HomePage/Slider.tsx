import React from "react";
import naserZeynali from "@/assets/Slider/NaserZeynaliSlider.jpg";
import masihArash from "@/assets/Slider/MasihArashSlider.jpg";
import mohsenYeganeh from "@/assets/Slider/MohsenYeganehSlider.jpg";
import aminRostami from "@/assets/Slider/AminRostamiSlider.jpg";
import MesleGol from "@/assets/Slider/MesleGol.jpg";
import SiteLogo from "../common/SiteLogo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useMediaPredicate } from "react-media-hook";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import siteLogoDark from "@/assets/siteLogoDark.png";
import ThemeChangerButton from "./ThemeChangerButton";
import { TRACK_PAGE } from "@/pathes";
const allSlides = [
  {
    id: "947c1e721451e0f49d796d06aca267da",
    url: "https://cdnmrtehran.ir/media/mp3s/01/bda3567587_02bb288c1f31f80a848f0bcf4bb76be7.mp3",
    singer: "Amin Rostami",
    musicName: "Ba Mani",
    imageUrl: aminRostami,
  },
  {
    id: "2c28e2d39734d32f2d54b91fc5aaa94d",
    url: "https://cdnmrtehran.ir/media/mp3s/01/761fdd66bb_a454decb7354aa1d2e3d8d0898f80cb5.mp3",
    singer: "Masoud Sadeghloo",
    musicName: "Mesle Gol",
    imageUrl: MesleGol,
  },
  {
    id: "f4eb21f74bfd48398c95f45fc9cbe7a8",
    url: "https://cdnmrtehran.ir/media/mp3s/01/cc2a5f958a_827a2bbb5c93a692281e8ad62096714a.mp3",
    singer: "Naser Zeynali",
    musicName: "Almas",
    imageUrl: naserZeynali,
  },
  {
    id: "29ebd755dfcbbd87ead7dbeaf9815882",
    url: "https://cdnmrtehran.ir/media/mp3s/01/ecf9d637eb_7af200fbb242af83fbdac72f63b01e00.mp3",
    singer: "Mohsen Yeganeh",
    musicName: "Dele Tanha",
    imageUrl: mohsenYeganeh,
  },
  {
    id: "dcfbd53590b548d581ae2100016f5fa1",
    singer: "Arash & Masih",
    musicName: "Jaddeh",
    url: "https://cdnmrtehran.ir/media/mp3s/01/4d15b91225_808912982603643fa171f5a6033f30ff.mp3",
    imageUrl: masihArash,
  },
];

const Slider: React.FC = () => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");

  return (
    <div className="flex flex-col items-center justify-center fadeShow">
      <div className="flex w-full items-center justify-between pl-4 lg:hidden">
        <div className="hidden dark:flex dark:justify-center">
          <SiteLogo />
        </div>
        <img className="w-36 dark:hidden lg:hidden" src={siteLogoDark} />
        <ThemeChangerButton />
      </div>
      <Swiper spaceBetween={20} slidesPerView={isMobile ? 1 : 3.85}>
        {allSlides.map((slide) => {
          return (
            <SwiperSlide
              key={slide.singer}
              className="group/trackBox relative  h-60 !w-[100%] !scale-[0.86] dark:text-white lg:h-72 lg:!w-[25%]  lg:!scale-100"
            >
              <Link
                className="flex flex-col items-start justify-center gap-2"
                to={`/${TRACK_PAGE}/${slide.id}`}
                state={ slide.url }
              >
                <img
                  className="rounded-xl  transition-opacity duration-300 hover:opacity-70"
                  src={slide.imageUrl}
                  alt=""
                />
                <p className="">{slide.musicName}</p>
                <p className="dark:opacity-60">{slide.singer}</p>
                <button className="absolute bottom-5 right-2 text-6xl text-white opacity-0 hover:scale-110 group-hover/trackBox:bottom-24 group-hover/trackBox:opacity-100 ">
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

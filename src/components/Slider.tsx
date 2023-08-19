import React from "react";
import naserZeynali from "../assets/Slider/NaserZeynaliSlider.jpg";
import masihArash from "../assets/Slider/MasihArashSlider.jpg";
import mohsenYeganeh from "../assets/Slider/MohsenYeganehSlider.jpg";
import mahdiJahani from "../assets/Slider/MahdiJahaniSlider.jpg";
import SiteLogo from "./common/SiteLogo";

const allSlides = [
  {
    title: "ناصر زینلی",
    imageUrl: naserZeynali,
  },
  {
    title: "مسیح و آرش",
    imageUrl: masihArash,
  },
  {
    title: "محسن یگانه",
    imageUrl: mohsenYeganeh,
  },
  {
    title: "مهدی جهانی",
    imageUrl: mahdiJahani,
  },
];

const Slider: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full items-center justify-end p-2 lg:hidden">
        <SiteLogo />
      </div>
      <div className="flex w-full items-center justify-start gap-2 overflow-auto p-4 lg:justify-between">
        {allSlides.map((slide) => {
          return (
            <div className="flex min-w-fit flex-col items-start justify-center gap-4  text-white lg:w-full lg:min-w-min">
              <img className="rounded-xl" src={slide.imageUrl} alt="" />
              <p className="opacity-60">{slide.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Slider;

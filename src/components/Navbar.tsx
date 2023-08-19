import { FC } from "react";
import SiteLogo from "./common/SiteLogo";
import Footer from "./Footer";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineFire, AiOutlineHome, AiOutlineSearch } from "react-icons/ai";

const allRoutes = [
  {
    title: "خانه",
    icon: <AiOutlineHome />,
  },
  {
    title: "جدید ترین",
    icon: <AiOutlineFire />,
  },
  {
    title: "محبوب ترین",
    icon: <AiOutlineHeart />,
  },
  {
    title: "جستجو",
    icon: <AiOutlineSearch />,
  },
];



const Navbar: FC = () => {
  return (
    <div className="absolute bottom-0 flex w-full flex-row justify-between bg-neutral-800 lg:relative lg:h-screen lg:w-2/12 lg:flex-col">
      <div className="hidden lg:flex justify-center pt-4 scale-90">
        <SiteLogo />
      </div>
      <div className="flex h-full w-full flex-row items-center justify-center gap-1 lg:gap-2 p-2 lg:flex-col lg:items-end lg:justify-start lg:pt-8">
        {allRoutes.map((route) => {
          return (
            <button
              key={route.title}
              className="flex w-full flex-col  items-center justify-center gap-2 rounded-2xl text-lg text-white/50 transition duration-75 hover:text-white/100 lg:flex-row lg:justify-start lg:bg-gray-200/10  lg:p-2 lg:pr-4"
            >
              <div className="text-2xl">{route.icon}</div>
              <div className="text-sm lg:text-lg">{route.title}</div>
            </button>
          );
        })}
      </div>
      <div className="hidden lg:flex">
        <Footer />
      </div>
    </div>
  );
};

export default Navbar;

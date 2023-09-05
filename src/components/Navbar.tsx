import { FC } from "react";
import SiteLogo from "./common/SiteLogo";
import Footer from "./Footer";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineFire, AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { ARTISTS_PAGE, BROWSE_PAGE, HOME_PAGE, SEARCH_PAGE } from "@/pathes";

const allRoutes = [
  {
    title: "Home",
    icon: <AiOutlineHome />,
    path: HOME_PAGE,
  },
  {
    title: "Browse",
    icon: <AiOutlineFire />,
    path: `/${BROWSE_PAGE}`,
  },
  {
    title: "Artists",
    icon: <AiOutlineHeart />,
    path: `/${ARTISTS_PAGE}`,
  },
  {
    title: "Search",
    icon: <AiOutlineSearch />,
    path: `/${SEARCH_PAGE}`,
  },
];

const Navbar: FC = () => {
  return (
    <div className="fixed bottom-0 z-[1000] flex w-full flex-row justify-between bg-zinc-800 dark:bg-neutral-800 lg:relative lg:h-screen lg:w-2/12 lg:flex-col">
      <div className="hidden scale-90 justify-center pt-4 lg:flex">
        <SiteLogo />
      </div>
      <div className="flex h-full w-full flex-row items-center justify-center  lg:flex-col lg:items-end lg:justify-start lg:gap-2 lg:p-2 lg:pt-8">
        {allRoutes.map((route) => {
          return (
            <NavLink
              to={route.path}
              key={route.title}
              className={({ isActive }) =>
                `flex w-full flex-col items-center justify-center gap-3 bg-gray-200/10 p-2 text-lg text-white/50 transition duration-75 lg:flex-row lg:items-start lg:justify-start lg:rounded-2xl  lg:pr-4
                ${
                  isActive
                    ? "bg-gray-200/30 text-neutral-200 lg:bg-gray-200/80 lg:text-neutral-700 "
                    : "hover:text-white/100"
                }
              }`
              }
            >
              <div className="text-2xl">{route.icon}</div>
              <div className="text-sm lg:text-lg">{route.title}</div>
            </NavLink>
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

import { FC } from "react";
import Main from "../components/Main";
import Navbar from "../components/Navbar";

const SiteLayout: FC = () => {
  return (
    <div className="flex w-full">
      <Navbar />
      <Main />
    </div>
  );
};

export default SiteLayout;

import { FC, ReactNode } from "react";
import Main from "../components/Main";
import Navbar from "../components/Navbar";

interface SiteLayoutProps {
  children: ReactNode;
}

const SiteLayout: FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full h-screen">
      <Navbar />
      <Main>{children}</Main>
    </div>
  );
};

export default SiteLayout;

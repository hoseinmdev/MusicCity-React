import React from "react";
import siteLogo from "../../assets/siteLogo.png"

const SiteLogo: React.FC = () => {
  return <img  className="w-36 lg:w-56" src={siteLogo} alt="Music City" />;
};
export default SiteLogo;

import React from "react";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import { FaTelegram } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 w-full">
      <div className="flex w-full items-center justify-end gap-3 text-xl ">
        <button className="text-white opacity-50 hover:scale-110 hover:text-white hover:opacity-100">
          <AiFillInstagram />
        </button>
        <button className="text-white opacity-50  hover:scale-110 hover:text-white hover:opacity-100">
          <AiFillTwitterCircle />
        </button>
        <button className="text-white opacity-50 hover:scale-110 hover:text-white hover:opacity-100">
          <AiFillYoutube />
        </button>
        <button className="text-white opacity-50 hover:scale-110 hover:text-white hover:opacity-100">
          <FaTelegram />
        </button>
      </div>
      <div className="flex w-full flex-col flex-wrap items-start justify-center gap-2 text-sm">
        <button className="text-white opacity-50  hover:text-white hover:opacity-100">
          شماره تماس : 989222365685+
        </button>
        <button className="text-white opacity-50  hover:text-white hover:opacity-100">
          ایمیل : hoseinmdev@gmail.com
        </button>
      </div>
      <div className="flex w-full cursor-default flex-col items-center justify-center gap-1  border-t border-gray-500 pt-2 text-sm text-white opacity-50 hover:text-white hover:opacity-100">
        <p>تمامی حقوق مادی و معنوی این سایت</p>
        <p>متعلق به حسین محمودی میباشد</p>
      </div>
    </div>
  );
};
export default Footer;

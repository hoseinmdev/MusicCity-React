import React from "react";
// import {
//   AiFillInstagram,
//   AiFillTwitterCircle,
//   AiFillYoutube,
// } from "react-icons/ai";
// import { FaTelegram } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
      {/* <div className="flex w-full items-center justify-start gap-3 text-xl ">
        <button className="lg:text-white text-gray-800 hover:scale-110 hover:text-white hover:opacity-100 dark:text-white dark:opacity-50">
          <AiFillInstagram />
        </button>
        <button className="lg:text-white text-gray-800 hover:scale-110 hover:text-white  hover:opacity-100 dark:text-white dark:opacity-50">
          <AiFillTwitterCircle />
        </button>
        <button className="lg:text-white text-gray-800 hover:scale-110 hover:text-white hover:opacity-100 dark:text-white dark:opacity-50">
          <AiFillYoutube />
        </button>
        <button className="lg:text-white text-gray-800 hover:scale-110 hover:text-white hover:opacity-100 dark:text-white dark:opacity-50">
          <FaTelegram />
        </button>
      </div>
      <div className="flex w-full flex-col flex-wrap items-end justify-center gap-2 text-sm">
        <button className="lg:text-white text-gray-800 hover:text-white hover:opacity-100  dark:text-white dark:opacity-50">
          + شماره تماس : 989222365685
        </button>
        <button className="text-gray-800 hover:text-white hover:opacity-100 dark:text-white  dark:opacity-50 lg:text-white">
          hoseinmdev@gmail.com : ایمیل
        </button>
      </div> */}
      <div className="flex w-full cursor-default flex-col items-center justify-center gap-1 border-t  border-gray-500 pt-2 text-sm text-gray-800 hover:text-white hover:opacity-100 dark:text-white dark:opacity-50 lg:text-white">
        <p>تمامی حقوق مادی و معنوی این سایت</p>
        <p>متعلق به حسین محمودی میباشد</p>
      </div>
    </div>
  );
};
export default Footer;

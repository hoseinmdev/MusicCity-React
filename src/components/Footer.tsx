import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <div className="flex w-full cursor-default flex-col items-center justify-center gap-1 border-t border-gray-500 pt-2 text-sm text-gray-800 hover:text-white hover:opacity-100 dark:text-white dark:opacity-50 lg:text-white">
        <p>MusicCity &copy; {new Date().getFullYear()}</p>
        <p>All rights reserved</p>
      </div>
    </div>
  );
};
export default Footer;

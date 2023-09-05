import React, { useEffect, useState } from "react";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";

const ThemeChangerButton: React.FC = () => {
  const savedTheme = JSON.parse(localStorage.getItem("theme") || `{}`);
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    if (!savedTheme) {
      localStorage.setItem("theme", JSON.stringify("dark"));
      setTheme("dark");
    }
    savedTheme === "light"
      ? document.documentElement.classList.remove("dark")
      : document.documentElement.classList.add("dark");
  }, []);
  const changeThemeHandler = () => {
    const theme = JSON.parse(localStorage.getItem("theme") || `{}`);
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", JSON.stringify("dark"));
    } else {
      setTheme("light");
      localStorage.setItem("theme", JSON.stringify("light"));
      document.documentElement.classList.remove("dark");
    }
  };
  return (
    <div
      onClick={changeThemeHandler}
      className="mr-10 flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-400 shadow-xl dark:border-indigo-500"
    >
      <div
        className={`text-xl text-indigo-500 ${
          theme === "dark" ? "fadeShow" : "hidden"
        }`}
      >
        <BsFillMoonStarsFill />
      </div>
      <div
        className={`text-2xl text-yellow-500 ${
          theme === "light" ? "fadeShow" : "hidden"
        }`}
      >
        <BsSunFill />
      </div>
    </div>
  );
};
export default ThemeChangerButton;

import React, { useContext } from "react";
import Moon from "../assets/icon-moon.svg";
import Sun from "../assets/icon-sun.svg";
import { ThemeContext } from "./ThemeContext";

function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      className=" absolute right-5 top-3"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <img src={theme === "light" ? Moon : Sun} alt="toggle-mode" />
    </button>
  );
}

export default ThemeButton;

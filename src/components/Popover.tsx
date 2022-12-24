import React, { FC, useState } from "react";
import { FaClipboardList } from "react-icons/fa";

type PopoverType = {
  children: any;
};

export const Popover: FC<PopoverType> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <FaClipboardList
        size={"30"}
        color="white"
        cursor={"pointer"}
        className=" z-10 absolute bottom-5 right-8"
        onClick={() => setVisible(!visible)}
      />
      <div
        id="popover"
        className={`${
          visible ? "" : "invisible"
        } z-99 rounded-lg absolute bottom-24 right-3 transition duration-150 ease-in-out bg-bg-light dark:bg-bg-dark`}
      >
        <svg
          className="absolute -mt-5 block right-5  text-white dark:text-dark"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="23"
          viewBox="0 0 26 23"
          fill="currentcolor"
          style={{
            transform: "rotate(180deg)",
            transformOrigin: "50% 50%",
            bottom: -22,
          }}
        >
          <path
            id="Polygon 2"
            d="M13 0L25.9904 22.5H0.00961876L13 0Z"
            fill="currentcolor"
          ></path>
        </svg>
        {children}
      </div>
    </>
  );
};

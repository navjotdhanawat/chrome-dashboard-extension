import React, { FC, useEffect, useState } from "react";
import Clock from "./components/Clock";
import { FaArrowsAltH } from "react-icons/fa";

export function Resizeable({ children }: any) {
  const [size, setSize] = useState({ x: 200, y: 200 });
  const [hover, sethover] = useState(false);

  const handler = (mouseDownEvent: any) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    function onMouseMove(mouseMoveEvent: any) {
      const x = startSize.x - startPosition.x + mouseMoveEvent.pageX;
      const y = startSize.y - startPosition.y + mouseMoveEvent.pageY;

      setSize((currentSize) => ({
        x: x,
        y: x,
      }));
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  return (
    <div
      id="container"
      style={{
        width: size.x,
        height: size.y,
        position: "relative",
      }}
      onMouseEnter={() => sethover(true)}
      onMouseLeave={() => setTimeout(() => sethover(false), 3000)}
    >
      {children}
      {
        <FaArrowsAltH
          size={"20"}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            transform: "translate(25%, 0%)",
            color: "white",
            rotate: "45deg",
            // display: hover ? "initial" : "none",
          }}
          onMouseDown={handler}
        />
      }
    </div>
  );
}

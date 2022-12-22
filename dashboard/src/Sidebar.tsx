import React, { FC, lazy, Suspense, useContext, useState } from "react";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { Components, widgets } from "./constant";
import { GlobalContext } from "./context";
import { useSelector, useDispatch } from "react-redux";

export const Sidebar: FC = () => {
  // State to track the open/closed status of the sidebar
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.widget);

  // Function to toggle the open/closed status of the sidebar
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const vpHeight = useContext(GlobalContext);
  const clockDimention = vpHeight * 0.25;

  return (
    <div
      className="frosted-glass"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: "280px",
        transition: "transform 0.3s ease-out",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        zIndex: 9,
      }}
    >
      {isOpen ? (
        <FaTimesCircle
          size={"30"}
          style={{
            position: "absolute",
            right: -50,
            top: 10,
            color: "white",
          }}
          onClick={toggle}
        />
      ) : (
        <FaPlusCircle
          size={"30"}
          style={{
            position: "absolute",
            right: -50,
            top: 10,
            color: "white",
          }}
          onClick={toggle}
        />
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${1}, 1fr)`,
          gridGap: 30,
          padding: 30,
          height: "100vh",
          overflow: "auto",
        }}
      >
        {widgets.map(({ id, type, variant }: any) => {
          const DynamicComponent = Components[type];
          return (
            <div
              key={id}
              className="glass-card"
              // style={{
              //   width: clockDimention,
              //   height: clockDimention,
              // }}

              onClick={() =>
                dispatch({
                  type: "ADD_WIDGET",
                  payload: { id, type, variant },
                })
              }
            >
              <DynamicComponent
                style={{ height: "100%", width: "100%" }}
                variant={variant}
                key={id}
                isDefault={true}
              />
            </div>
          );
        })}
      </div>

      {/* Sidebar content goes here */}
    </div>
  );
};

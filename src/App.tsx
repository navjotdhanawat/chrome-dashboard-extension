import React, { FC, lazy, Suspense, useEffect, useState } from "react";
import backgroundImage from "./assets/bg.jpg";
import Quote from "./components/Quote";
import Widgets from "./widgets";
import { GlobalContext } from "./util/context";
import { Sidebar } from "./components/Sidebar";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import DraggableStory from "./dnd/DraggableStory";
import { getImages } from "./api/unsplash";
import { Components, defaultImageUrl } from "./util/constant";
import { Resizeable } from "./components/Resizeable";
import Todo from "./todo";
import { Popover } from "./components/Popover";
import { ThemeProvider } from "./todo/ThemeContext";
import Clock from "./components/Clock";
import { PersistGate } from "redux-persist/integration/react";
import Calendar from "./components/Calendar";
import { useSelector } from "react-redux";
import { widgetReducerType } from "./reducers/widget";
import { TopSites } from "./components/TopSites";
import ThemeButton from "./todo/ThemeButton";

const App: FC = () => {
  const [vpHeight, setVpHeight] = useState(window.innerHeight);
  const [isDrag, setIsDrag] = useState(false);
  const [wallpaper, setWallpaper] = useState(defaultImageUrl);
  const widget: widgetReducerType = useSelector((state: any) => state.widget);
  const handleViewportHeightChange = () => setVpHeight(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", handleViewportHeightChange);
    return () => {
      window.removeEventListener("resize", handleViewportHeightChange);
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(360deg, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 100%)",
        }}
      />

      {/* <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 99,
              }}
            /> */}
      <Sidebar />
      <TopSites />
      <div
        className=" rounded-lg"
        style={{
          height: "85vh",
          boxShadow: isDrag ? "0px 0px 5px 5px #FFF inset" : "inherit",
          background: isDrag ? "#0000004d" : "",
          margin: "0px 5vw 0 5vw",
        }}
      >
        {widget?.list?.map(({ type, uuid, coordinates, timezone }) => {
          const DynamicComponent = Components[type];
          return (
            <DraggableStory
              key={uuid}
              uuid={uuid}
              coordinates={coordinates}
              onDrag={setIsDrag}
            >
              <DynamicComponent
                key={uuid + "clock"}
                timezone={timezone}
                uuid={uuid}
                style={{ height: "100%", width: "100%" }}
              />
            </DraggableStory>
          );
        })}

        <Popover>
          <Todo />
        </Popover>
        <ThemeButton />
      </div>

      <Quote />
    </div>
  );
};

const RootApp: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalContext.Provider value={300}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </GlobalContext.Provider>
      </PersistGate>
    </Provider>
  );
};

export default RootApp;

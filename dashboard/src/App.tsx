import React, { FC, lazy, Suspense, useEffect, useState } from "react";
import backgroundImage from "./assets/bg.jpg";
import Quote from "./Quote";
import Widgets from "./widgets";
import { GlobalContext } from "./context";
import { Sidebar } from "./Sidebar";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import DraggableStory from "./DraggableStory";
import { getImages } from "./api/unsplash";
import { Components, defaultImageUrl } from "./constant";
import { Resizeable } from "./Test";
import Todo from "./todo";
import { Popover } from "./Popover";
import { ThemeProvider } from "./todo/ThemeContext";
import Clock from "./components/Clock";
import { PersistGate } from "redux-persist/integration/react";
import Calendar from "./components/Calendar";
import { useSelector } from "react-redux";
import { widgetReducerType } from "./reducers/widget";
import { TopSites } from "./TopSites";

const App: FC = () => {
  const [vpHeight, setVpHeight] = useState(window.innerHeight);
  const [isDrag, setIsDrag] = useState(false);
  const [wallpaper, setWallpaper] = useState(defaultImageUrl);
  const widget: widgetReducerType = useSelector((state: any) => state.widget);
  const handleViewportHeightChange = () => setVpHeight(window.innerHeight);

  useEffect(() => {
    // getImages()
    //   .then((url) => {
    //     console.log(url);
    //     setWallpaper(url);
    //   })
    //   .catch(console.error);
    // chrome.topSites.get(function (sites) {
    //   // Loop through the sites and add them to the list
    //   for (var i = 0; i < sites.length; i++) {
    //     var site = sites[i];
    //     console.log(site);
    //   }
    // });
    // chrome.history.search(
    //   {
    //     text: "", // Return all history items
    //     startTime: 0, // Return all history items
    //     maxResults: 10, // Return the top 10 sites
    //   },
    //   function (historyItems) {
    //     // Loop through the history items and add them to the list
    //     for (var i = 0; i < historyItems.length; i++) {
    //       var historyItem = historyItems[i];
    //       const src = "chrome://favicon/" + historyItem.url;
    //       console.log("historyItem", historyItem);
    //     }
    //   }
    // );
  }, []);

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
      {/* <ReactClock
          width={clockDimention}
          height={clockDimention}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-40%, -50%)',
          }}
        /> */}

      <div
        style={{
          height: "85vh",
          boxShadow: isDrag ? "0px 0px 10px 10px #5b5b5b inset" : "inherit",
          background: isDrag ? "#0000004d" : "",
          margin: "0px 8vw 0 8vw",
        }}
      >
        {widget?.list?.map(({ type, uuid, coordinates, timezone }) => {
          const DynamicComponent = Components[type];
          return (
            <DraggableStory key={uuid} uuid={uuid} coordinates={coordinates}>
              <DynamicComponent
                key={uuid + "clock"}
                timezone={timezone}
                uuid={uuid}
                style={{ height: "100%", width: "100%" }}
              />
            </DraggableStory>
          );
        })}

        {/* <Todo /> */}
        <Popover>
          <Todo />
        </Popover>
        {/* <button
              data-popover-target="popover-user-profile"
              type="button"
              className="text-white absolute bottom-5 right-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              User profile
            </button> */}
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

import React, {
  FC,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { Components, widgets } from "./constant";
import { GlobalContext } from "./context";
import { useSelector, useDispatch } from "react-redux";

export const TopSites: FC = () => {
  // State to track the open/closed status of the TopSites

  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.widget);
  const [sites, setSites] = useState<any>([]);

  useEffect(() => {
    chrome.topSites.get(setSites);
  }, []);

  return (
    <div
      // className="frosted-glass"
      style={{
        position: "absolute",
        top: 30,
        left: 10,
        bottom: 10,
      }}
    >
      <div
        style={{
          padding: 10,
          height: "100vh",
          overflow: "auto",
        }}
      >
        {sites.map(({ url }: any) => {
          return (
            <div key={url} className="frosted-glass rounded-lg my-3">
              <img
                onClick={() => window?.open(url, "_blank").focus()}
                src={`https://www.google.com/s2/favicons?sz=32&domain=${url}`}
                className="p-2"
                style={{ height: "inherit", margin: "auto" }}
              />
            </div>
          );
        })}
      </div>

      {/* TopSites content goes here */}
    </div>
  );
};

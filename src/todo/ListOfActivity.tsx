import React from "react";
import Circle from "../assets/circle.svg";
import Checked from "../assets/circle-cheked.svg";
import Cross from "../assets/icon-cross.svg";
import { SortableList } from "../dnd/SortableList";

type ListOfActivityProps = {
  list: {
    id: string;
    text: string;
    status: string;
  }[];
  filter: number;
  checked: (e: React.MouseEvent<HTMLButtonElement>) => void;
  removeOne: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDrag: (e: any) => void;
};

interface IntrinsicElements extends JSX.IntrinsicElements {
  strike: any;
}

const ListOfActivity: React.FC<ListOfActivityProps> = ({
  list,
  filter,
  checked,
  removeOne,
  handleDrag,
}) => {
  return (
    <div
      style={{
        maxHeight: "40vh",
        overflow: "scroll",
      }}
    >
      <SortableList
        items={list}
        onChange={handleDrag}
        renderItem={(item, idx) => (
          <SortableList.Item id={item.id}>
            <div
              id="#list"
              className={
                `flex w-full px-4 text-xs leading-tight text-gray-700 align-middle bg-white dark:bg-input-dark  shadow appearance-none focus:outline-none focus:shadow-outline dark:text-gray-300  ` +
                (idx === 0 ? " rounded-t-lg" : "")
              }
            >
              <SortableList.DragHandle />
              <button
                data-index={idx}
                className="w-4 h-4 my-3 mr-4"
                onClick={(e) => checked(e)}
              >
                <img
                  src={item.status === "onProgress" ? Circle : Checked}
                  className="h-4"
                  alt="LogoCentang"
                />
              </button>
              <p
                data-index={idx}
                className="flex flex-1 w-full my-3 align-middle border-none cursor-pointer input hover:text-blue-600"
                onClick={(e: any) => checked(e)}
              >
                {item.status === "Completed" ? (
                  <strike>{item.text}</strike>
                ) : (
                  item.text
                )}
              </p>

              <button
                className="w-4 h-4 my-3 ml-6 "
                data-index={idx}
                onClick={(e) => removeOne(e)}
              >
                <img src={Cross} alt="LogoCross" className="h-3" />
              </button>
            </div>
          </SortableList.Item>
        )}
      />
    </div>
  );
};

export default ListOfActivity;

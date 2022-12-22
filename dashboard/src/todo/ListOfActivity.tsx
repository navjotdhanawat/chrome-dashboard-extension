import React from "react";
import Circle from "../images/circle.svg";
import Checked from "../images/circle-cheked.svg";
import Cross from "../images/icon-cross.svg";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
    <DragDropContext onDragEnd={(e: any) => handleDrag(e)}>
      <Droppable droppableId="Activity">
        {(provided: any) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              maxHeight: "40vh",
              overflow: "scroll",
            }}
          >
            {list.map((item, idx) => {
              if (
                filter === 0 ||
                (filter === 1 && item.status === "onProgress") ||
                (filter === 2 && item.status === "Completed")
              )
                return (
                  <Draggable key={item.id} draggableId={item.id} index={idx}>
                    {(provided: any) => (
                      <div
                        id="#list"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={
                          `flex w-full px-4 text-xs leading-tight text-gray-700 align-middle bg-white dark:bg-input-dark  shadow appearance-none focus:outline-none focus:shadow-outline dark:text-gray-300  ` +
                          (idx === 0 ? " rounded-t-lg" : "")
                        }
                      >
                        <button
                          data-index={idx}
                          className="w-4 h-4 my-3 mr-4"
                          onClick={(e) => checked(e)}
                        >
                          <img
                            src={
                              item.status === "onProgress" ? Circle : Checked
                            }
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
                    )}
                  </Draggable>
                );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListOfActivity;

import React, { useState, useEffect } from "react";

import ThemeButton from "./ThemeButton";
import InputArea from "./InputArea";
import ListOfActivity from "./ListOfActivity";
import Filter from "./InformationAndFilter";

import { list as data } from "./data";
import { ThemeProvider } from "./ThemeContext";
import { TODO } from "../actions";
import { useDispatch } from "react-redux";

function Todo() {
  const dispatch = useDispatch();

  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("activity") || "[]")
  );

  const [filter, setFilter] = useState(0);

  const [currentId, setCurrent] = useState(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, input: string) => {
    e.preventDefault();

    if (input === "") {
      return;
    }
    debugger;
    setList((prev: any) => {
      return [
        ...prev,
        { text: input, status: "onProgress", id: `${currentId + 1}-${input}` },
      ];
    });

    dispatch({
      type: TODO.ADD,
      payload: {
        text: input,
        status: "onProgress",
        id: `${currentId + 1}-${input}`,
      },
    });

    console.log(list);
  };

  useEffect(() => {
    localStorage.setItem("activity", JSON.stringify(list));
    setCurrent(currentId + 1);
  }, [list]);

  // function when check button pressed
  const checked = (e: any) => {
    // let newList = list;
    let idx = e.currentTarget.dataset.index;
    let newStatus = "";

    if (list[idx].status === "onProgress") {
      newStatus = "Completed";
    } else {
      newStatus = "onProgress";
    }

    let newList = [...list];
    newList[idx].status = newStatus;

    // console.log(newList);

    setList(newList);
  };

  // function when x button pressed
  const removeOne = (e: any) => {
    // let newList = list;
    let idx = e.currentTarget.dataset.index;
    let newList = [...list];
    newList.splice(idx, 1);

    console.log(newList);

    setList(newList);
  };

  const removeCompleted = () => {
    let newList = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].status === "onProgress") {
        newList.push(list[i]);
      }
    }

    setList(newList);
  };

  function handleDrag(result: any) {
    console.log(result);
    // if (!result.destination) return;

    // const items = Array.from(list);
    // const [reordererItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reordererItem);

    setList(result);
  }

  return (
    <div className="relative flex h-auto max-w-md p-5 mx-auto bg-yellow-3000 md:mx-auto">
      <div className="w-full text-left ">
        <div className="flex justify-between align-middle">
          <h1 className=" text-2xl font-bold dark:text-gray-300">T O D O</h1>
          <ThemeButton />
        </div>
        <InputArea handleSubmit={handleSubmit} />
        {/* Input */}
        <ListOfActivity
          list={list}
          filter={filter}
          checked={checked}
          removeOne={removeOne}
          handleDrag={handleDrag}
        />
        <Filter
          list={list}
          options={options}
          removeCompleted={removeCompleted}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
}

export default Todo;

const options = ["All", "Active", "Completed"];

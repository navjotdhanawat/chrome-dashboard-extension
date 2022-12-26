import React, { useState, useEffect } from "react";

import ThemeButton from "./ThemeButton";
import InputArea from "./InputArea";
import ListOfActivity from "./ListOfActivity";
import Filter from "./InformationAndFilter";

import { TODO } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";

function Todo() {
  const { list } = useSelector((state: any) => state.todo);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("All");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, input: string) => {
    e.preventDefault();

    if (input === "") {
      return;
    }

    dispatch({
      type: TODO.ADD,
      payload: {
        text: input,
        status: "Active",
        id: uuid(),
      },
    });
  };

  // function when check button pressed
  const checked = (id: string) => {
    dispatch({
      type: TODO.TOGGLE_STATUS,
      payload: { id },
    });
  };

  // function when x button pressed
  const removeOne = (id: string) => {
    dispatch({
      type: TODO.REMOVE,
      payload: { id },
    });
  };

  const removeCompleted = () => {
    dispatch({
      type: TODO.REMOVE_COPLETED,
    });
  };

  function handleDrag(result: any) {
    dispatch({
      type: TODO.REORDER,
      payload: result,
    });
  }

  return (
    <div className="relative flex h-auto max-w-md p-5 mx-auto bg-yellow-3000 md:mx-auto">
      <div className="w-full text-left ">
        <div className="flex justify-between align-middle">
          <h1 className=" text-2xl font-bold dark:text-gray-300">T O D O</h1>
        </div>
        <InputArea handleSubmit={handleSubmit} />
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

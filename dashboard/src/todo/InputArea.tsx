import React, { useState } from "react";
import Circle from "../images/circle.svg";

type InputAreaProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, input: string) => void;
};

const InputArea: React.FC<InputAreaProps> = ({ handleSubmit }) => {
  const [input, setInput] = useState("");

  return (
    <div
      id="#input"
      className="flex w-full px-4 my-4 text-sm leading-tight text-gray-700 align-middle bg-white rounded shadow appearance-none dark:bg-input-dark focus:outline-none focus:shadow-outline"
    >
      <div>
        <img src={Circle} alt="LogoCentang" className="my-3 mr-6 h-4" />
      </div>

      <form
        className="flex-1"
        onSubmit={(e) => {
          handleSubmit(e, input);
          setInput("");
        }}
      >
        <input
          className="w-full h-full border-none input dark:bg-input-dark dark:text-gray-300 px-5"
          id="username"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What to do ?"
        />
      </form>
    </div>
  );
};

export default InputArea;

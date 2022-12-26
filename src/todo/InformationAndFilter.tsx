import React from "react";

type InformationAndFilterProps = {
  list: { text: string; status: string; id: string }[];
  options: string[];
  removeCompleted: () => void;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

function InformationAndFilter({
  list,
  options,
  removeCompleted,
  filter,
  setFilter,
}: InformationAndFilterProps) {
  return (
    <>
      {/* additional information  */}
      <div className="flex justify-between w-full px-6 text-xs leading-tight text-gray-700 align-middle bg-white rounded-b-lg shadow appearance-none dark:bg-input-dark focus:outline-none focus:shadow-outline dark:text-gray-300">
        <p className="my-3">({list.length})</p>

        <div className="hidden my-3 gap-x-5 sm:flex">
          {options.map((item, i) => (
            <p
              className={
                (item === filter ? "text-blue-600 " : "") +
                "  hover:text-blue-500 cursor-pointer"
              }
              key={item}
              onClick={(e) => {
                setFilter(item);
              }}
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      <div className="flex justify-center w-full px-6 mt-5 text-sm leading-tight text-gray-700 align-middle bg-white rounded-lg shadow appearance-none gap-x-5 dark:bg-input-dark focus:outline-none focus:shadow-outline dark:text-gray-300 ">
        <p
          className="my-3 cursor-pointer hover:text-red-400"
          onClick={(e) => removeCompleted()}
        >
          Clear Completed
        </p>
      </div>
    </>
  );
}

export default InformationAndFilter;

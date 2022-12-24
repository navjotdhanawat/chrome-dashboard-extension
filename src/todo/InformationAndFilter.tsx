import React from "react";

type InformationAndFilterProps = {
  list: { text: string; status: string; id: string }[];
  options: string[];
  removeCompleted: () => void;
  filter: number;
  setFilter: React.Dispatch<React.SetStateAction<number>>;
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
        <p className="my-3">{list.length} items left</p>

        {/* Filer Desktop */}
        <div className="hidden my-3 gap-x-5 sm:flex">
          {options.map((item, i) => (
            <p
              className={
                (i === filter ? "text-blue-600 " : "") +
                "  hover:font-bold cursor-pointer"
              }
              key={item}
              onClick={(e) => {
                setFilter(i);
              }}
            >
              {item}
            </p>
          ))}
        </div>

        {/* <p className="my-auto cursor-pointer hover:font-bold" onClick={(e) => removeCompleted()}>
          Clear Completed
        </p> */}
      </div>
      {/* Filter Option Mobile */}
      <div className="flex justify-center w-full px-6 mt-5 text-sm leading-tight text-gray-700 align-middle bg-white rounded-lg shadow appearance-none gap-x-5 sm:hidden dark:bg-input-dark focus:outline-none focus:shadow-outline dark:text-gray-300 ">
        {options.map((item, i) => (
          <p
            className={
              (i === filter ? "text-blue-600 " : "") +
              "  hover:font-bold cursor-pointer my-3"
            }
            key={item}
            onClick={(e) => {
              setFilter(i);
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </>
  );
}

export default InformationAndFilter;

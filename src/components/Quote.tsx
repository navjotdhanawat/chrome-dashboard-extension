import React, { FC } from "react";

const Quote: FC = () => {
  return (
    <div className=" w-full absolute bottom-5 text-center text-white text-2xl">
      <p>"The world is a beautiful place, but not when you're in a hurry."</p>
      <p className="author">- Unknown</p>
    </div>
  );
};

export default Quote;

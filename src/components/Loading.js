import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const Loading = () => {
  return (
    <div className=" h-screen bg-black flex-col text-white text-2xl md:text-5xl font-bold justify-center flex items-center">
      <h3 className="mb-8">Loading the product</h3>
      <LoadingSpinner color={"white"} />
    </div>
  );
};

export default Loading;

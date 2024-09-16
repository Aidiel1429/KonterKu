import React from "react";
import { DiJavascript } from "react-icons/di";

const Skeleton = () => {
  return (
    <div className="p-3 w-full">
      <div className="mb-8 p-6 bg-white rounded-md shadow-md">
        <div className="skeleton h-5 w-full"></div>
      </div>
      <div className="mb-8 p-6 bg-white rounded-md shadow-md">
        <div className="skeleton h-[450px] w-full"></div>
      </div>
    </div>
  );
};

export default Skeleton;

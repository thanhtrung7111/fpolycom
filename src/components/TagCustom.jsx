import React from "react";

const TagCustom = ({ item, id, name, handleClick, active }) => {
  return (
    <div
      onClick={() => handleClick(item)}
      className={`${
        active[id] == item[id]
          ? "border-red-500 text-red-500"
          : "border-gray-100"
      } border text-xs py-2 px-4 cursor-pointer`}
    >
      {item[name]}
    </div>
  );
};

export default TagCustom;

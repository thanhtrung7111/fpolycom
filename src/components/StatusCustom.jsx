import React from "react";

const StatusCustom = ({
  item,
  id,
  name,
  warningID = 1,
  successID = 2,
  reportID = 3,
}) => {
  const customClass =
    item[id] == warningID
      ? "bg-yellow-500"
      : item[id] == successID
      ? "bg-green-600"
      : "bg-red-500";
  return (
    <div className={`${customClass}  py-1 px-3 text-white w-fit text-xs`}>
      {item[name]}
    </div>
  );
};

export default StatusCustom;

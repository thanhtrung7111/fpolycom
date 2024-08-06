import { useEffect, useState } from "react";

export default function InputQuantityCom({ item, qty, increment, decrement }) {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setDisabled(false);
    }, 2000);
  }, [disabled == true]);
  return (
    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
      <div className="flex justify-between items-center w-full">
        <button
          disabled={disabled}
          onClick={() => {
            setDisabled(true);
            decrement(item);
          }}
          type="button"
          className="text-base text-qgray disabled:opacity-70"
        >
          -
        </button>
        <span className="text-qblack">{item[qty]}</span>
        <button
          onClick={() => {
            setDisabled(true);
            increment(item);
          }}
          disabled={disabled}
          type="button"
          className="text-base text-qgray disabled:opacity-70"
        >
          +
        </button>
      </div>
    </div>
  );
}

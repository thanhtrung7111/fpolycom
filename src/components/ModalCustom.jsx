import React, { Children, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionBlockScreen } from "../redux/reducer/userReducer";
const ModalCustom = ({
  children,
  active = true,
  handleClose,
  title,
  className,
  classNameModal,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionBlockScreen(active));
  }, [active]);
  return (
    <div
      onClick={handleClose}
      className={`${
        active
          ? "opacity-100 visible z-[100]  bg-black bg-opacity-20"
          : "opacity-0 invisible"
      } fixed  w-screen h-screen top-0 left-0 flex justify-center pt-10 shadow-sm overflow-hidden ${className}`}
    >
      <div
        className={`shadow-xl border w-96 ${classNameModal} h-fit bg-white pt-3 px-3 pb-4 relative rounded-md`}
      >
        <div
          className="absolute cursor-pointer top-1 right-3 text-xl"
          onClick={handleClose}
        >
          <i class="ri-close-line"></i>
        </div>
        <h2 className="text-sm text-slate-700 font-medium mb-3">{title}</h2>
        <div className="px-5">
          {Children.map(children, (child) => {
            return child;
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalCustom;

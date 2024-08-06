import React from "react";
import InputQuantityCom from "../../../Helpers/InputQuantityCom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeWishlist } from "../../../../redux/action/userAction";

export default function WishlistTab({ className }) {
  const dispatch = useDispatch();
  const { wishList, currentUser } = useSelector((state) => state.user);
  const remove = (id) => {
    dispatch(
      removeWishlist({ maUser: currentUser.data.maAccount, maSanPham: id })
    );
  };
  return (
    <>
      <div className={`w-full ${className || ""}`}>
        <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              {/* table heading */}
              <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                <td className="py-4 pl-10 block whitespace-nowrap  w-[380px]">
                  Sản phẩm
                </td>

                <td className="whitespace-nowrap text-right w-[114px]"></td>
              </tr>

              {wishList.data?.map((item) => {
                return (
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="pl-10  py-4 ">
                      <NavLink to={`/single-product/${item.maSanPham}`}>
                        <div className="flex space-x-6 items-center">
                          <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                            <img
                              src={`http://localhost:8080/file/images/${item.hinhAnh}`}
                              alt="product"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <p className="font-medium text-[15px] text-qblack">
                              {item.tenSanPham}
                            </p>
                          </div>
                        </div>
                      </NavLink>
                    </td>
                    <td className="text-right py-4">
                      <div className="flex space-x-1 items-center justify-center">
                        <span
                          className="cursor-pointer"
                          onClick={() => remove(item.maSanPham)}
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                              fill="#AAAAAA"
                            />
                          </svg>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {/* table heading end */}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="w-full mt-[30px] flex sm:justify-end justify-start">
        <div className="sm:flex sm:space-x-[30px] items-center">
          <button type="button">
            <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
              Clean Wishlist
            </div>
          </button>
          <div className="w-[180px] h-[50px]">
            <button type="button" className="yellow-btn">
              <div className="w-full text-sm font-semibold">
                Add to Cart All
              </div>
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
}

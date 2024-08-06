import { useSelector } from "react-redux";
import ThinBag from "../Helpers/icons/ThinBag";
import { NavLink } from "react-router-dom";

export default function Cart({ className, type }) {
  const { lstCart } = useSelector((state) => state.cart);

  return (
    <>
      <div className="cart relative cursor-pointer">
        <a href="/cart">
          <span>
            <ThinBag />
          </span>
        </a>
        <span
          className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-qyellow
        `}
        >
          {lstCart.data?.length}
        </span>
      </div>
      <div
        style={{ boxShadow: " 0px 15px 50px 0px rgba(0, 0, 0, 0.14)" }}
        className={`w-[400px] bg-white border-t-[3px] ${
          type === 3 ? "border-qh3-blue" : "cart-wrappwer"
        }  ${className || ""}`}
      >
        <div className="w-full h-full">
          <div className="product-items h-[310px] overflow-y-scroll">
            <ul className="flex flex-col gap-y-2">
              {lstCart.data?.map((item) => {
                return (
                  <li className="w-full h-full flex">
                    <NavLink
                      to={`/single-product/${item?.maSanPham}`}
                      className="flex space-x-[6px] justify-center items-center px-4"
                    >
                      <div className="w-[65px] h-[65px] border border-gray-300">
                        <img
                          src={`http://localhost:8080/file/images/${item?.hinhAnh}`}
                          alt=""
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 h-full flex flex-col justify-center ">
                        <p className="title mb-2 text-[13px] font-600 text-qblack leading-4 line-clamp-2 hover:text-blue-600">
                          {item?.tenSanPham} {item?.tenSanPhamCT}
                        </p>
                      </div>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-full px-4 mt-[20px] mb-[12px]">
            <div className="h-[1px] bg-[#F0F1F3]"></div>
          </div>
          <div className="product-actions px-4 mb-[30px]">
            {/* <div className="total-equation flex justify-between items-center mb-[28px]">
              <span className="text-[15px] font-500 text-qblack">Subtotal</span>
              <span className="text-[15px] font-500 text-qred ">$365</span>
            </div> */}
            <div className="product-action-btn">
              <NavLink to={"/cart"}>
                <div className="gray-btn w-full h-[50px] mb-[10px] ">
                  <span>Xem giỏ hàng</span>
                </div>
              </NavLink>
              <NavLink to={"/cart"}>
                <div className="w-full h-[50px]">
                  <div className={type === 3 ? "blue-btn" : "yellow-btn"}>
                    <span className="text-sm">Thanh toán</span>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
          {/* <div className="w-full px-4 mt-[20px]">
            <div className="h-[1px] bg-[#F0F1F3]"></div>
          </div>
          <div className="flex justify-center py-[15px]">
            <p className="text-[13px] font-500 text-qgray">
              Get Return within <span className="text-qblack">30 days</span>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
}

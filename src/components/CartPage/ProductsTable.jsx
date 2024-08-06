import { useDispatch, useSelector } from "react-redux";
import InputQuantityCom from "../Helpers/InputQuantityCom";
import {
  addToCartByUser,
  removeToCartByUser,
} from "../../redux/action/cartAction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { checkAllCart, checkItemCart } from "../../redux/reducer/cartReducer";

export default function ProductsTable({ className, data }) {
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const checkAll = (value, id) => {
    dispatch(checkAllCart({ check: value, idCuaHang: id }));
  };

  const checkItem = (value) => {
    dispatch(checkItemCart({ item: value }));
  };

  const removeCart = (value) => {
    dispatch(
      removeToCartByUser({
        maUser: currentUser.data?.maAccount,
        maSanPhamCT: value.maSanPhamCT,
      })
    );
  };
  const incrementQuantity = (item) => {
    if (item.soLuong == item.soLuongToiDa) {
      toast.warning("Số lượng vượt giới hạn tồn kho!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }
    dispatch(
      addToCartByUser({
        maUser: currentUser.data?.maAccount,
        maSanPhamCT: item.maSanPhamCT,
        soLuong: item.soLuong + 1,
      })
    );
  };

  const decrementQuantity = (item) => {
    if (item.soLuong == 1) {
      return;
    }
    dispatch(
      addToCartByUser({
        maUser: currentUser.data?.maAccount,
        maSanPhamCT: item.maSanPhamCT,
        soLuong: item.soLuong - 1,
      })
    );
  };

  useEffect(() => {
    covertData();
  }, [data]);
  const covertData = () => {
    const resultData = [];
    data?.map((item) => {
      if (!resultData.find((i) => i.maCH == item.maCH)) {
        const result = {
          maCH: item.maCH,
          tenCH: item.tenCH,
          sanPhamList: [
            {
              maSanPhamCT: item.maSanPhamCT,
              soLuong: item.soLuong,
              tenSanPham: item.tenSanPham,
              check: item.check,
              tenSanPhamCT: item.tenSanPhamCT,
              soLuongToiDa: item.soLuongToiDa,
              maSanPham: item.maSanPham,
              giaSanPham: item.giaSanPham,
              hinhAnh: item.hinhAnh,
            },
          ],
        };
        resultData.push(result);
      } else {
        const findCH = resultData.find((i) => i.maCH == item.maCH);
        findCH.sanPhamList.push({
          maSanPhamCT: item.maSanPhamCT,
          soLuongToiDa: item.soLuongToiDa,
          soLuong: item.soLuong,
          check: item.check,
          tenSanPham: item.tenSanPham,
          tenSanPhamCT: item.tenSanPhamCT,
          maSanPham: item.maSanPham,
          giaSanPham: item.giaSanPham,
          hinhAnh: item.hinhAnh,
        });
        setDataFilter([
          ...resultData.filter((i) => item.maCH != i.maCH),
          findCH,
        ]);
      }
    });
    setDataFilter(resultData);
    console.log(dataFilter);
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-x-auto">
        {dataFilter.map((data) => {
          return (
            <table className="w-full text-sm border text-left text-gray-500 dark:text-gray-400 mb-4">
              <tbody>
                {/* table heading */}
                <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
                  <td className="py-4 whitespace-nowrap text-center">
                    <input
                      className="accent-amber-600"
                      id={`ch${data.maCH}`}
                      type="checkbox"
                      onChange={(e) => checkAll(e.target.checked, data.maCH)}
                    />
                  </td>
                  <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                    <label
                      htmlFor={`ch${data.maCH}`}
                      className="cursor-pointer"
                    >
                      {data.tenCH}
                    </label>
                  </td>
                  <td className="py-4 whitespace-nowrap text-center">Giá</td>
                  <td className="py-4 whitespace-nowrap  text-center">
                    Số lượng
                  </td>
                  <td className="py-4 whitespace-nowrap  text-center">
                    Tổng tiền
                  </td>
                  <td className="py-4 whitespace-nowrap text-right w-[114px]"></td>
                </tr>
                {/* table heading end */}
                {data.sanPhamList?.map((item) => {
                  return (
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td className="text-center py-4 px-2">
                        <input
                          className="accent-amber-600"
                          type="checkbox"
                          id={item?.maSanPhamCT}
                          checked={item.check}
                          onChange={() => checkItem(item)}
                        />
                      </td>
                      <td className="pl-10  py-4  w-[380px]">
                        <label
                          htmlFor={item?.maSanPhamCT}
                          className="flex space-x-6 items-center"
                        >
                          <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                            <img
                              src={`http://localhost:8080/file/images/${item.hinhAnh}`}
                              alt="product"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <p className="font-medium text-[15px] text-qblack">
                              {item.tenSanPham} {item.tenSanPhamCT}
                            </p>
                          </div>
                        </label>
                      </td>

                      <td className="text-center py-4 px-2">
                        <div className="flex space-x-1 items-center justify-center">
                          <span className="text-[15px] font-normal">
                            {item.giaSanPham?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className=" py-4">
                        <div className="flex justify-center items-center">
                          <InputQuantityCom
                            item={item}
                            qty={"soLuong"}
                            increment={incrementQuantity}
                            decrement={decrementQuantity}
                          />
                        </div>
                      </td>
                      <td className="text-right py-4">
                        <div className="flex space-x-1 items-center justify-center">
                          <span className="text-[15px] font-normal">
                            {(item.giaSanPham * item.soLuong)?.toLocaleString(
                              "en-US",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="text-right py-4">
                        <div className="flex space-x-1 items-center justify-center">
                          <span
                            onClick={() => removeCart(item)}
                            className="cursor-pointer"
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
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
}

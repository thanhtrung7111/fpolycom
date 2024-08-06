import { useEffect, useState } from "react";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import ProductsTable from "./ProductsTable";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  loadLoaiShip,
  loadLoaiThanhToan,
  loadVoucher,
} from "../../redux/action/commonAction";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { checkoutPending } from "../../redux/reducer/userReducer";

export default function CardPage() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const { lstCart } = useSelector((state) => state.cart);
  const { lstLoaiThanhToan, lstLoaiShip, lstVoucher } = useSelector(
    (state) => state.common
  );
  const [cart, setCart] = useState(true);

  const caculateTotal = () => {
    let resultfinal = 0;
    let result = lstCart.data
      ?.filter((item) => item.check == true)
      .reduce((total, item) => (total += item.soLuong * item.giaSanPham), 0);
    resultfinal = result;

    console.log(resultfinal);
    setTotal(resultfinal);
  };

  const handlePayment = () => {
    if (!lstCart.data?.find((item) => item.check == true)) {
      toast.warning("Bạn chưa chọn sản phẩm để thanh toán!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }
    let resultData = [];
    lstCart.data
      ?.filter((item) => item.check == true)
      .map((item) => {
        if (!resultData.find((i) => i.maCuaHang == item.maCH)) {
          const result = {
            maCuaHang: item.maCH,
            tongTien: item.soLuong * item.giaSanPham,
            tenCH: item.tenCH,
            maLoaiShip: null,
            maLoaiThanhToan: null,
            maVoucher: "99",
            ghiChu: null,
            hoaDonCTList: [
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
          const findCH = resultData.find((i) => i.maCuaHang == item.maCH);
          findCH.hoaDonCTList.push({
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
          findCH.tongTien = findCH.hoaDonCTList?.reduce(
            (total, item) => (total += item.soLuong * item.giaSanPham),
            0
          );
          const index = resultData?.findIndex((i) => item.maCuaHang == i.maCH);
          resultData[index] = findCH;
        }
      });
    dispatch(checkoutPending(resultData));
    navigate("/checkout");
  };

  useEffect(() => {
    console.log("Hello");
    caculateTotal();
  }, [dispatch, lstCart.data]);
  return lstCart?.length <= 0 ? (
    <div>Chưa có sản phẩm nào trong cửa hàng</div>
  ) : (
    <>
      {cart === false ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "Trang chủ", path: "/" },
                { name: "Giỏ hàng", path: "/cart" },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="Giỏ hàng"
              breadcrumb={[
                { name: "Trang chủ", path: "/" },
                { name: "Giỏ hàng", path: "/cart" },
              ]}
            />
          </div>
          <div className="w-full mt-[23px]">
            <div className="container-x mx-auto">
              <ProductsTable className="mb-[30px]" data={lstCart.data} />
              <div className="w-full sm:flex justify-end">
                <div className="flex space-x-2.5 items-center">
                  <NavLink to={"/all-products"}>
                    <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                      <span className="text-sm font-semibold">
                        Tiếp tục mua sắm
                      </span>
                    </div>
                  </NavLink>
                </div>
              </div>

              <div className="w-full mt-[30px] flex sm:justify-end">
                <div className="sm:w-[500px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-6">
                      <p className="text-[15px] font-medium text-qblack">
                        Tổng tiền
                      </p>
                      <p className="text-[15px] font-medium text-qred">
                        {total?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>
                  {/* <div className="shipping mb-6">
                    <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                      Loại thanh toán
                    </span>
                    <ul className="flex flex-col space-y-1">
                      {lstLoaiThanhToan.data?.map((item, index) => {
                        return (
                          <li>
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-2.5 items-center">
                                <div className="input-radio">
                                  <input
                                    checked={
                                      initialState.loaiThanhToan
                                        ?.maLoaiThanhToan ==
                                      item.maLoaiThanhToan
                                    }
                                    name="maLoaiThanhToan"
                                    type="radio"
                                    value={item.maLoaiThanhToan}
                                    onChange={(e) => {
                                      setInitialState({
                                        ...initialState,
                                        loaiThanhToan: item,
                                      });
                                    }}
                                    className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                  />
                                </div>
                                <span className="text-[13px] text-normal text-qgraytwo">
                                  {item.tenLoaiThanhToan}
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="shipping mb-6">
                    <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                      Loại ship
                    </span>
                    <ul className="flex flex-col space-y-1">
                      {lstLoaiShip.data?.map((item, index) => {
                        return (
                          <li>
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-2.5 items-center">
                                <div className="input-radio">
                                  <input
                                    checked={
                                      initialState.loaiShip?.maLoaiShip ==
                                      item.maLoaiShip
                                    }
                                    name="maLoaiShip"
                                    type="radio"
                                    onChange={(e) => {
                                      setInitialState({
                                        ...initialState,
                                        loaiShip: item,
                                      });
                                    }}
                                    className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                  />
                                </div>
                                <span className="text-[13px] text-normal text-qgraytwo">
                                  {item.tenLoaiShip}
                                </span>
                              </div>
                              <span className="text-[13px] text-normal text-qgraytwo">
                                {item.phiShip?.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="shipping mb-6">
                    <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                      Loại voucher
                    </span>

                    <select
                      name="voucher"
                      id=""
                      onChange={(e) => {
                        setInitialState({
                          ...initialState,
                          loaiVoucher: lstVoucher.data?.find(
                            (item) => item.maVoucher == e.target.value
                          ),
                        });
                      }}
                      className={`input-field border placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                    >
                      <option></option>
                      {lstVoucher.data?.map((item, index) => {
                        return (
                          <option
                            value={item.maVoucher}
                            selected={
                              initialState.loaiVoucher?.maVoucher ==
                              item.maVoucher
                            }
                          >
                            {item.tenVoucher} - {item.phanTramGiam}%
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="shipping mb-6">
                    <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                      Ghi chú
                    </span>
                    <textarea
                      name="maLoaiThanhToan"
                      onChange={(e) => {
                        setInitialState({
                          ...initialState,
                          ghiChu: e.target.value,
                        });
                      }}
                      placeholder="Ghi chú đơn hàng..."
                      className={`input-field border placeholder:text-sm text-xs p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                    ></textarea>
                  </div> */}
                  <div
                    onClick={() => handlePayment()}
                    className="cursor-pointer"
                  >
                    <div className="w-full h-[50px] black-btn flex justify-center items-center">
                      <span className="text-sm font-semibold">Thanh toán</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

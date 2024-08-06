import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageTitle from "../components/Helpers/PageTitle";
import api from "../api/api";
import { useSelector } from "react-redux";

const ConfirmPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  let [searchParams, setSearchParams] = useSearchParams();
  const [dataValue, setDataValue] = useState([]);
  const code = searchParams.get("code");
  const orderCode = searchParams.get("orderCode");
  useEffect(() => {
    const fetchData = async () => {
      await api
        .post("/user/hoadon/checkout", {
          maUser: currentUser.data?.maAccount,
          code: orderCode,
        })
        .then((resp) => {
          console.log(resp.data?.data);
          setDataValue([...resp.data?.data]);
        })
        .catch((e) => console.log(e));
    };
    if (currentUser.data != null) {
      fetchData();
    }
  }, []);
  return (
    <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
      <div className="w-full mb-5">
        <PageTitle
          title="Trạng thái thanh toán"
          breadcrumb={[
            { name: "Trang chủ", path: "/" },
            { name: "Trạng thái thanh toán", path: "/checkout" },
          ]}
        />
      </div>
      <div className="checkout-main-content w-full">
        <div className="container-x mx-auto">
          <div className="w-full lg:flex lg:space-x-[30px]">
            <div className="flex-1">
              <h1 className="sm:text-2xl text-center text-xl text-qblack font-medium mb-5">
                {code == "00" && dataValue?.length > 0
                  ? "Thanh toán hóa đơn thành công"
                  : "Bạn chưa thanh toán hóa đơn hoặc hết hạn thanh toán!"}
              </h1>

              {dataValue?.map((item, index) => {
                return (
                  <div className="w-full px-10 py-[30px] border border-[#EDEDED] mb-3">
                    <div className="sub-total mb-6">
                      <div className=" flex justify-between mb-5">
                        <p className="text-[13px] font-medium text-qblack uppercase">
                          Mã hóa đơn: #{item?.maHD}
                        </p>
                        <p className="text-[13px] font-medium text-qblack uppercase">
                          Tổng
                        </p>
                      </div>
                      <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                    </div>
                    <div className="product-list w-full mb-[30px]">
                      <ul className="flex flex-col space-y-5">
                        {item?.hoaDonCTList?.map((i) => {
                          return (
                            <li>
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="text-[15px] text-qblack mb-2.5">
                                    {i.tenSanPham} {i.tenSanPhamCT}
                                    <span className="text-[13px] text-qgray ml-2 mt-2">
                                      x{i.soLuong}
                                    </span>
                                  </h4>
                                </div>
                                <div>
                                  <span className="text-[15px] text-qblack font-medium">
                                    {(i.soLuong * i.giaSanPham)?.toLocaleString(
                                      "en-US",
                                      {
                                        style: "currency",
                                        currency: "VND",
                                      }
                                    )}
                                  </span>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED] mb-5"></div>

                    <div className="grid grid-cols-[1fr_2fr] gap-x-10">
                      <div className="shipping mb-6">
                        <div className="shipping mb-6">
                          <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                            Loại ship: {item?.loaiShip.tenLoaiShip} %
                          </span>
                        </div>
                        <div className="shipping mb-6">
                          <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                            Trạng thái:{" "}
                            <span
                              className={`px-3 py-2 ml-2 text-white ${
                                item?.trangThaiHD?.itemKey == 2
                                  ? "bg-green-600"
                                  : "bg-red-500"
                              }`}
                            >
                              {item?.trangThaiHD?.itemName}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="shipping mb-6">
                          <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                            Phần trăm giảm voucher: {item?.phanTramGiam} %
                          </span>
                        </div>
                        <div className="shipping mb-6">
                          <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                            Ghi chú: {item?.ghiChu}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[30px]">
                      <div className=" flex justify-between mb-5">
                        <p className="text-base font-medium text-qblack">
                          Thành tiền:{" "}
                          <span className="text-xl font-medium text-qred">
                            {item?.tongTien?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;

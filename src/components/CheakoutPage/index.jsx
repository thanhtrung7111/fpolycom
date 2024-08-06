import { useDispatch, useSelector } from "react-redux";
import PageTitle from "../Helpers/PageTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loadLoaiShip,
  loadLoaiThanhToan,
  loadVoucher,
} from "../../redux/action/commonAction";
import { data } from "autoprefixer";
import { toast } from "react-toastify";
import axios from "axios";
import { HmacSHA256 } from "crypto-js";
import Base64 from "crypto-js/enc-hex";
import api from "../../api/api";

export default function CheakoutPage() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createPayment, setCreatePayment] = useState(false);
  let [dataValue, setDataValue] = useState([]);
  const { orderPending } = useSelector((state) => state.user);
  const [loaiThanhToan, setLoaiThanhToan] = useState(null);
  const { lstLoaiThanhToan, lstLoaiShip, lstVoucher } = useSelector(
    (state) => state.common
  );
  useEffect(() => {
    if (orderPending.data == null) {
      navigate("/cart");
    } else {
      setDataValue([...orderPending.data]);
    }
  }, [orderPending.data, dispatch]);

  useEffect(() => {
    dispatch(loadLoaiThanhToan());
    dispatch(loadVoucher());
    dispatch(loadLoaiShip());
  }, []);
  const changeMaLoaiThanhToan = (item, idCuaHang, index) => {
    const newData = [...dataValue];

    // Tìm kiếm và cập nhật item trong newData
    const findItemIndex = newData.findIndex(
      (item) => item.maCuaHang === idCuaHang
    );
    if (findItemIndex !== -1) {
      let result = newData[findItemIndex].hoaDonCTList.reduce(
        (total, i) => (total += i.soLuong * i.giaSanPham),
        0
      );

      if (newData[findItemIndex].maVoucher != null) {
        const voucherFind = lstVoucher.data?.find(
          (item) => item.maVoucher === newData[findItemIndex].maVoucher
        );

        result =
          result -
          (result *
            lstVoucher.data?.find(
              (item) => item.maVoucher === newData[findItemIndex].maVoucher
            )?.phanTramGiam) /
            100 +
          item.phiShip;
      } else {
        result += item.phiShip;
      }
      const updatedItem = {
        ...newData[findItemIndex],
        maLoaiShip: item.maLoaiShip,
        tongTien: result,
      };
      newData[findItemIndex] = updatedItem;

      // Cập nhật state với newData
      setDataValue([...newData]);
    } else {
      console.log(`Không tìm thấy item với maCuaHang là ${idCuaHang}`);
    }
  };

  const onchangeVoucher = (values, idCuaHang) => {
    const newData = [...dataValue];
    const findVoucher = lstVoucher.data.find(
      (item) => item.maVoucher == values
    );
    // Tìm kiếm và cập nhật item trong newData
    const findItemIndex = newData.findIndex(
      (item) => item.maCuaHang === idCuaHang
    );
    if (findItemIndex !== -1) {
      let result = newData[findItemIndex].hoaDonCTList.reduce(
        (total, i) => (total += i.soLuong * i.giaSanPham),
        0
      );
      if (newData[findItemIndex].maLoaiShip != null) {
        result =
          result -
          (result * findVoucher.phanTramGiam) / 100 +
          lstLoaiShip.data?.find(
            (item) => item.maLoaiShip === newData[findItemIndex].maLoaiShip
          ).phiShip;
      } else {
        result = result - (result * findVoucher.phanTramGiam) / 100;
      }
      const updatedItem = {
        ...newData[findItemIndex],
        maVoucher: findVoucher.maVoucher,
        tongTien: result,
      };
      newData[findItemIndex] = updatedItem;

      // Cập nhật state với newData
      setDataValue([...newData]);
    } else {
      console.log(`Không tìm thấy item với maCuaHang là ${idCuaHang}`);
    }
  };

  const changeGhiChu = (idCuaHang, value) => {
    const newData = [...dataValue];

    const findItemIndex = newData.findIndex(
      (item) => item.maCuaHang === idCuaHang
    );
    if (findItemIndex !== -1) {
      const updatedItem = {
        ...newData[findItemIndex],
        ghiChu: value,
      };
      newData[findItemIndex] = updatedItem;

      // Cập nhật state với newData
      setDataValue([...newData]);
    } else {
      console.log(`Không tìm thấy item với maCuaHang là ${idCuaHang}`);
    }
  };

  const handlePayment = async () => {
    if (loaiThanhToan == null) {
      toast.warning("Bạn chưa chọn loại thanh toán!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    if (loaiThanhToan?.maLoaiThanhToan != 2) {
      toast.warning(
        "Chưa hỗ trợ thanh toán " + loaiThanhToan?.tenLoaiThanhToan,
        {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
        }
      );
      return;
    }

    dataValue.forEach((item) => {
      if (item?.maLoaiShip == null) {
        toast.warning("Bạn chưa chọn loại ship cho " + item.tenCH, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
        });
        return;
      }
    });
    const orderCode = new Date(Date.now()).getTime();
    const dataSend = dataValue.map((item) => ({
      ...item,
      maLoaiThanhToan: loaiThanhToan?.maLoaiThanhToan,
      maUser: currentUser.data?.maAccount,
      code: orderCode,
      hoaDonCTList: item.hoaDonCTList.map((i, index) => ({
        ...i,
        maHD: "1",
      })),
    }));
    console.log(dataSend);
    await api
      .post("/user/hoadon/new", dataSend)
      .then((resp) => {
        if (resp.data.status == true) {
          handleQR(orderCode);
        }
      })
      .catch((e) => console.log(e));

    console.log(dataValue);
  };

  const handleQR = async function (orderCode) {
    const id = toast.loading("Đang tạo VietQR", {
      position: "top-center",
    });
    const body = {
      orderCode: orderCode,
      amount: dataValue.reduce((total, item) => (total += item.tongTien), 0),
      description: "Thanh toan HD",
      buyerAddress: currentUser.data?.diaChi,
      items: [],
      cancelUrl: "http://localhost:5173/confirm",
      returnUrl: "http://localhost:5173/confirm",
      expiredAt: Math.floor(
        (new Date(Date.now()).getTime() + 15 * 60000) / 1000
      ),
      template: "compact",
    };
    const query = `amount=${body.amount}&cancelUrl=${body.cancelUrl}&description=${body.description}&orderCode=${body.orderCode}&returnUrl=${body.returnUrl}`;
    const hmac = Base64.stringify(
      HmacSHA256(
        query,
        "dff2b663051b6bc4d07668b7c4e7a4f7f7365540fb8db84055b26156739a56e6"
      )
    );
    const data = await axios
      .post(
        "https://api-merchant.payos.vn/v2/payment-requests",
        { ...body, signature: hmac },
        {
          headers: {
            "x-client-id": "b8a76f89-11ab-4065-b0d8-bb3df22a7f58",
            "x-api-key": "57420532-9fb3-4c6f-89f9-d009a4859076",
          },
        }
      )
      .then((resp) => {
        toast.update(id, {
          render: "Tạo VietQR hoàn tất",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
        window.open(resp.data.data.checkoutUrl, "_blank");
        setCreatePayment(true);
      })
      .catch((e) => console.log(e));
    // const data2 = await axios
    //   .post(
    //     "https://api.vietqr.io/v2/generate",
    //     {
    //       accountNo: data?.accountNumber,
    //       accountName: data?.accountName,
    //       acqId: data?.bin,
    //       amount: data?.amount,
    //       addInfo: data?.description,
    //       format: "text",
    //       template: "qr_only",
    //     },
    //     {
    //       headers: {
    //         "x-client-id": "b8a76f89-11ab-4065-b0d8-bb3df22a7f58",
    //         "x-api-key": "57420532-9fb3-4c6f-89f9-d009a4859076",
    //       },
    //     }
    //   )
    //   .then((resp) => {
    //     // setInfoVietQR({ ...resp.data.data });
    //     setInfoVietQR({ ...data, ...resp.data.data });

    //     const contentType = "image/png";
    //     const b64Data = resp.data.data.qrDataURL.replace(
    //       "data:image/png;base64,",
    //       ""
    //     );

    //     const blob = base64StringToBlob(b64Data, contentType);
    //     // console.log(URL.createObjectURL(blob));
    //   })
    //   .catch((e) => console.log(e));
  };
  return (
    <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
      <div className="w-full mb-5">
        <PageTitle
          title="Thanh toán"
          breadcrumb={[
            { name: "Trang chủ", path: "/" },
            { name: "Thanh toán", path: "/checkout" },
          ]}
        />
      </div>
      <div className="checkout-main-content w-full">
        <div className="container-x mx-auto">
          <div className="w-full lg:flex lg:space-x-[30px]">
            <div className="flex-1">
              <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                Hóa đơn thanh toán
              </h1>

              {dataValue?.map((item, index) => {
                return (
                  <div className="w-full px-10 py-[30px] border border-[#EDEDED] mb-3">
                    <div className="sub-total mb-6">
                      <div className=" flex justify-between mb-5">
                        <p className="text-[13px] font-medium text-qblack uppercase">
                          {item.tenCH}
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
                        <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                          Loại ship
                        </span>
                        <ul className="flex flex-col space-y-1">
                          {lstLoaiShip.data?.map((j) => {
                            return (
                              <li>
                                <div className="flex justify-between items-center">
                                  <div className="flex space-x-2.5 items-center">
                                    <div className="input-radio">
                                      <input
                                        disabled={createPayment}
                                        checked={
                                          dataValue[index]?.maLoaiShip ==
                                          j.maLoaiShip
                                        }
                                        name={
                                          `maLoaiThanhToan` + item.maCuaHang
                                        }
                                        type="radio"
                                        onChange={(e) => {
                                          changeMaLoaiThanhToan(
                                            j,
                                            item.maCuaHang,
                                            index
                                          );
                                        }}
                                        className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                      />
                                    </div>
                                    <span className="text-[13px] text-normal text-qgraytwo">
                                      {j.tenLoaiShip}
                                    </span>
                                  </div>
                                  <span className="text-[13px] text-normal text-qgraytwo">
                                    {j.phiShip?.toLocaleString("en-US", {
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
                      <div>
                        <div className="shipping mb-6">
                          <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                            Loại voucher
                          </span>

                          <select
                            name="voucher"
                            disabled={createPayment}
                            id=""
                            onChange={(e) => {
                              onchangeVoucher(
                                e.target.value,
                                item.maCuaHang,
                                index
                              );
                            }}
                            className={`input-field border placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                          >
                            {lstVoucher.data?.map((j) => {
                              return (
                                <option
                                  value={j.maVoucher}
                                  selected={
                                    dataValue[index]?.maVoucher == j.maVoucher
                                  }
                                >
                                  {j.tenVoucher} - {j.phanTramGiam}%
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
                            disabled={createPayment}
                            name="maLoaiThanhToan"
                            onChange={(e) => {
                              changeGhiChu(item.maCuaHang, e.target.value);
                            }}
                            placeholder="Ghi chú đơn hàng..."
                            className={`input-field border placeholder:text-sm text-xs p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[30px]">
                      <div className=" flex justify-between mb-5">
                        <p className="text-base font-medium text-qblack">
                          Thành tiền
                        </p>
                        <p className="text-xl font-medium text-qred">
                          {item.tongTien?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {createPayment ? (
                <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                  <div
                    onClick={() => handlePayment()}
                    className="cursor-pointer"
                  >
                    <div className="w-full h-[50px] black-btn flex justify-center items-center">
                      <span className="text-sm font-semibold">
                        Đã chuyển khoản
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                  <div className="shipping mt-[10px]">
                    <ul className="flex flex-col space-y-1">
                      <li>
                        <div className="mt-[5px]">
                          <div className=" flex justify-between mb-5">
                            <p className="text-[13px] font-medium text-qblack uppercase">
                              Tổng hóa đơn
                            </p>
                            <p className="text-[15px] font-medium text-red-600 uppercase">
                              {dataValue
                                .reduce(
                                  (total, item) => (total += item.tongTien),
                                  0
                                )
                                ?.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </p>
                          </div>
                        </div>

                        <div className="shipping mb-6">
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
                                            loaiThanhToan?.maLoaiThanhToan ==
                                            item.maLoaiThanhToan
                                          }
                                          name="maLoaiThanhToan"
                                          type="radio"
                                          value={item.maLoaiThanhToan}
                                          onChange={(e) => {
                                            setLoaiThanhToan(item);
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
                            Thông tin giao hàng
                          </span>
                          <ul>
                            <li className="text-[15px] mb-2">
                              <span className="font-semibold">
                                Địa chỉ giao hàng:{" "}
                              </span>{" "}
                              {currentUser.data?.diaChi}
                            </li>
                            <li className="text-[15px]">
                              <span className="font-semibold">
                                Số điện thoại:{" "}
                              </span>{" "}
                              {currentUser.data?.soDienThoai}
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div
                    onClick={() => handlePayment()}
                    className="cursor-pointer"
                  >
                    <div className="w-full h-[50px] black-btn flex justify-center items-center">
                      <span className="text-sm font-semibold">
                        Xác nhận thanh toán
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatusCustom from "../../../StatusCustom";
import ModalCustom from "../../../ModalCustom";
import { getDetailOrderByUser } from "../../../../redux/action/userAction";

export default function OrderTab() {
  const dispatch = useDispatch();
  const { lstOrder, orderDetailUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);

  const showModalDetail = (id) => {
    console.log(id);
    dispatch(getDetailOrderByUser({ hoaDonID: id }));
    setOpenModal(true);
  };
  return (
    <>
      <ModalCustom
        active={openModal}
        classNameModal={"w-[700px]"}
        handleClose={() => setOpenModal(false)}
        title={
          "Chi tiết đơn hàng" +
          ` :#${orderDetailUser?.data && orderDetailUser.data.maHD}`
        }
      >
        <div className="flex flex-col gap-y-2  px-1">
          {orderDetailUser.data?.hoaDonCTList.map((item) => {
            return (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    className="h-16 w-16"
                    src={`http://localhost:8080/file/images/${item.hinhAnh}`}
                    alt=""
                  />
                  <span>
                    {item.tenSanPham} {item.tenSanPhamCT} x {item.soLuong}
                  </span>
                </div>
                <div>
                  {(item.soLuong * item.giaSanPham)?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-2 pt-2 border-t">
          <div>
            <span className="font-medium">Ngày lập hóa đơn: </span>
            {orderDetailUser.data?.ngayLapHD}
          </div>
          <div>
            <span className="font-medium">Tổng tiền: </span>
            <span className="text-red-500">
              {" "}
              {orderDetailUser.data?.tongTien.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div>
            <span className="font-medium">Ghi chú: </span>
            {orderDetailUser.data?.ghichu && orderDetailUser.data?.ghichu}
          </div>
          <div>
            <span className="font-medium">Người giao hàng: </span>
            {orderDetailUser.data?.shipper
              ? orderDetailUser.data?.shipper.tenShipper
              : "Chưa xác định"}
          </div>{" "}
          <div>
            <span className="font-medium">Xác nhận: </span>
            <span
              className={`${
                !orderDetailUser.data?.confirm
                  ? "bg-red-500-500"
                  : "bg-green-500"
              } text-white px-2 py-1`}
            >
              {orderDetailUser.data?.confirm ? "Đã xác nhận" : "Chưa xác nhận"}
            </span>
          </div>
          <div>
            <span className="font-medium">Trạng thái HD: </span>
            <span
              className={`${
                orderDetailUser.data?.trangThaiHD.itemKey == 1
                  ? "bg-red-500"
                  : "bg-green-500"
              } text-white px-2 py-1`}
            >
              {orderDetailUser.data?.trangThaiHD
                ? orderDetailUser.data?.trangThaiHD.itemName
                : "Chưa xác định"}
            </span>
          </div>
          <div>
            <span className="font-medium">Ngày lấy hàng: </span>
            {orderDetailUser.data?.ngayLayHang
              ? orderDetailUser.data?.ngayLayHang
              : "Chưa xác định"}
          </div>
          <div>
            <span className="font-medium">Trạng thái: </span>
            <span
              className={`${
                orderDetailUser.data?.trangThaiLH.itemKey == 1
                  ? "bg-yellow-500"
                  : orderDetailUser.data?.trangThaiLH.itemKey == 2
                  ? "bg-red-500"
                  : "bg-green-500"
              } text-white px-2 py-1`}
            >
              {orderDetailUser.data?.trangThaiLH
                ? orderDetailUser.data?.trangThaiLH.itemName
                : "Chưa xác định"}
            </span>
          </div>
          <div>
            <span className="font-medium">Ngày ship hàng: </span>
            {orderDetailUser.data?.ngayShipHang
              ? orderDetailUser.data?.ngayShipHang
              : "Chưa xác định"}
          </div>
          <div>
            <span className="font-medium">Trạng thái: </span>
            <span
              className={`${
                orderDetailUser.data?.trangThaiShip.itemKey == 1
                  ? "bg-yellow-500"
                  : orderDetailUser.data?.trangThaiShip.itemKey == 2
                  ? "bg-red-500"
                  : "bg-green-500"
              } text-white px-2 py-1`}
            >
              {orderDetailUser.data?.trangThaiShip
                ? orderDetailUser.data?.trangThaiShip.itemName
                : "Chưa xác định"}
            </span>
          </div>
          <div>
            <span className="font-medium">Loại ship: </span>
            {orderDetailUser.data?.loaiShip.tenLoaiShip}
          </div>
          <div>
            <span className="font-medium">Phí ship: </span>
            {orderDetailUser.data?.loaiShip.phiShip?.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </div>

        <div className="mt-3 flex gap-x-2 justify-end">
          <button
            className="bg-red-500 text-white py-2 px-3"
            onClick={() => setOpenModal(false)}
          >
            Đóng
          </button>
        </div>
      </ModalCustom>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">
                Mã hóa đơn
              </td>
              <td className="py-4 whitespace-nowrap text-center">Ngày lập</td>
              <td className="py-4 whitespace-nowrap text-center">Trạng thái</td>
              <td className="py-4 whitespace-nowrap text-center">Tổng tiền</td>
              <td className="py-4 whitespace-nowrap  text-center"></td>
            </tr>
            {/* table heading end */}
            {lstOrder.data?.map((item) => {
              return (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="text-center py-4">
                    <span
                      className="text-lg text-qgray font-medium line-clamp-1"
                      title={item.maHD}
                    >
                      #{item.maHD?.substring(0, 5)}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qgray  whitespace-nowrap">
                      {item.ngayLapHD}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <div className="flex flex-col items-center gap-y-2">
                      <StatusCustom
                        item={item.trangThaiHD}
                        id={"itemKey"}
                        name={"itemName"}
                      ></StatusCustom>
                      <StatusCustom
                        item={item.trangThaiLH}
                        id={"itemKey"}
                        name={"itemName"}
                        successID={"3"}
                        warningID={"1"}
                        reportID={"2"}
                      ></StatusCustom>
                      <StatusCustom
                        item={item.trangThaiShip}
                        id={"itemKey"}
                        name={"itemName"}
                      ></StatusCustom>
                    </div>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qblack whitespace-nowrap px-2 ">
                      {item.tongTien?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </td>
                  <td className="text-center py-4">
                    <button
                      type="button"
                      onClick={() => showModalDetail(item.maHD)}
                      className="w-[116px] h-[46px] bg-qyellow text-qblack font-bold"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

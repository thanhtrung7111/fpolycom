import React, { useState } from "react";
import ModalCustom from "../ModalCustom";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmByStore,
  getDetailOrderByStore,
} from "../../redux/action/storeAction";

const OrderStore = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const { lstOrderStore, detailOrderStore } = useSelector(
    (state) => state.store
  );
  const showModalDetail = (id) => {
    console.log(id);
    dispatch(getDetailOrderByStore({ hoaDonID: id }));
    setOpenModal(true);
  };
  const handleConfirm = (id) => {
    dispatch(
      confirmByStore({
        maHD: id,
        maCuaHang: currentUser.data?.cuaHang.maCuaHang,
      })
    );
  };
  return (
    <>
      <ModalCustom
        active={openModal}
        classNameModal={"w-[700px]"}
        handleClose={() => setOpenModal(false)}
        title={
          "Chi tiết đơn hàng" +
          ` :#${detailOrderStore?.data && detailOrderStore.data.maHD}`
        }
      >
        <div className="flex flex-col gap-y-2 overflow-y-scroll h-[200px] px-1">
          {detailOrderStore.data?.hoaDonCTList.map((item) => {
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
            {detailOrderStore.data?.ngayLapHD}
          </div>
          <div>
            <span className="font-medium">Tổng tiền: </span>
            <span className="text-red-500">
              {" "}
              {detailOrderStore.data?.tongTien.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div>
            <span className="font-medium">Ghi chú: </span>
            {detailOrderStore.data?.ghichu && detailOrderStore.data?.ghichu}
          </div>
          <div>
            <span className="font-medium">Người giao hàng: </span>
            {detailOrderStore.data?.shipper
              ? detailOrderStore.data?.shipper.tenShipper
              : "Chưa xác định"}
          </div>{" "}
          <div>
            <span className="font-medium">Xác nhận: </span>
            <span
              className={`${
                !detailOrderStore.data?.confirm
                  ? "bg-red-500-500"
                  : "bg-green-500"
              } text-white px-2 py-1`}
            >
              {detailOrderStore.data?.confirm ? "Đã xác nhận" : "Chưa xác nhận"}
            </span>
          </div>
          <div>
            <span className="font-medium">Trạng thái HD: </span>
            <span
              className={`${
                detailOrderStore.data?.trangThaiHD.itemKey == 1
                  ? "bg-red-500"
                  : "bg-green-500"
              } text-white px-2 py-1`}
            >
              {detailOrderStore.data?.trangThaiHD
                ? detailOrderStore.data?.trangThaiHD.itemName
                : "Chưa xác định"}
            </span>
          </div>
          <div>
            <span className="font-medium">Ngày lấy hàng: </span>
            {detailOrderStore.data?.ngayLayHang
              ? detailOrderStore.data?.ngayLayHang
              : "Chưa xác định"}
          </div>
          <div>
            <span className="font-medium">Trạng thái: </span>
            <span
              className={`${
                detailOrderStore.data?.trangThaiLH.itemKey == 1
                  ? "bg-yellow-500"
                  : detailOrderStore.data?.trangThaiLH.itemKey == 2
                  ? "bg-red-500"
                  : "bg-green-500"
              } text-white px-2 py-1`}
            >
              {detailOrderStore.data?.trangThaiLH
                ? detailOrderStore.data?.trangThaiLH.itemName
                : "Chưa xác định"}
            </span>
          </div>
          <div>
            <span className="font-medium">Ngày ship hàng: </span>
            {detailOrderStore.data?.ngayShipHang
              ? detailOrderStore.data?.ngayShipHang
              : "Chưa xác định"}
          </div>
          <div>
            <span className="font-medium">Trạng thái: </span>
            <span
              className={`${
                detailOrderStore.data?.trangThaiShip.itemKey == 1
                  ? "bg-yellow-500"
                  : detailOrderStore.data?.trangThaiShip.itemKey == 2
                  ? "bg-red-500"
                  : "bg-green-500"
              } text-white px-2 py-1`}
            >
              {detailOrderStore.data?.trangThaiShip
                ? detailOrderStore.data?.trangThaiShip.itemName
                : "Chưa xác định"}
            </span>
          </div>
          <div>
            <span className="font-medium">Loại ship: </span>
            {detailOrderStore.data?.loaiShip.tenLoaiShip}
          </div>
          <div>
            <span className="font-medium">Phí ship: </span>
            {detailOrderStore.data?.loaiShip.phiShip?.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </div>
          <div>
            <span className="font-medium">Khách hàng: </span>
            {detailOrderStore.data?.account.tenNguoiDung}
          </div>
          <div>
            <span className="font-medium">Số điện thoại: </span>
            {detailOrderStore.data?.account.soDienThoai}
          </div>
        </div>
        <div className="mt-3">
          <span className="font-medium">Địa chỉ: </span>
          {detailOrderStore.data?.account.diaChi}
        </div>
        <div className="mt-3 flex gap-x-2 justify-end">
          {!detailOrderStore.data?.confirm && (
            <button
              onClick={() => handleConfirm(detailOrderStore.data?.maHD)}
              className={`bg-blue-400 text-white py-2 px-3`}
            >
              Xác nhận đơn hàng
            </button>
          )}
          <button
            className="bg-red-500 text-white py-2 px-3"
            onClick={() => setOpenModal(false)}
          >
            Đóng
          </button>
        </div>
      </ModalCustom>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                #
              </th>
              <th scope="col" class="px-6 py-3">
                Mã hóa đơn
              </th>
              <th scope="col" class="px-6 py-3">
                Trạng thái
              </th>
              <th scope="col" class="px-6 py-3">
                Ngày lập hóa đơn
              </th>
              <th scope="col" class="px-6 py-3">
                Tổng tiền
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {lstOrderStore.data?.map((item, index) => {
              return (
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td class="px-6 py-4"> #{item.maHD.substring(0, 10)}</td>
                  <td class="px-6 py-4">{item.ngayLapHD}</td>
                  <td class="px-6 py-4">
                    <div
                      className={`${
                        item.confirm ? "bg-green-500" : "bg-red-500"
                      } px-2 py-2 text-center text-white`}
                    >
                      {item.confirm ? "Đã xác nhận" : "Chưa xác nhận"}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    {item.tongTien?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td class="px-6 py-4">
                    <div className="flex gap-x-1">
                      {!item.confirm && (
                        <button
                          onClick={() => {
                            dispatch(
                              confirmByStore({
                                maHD: item.maHD,
                                maCuaHang: currentUser.data?.cuaHang.maCuaHang,
                              })
                            );
                          }}
                          href="#"
                          class="font-medium border px-2 py-1 text-white bg-blue-500 disabled:opacity-70"
                        >
                          Xác nhận
                        </button>
                      )}
                      <button
                        onClick={() => showModalDetail(item.maHD)}
                        class="font-medium border px-2 py-1 text-white bg-yellow-500"
                      >
                        Chi tiết
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderStore;

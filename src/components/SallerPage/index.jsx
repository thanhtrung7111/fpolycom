import { useEffect, useRef, useState } from "react";
import productDatas from "../../data/products.json";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStore } from "../../redux/action/userAction";
import Loading from "../Loading";
import ProductsList from "./ProductsList";
import { loadLoaiHang, loadSPByStore } from "../../redux/action/commonAction";
import OrderStore from "./OrderStore";
import { loadOrderStore } from "../../redux/action/storeAction";

export default function SallerPage() {
  const dispatch = useDispatch();
  const { detailCuaHang, currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const reviewElement = useRef(null);
  const [tab, setTab] = useState("product");

  useEffect(() => {
    dispatch(getStore({ maCuaHang: id }));
    dispatch(loadSPByStore({ maCuaHang: id }));
    dispatch(loadOrderStore({ maCuaHang: id }));
    dispatch(loadLoaiHang());
  }, []);
  return detailCuaHang?.isLoading ? (
    <Loading></Loading>
  ) : (
    <>
      <div className="products-page-wrapper w-full">
        <div className="container-x mx-auto">
          <div
            data-aos="fade-right"
            className="saller-info w-full mb-[15px] sm:h-[428px] sm:flex justify-between items-center px-11 overflow-hidden relative py-20 sm:py-0"
            style={{
              background: `url(http://localhost:8080/file/images/${detailCuaHang.data?.banner}) no-repeat center center`,
              backgroundSize: "cover",
            }}
          >
            {/* PC */}
            <div className="store-status w-[320px] h-[220px] flex-col justify-center items-center rounded-full absolute -left-[30px] glass hidden sm:flex">
              <div className="saller-logo flex flex-col items-center">
                <div className="w-[100px] h-[100px] flex justify-center items-center rounded-full bg-white mb-2 p-1">
                  <img
                    src={`http://localhost:8080/file/images/${detailCuaHang.data?.hinhAnh}`}
                    alt="logo"
                    className="object-cover rounded-full h-full"
                  />
                </div>
                <span className="text-[26px] font-medium text-center text-white">
                  {detailCuaHang.data?.tenCuaHang}
                </span>
              </div>
            </div>

            <div className="store-status w-[320px] h-[220px] justify-start items-center rounded-full absolute -right-[30px] glass hidden sm:flex">
              <span className="text-[12px] font-600 text-white font-medium ml-[20px]">
                <ul>
                  <li className="flex space-x-3 items-center leading-9 text-base font-normal">
                    <span>
                      <svg
                        width="16"
                        height="12"
                        viewBox="0 0 16 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.00250844 3.36719C0.156817 3.46656 0.260523 3.53094 0.362354 3.59906C2.3971 4.95656 4.43123 6.31406 6.46598 7.67156C7.55426 8.39781 8.44825 8.39844 9.53591 7.67281C11.5794 6.30969 13.6217 4.94531 15.6652 3.58219C15.7582 3.52031 15.8544 3.46219 15.9856 3.37969C15.9913 3.50031 15.9994 3.58781 15.9994 3.67594C16 5.91656 16.0013 8.15656 15.9994 10.3972C15.9988 11.3853 15.3903 11.9984 14.4038 11.9991C10.135 12.0009 5.86624 12.0009 1.59682 11.9991C0.612871 11.9984 0.00313317 11.3834 0.00250844 10.3959C0.00125898 8.15469 0.00250844 5.91469 0.00250844 3.67406C0.00250844 3.59156 0.00250844 3.50844 0.00250844 3.36719Z"
                          fill="white"
                        />
                        <path
                          d="M8.00103 0.00122449C10.1557 0.00122449 12.3104 -0.00252551 14.4651 0.00309949C15.366 0.00559949 16.0345 0.6806 15.9963 1.53997C15.9732 2.05935 15.7058 2.4331 15.2792 2.71622C13.4156 3.95435 11.5564 5.1981 9.6953 6.43998C9.42729 6.61873 9.15928 6.79873 8.89002 6.97685C8.29715 7.3706 7.70428 7.37185 7.11141 6.97623C4.97483 5.54935 2.83637 4.12435 0.699789 2.6956C0.100046 2.29435 -0.126731 1.68935 0.0681849 1.04747C0.256229 0.42685 0.820362 0.00559949 1.50507 0.00372449C3.33741 -0.00252551 5.16912 0.00122449 7.00146 0.00122449C7.33506 0.00122449 7.66805 0.00122449 8.00103 0.00122449Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <span>Demoemail@gmail.com</span>
                  </li>
                  <li className="flex space-x-3 items-center leading-9 text-base font-normal">
                    <span>
                      <svg
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5085 14.0001C10.5529 13.9553 9.6013 13.6377 8.6926 13.1988C6.27351 12.0295 4.30056 10.3639 2.60467 8.39981C1.65664 7.30216 0.854189 6.11977 0.351704 4.78105C0.0963526 4.09939 -0.084448 3.40133 0.0405862 2.66719C0.106332 2.27908 0.266587 1.9347 0.568313 1.65372C1.00388 1.24812 1.43592 0.838683 1.87618 0.437996C2.50077 -0.129964 3.37366 -0.152376 4.00587 0.410664C4.71205 1.03985 5.40649 1.68215 6.07862 2.34304C6.80124 3.05367 6.54589 4.09666 5.5826 4.47384C4.70383 4.81768 4.37452 5.42773 4.72966 6.25151C5.4106 7.8324 6.63746 8.94153 8.32865 9.57454C9.12171 9.87137 9.85842 9.52698 10.1918 8.7923C10.6145 7.86082 11.7292 7.63069 12.5129 8.33093C13.2114 8.9552 13.8936 9.59477 14.5669 10.2425C15.1533 10.8067 15.1416 11.6299 14.5475 12.2077C14.1014 12.6417 13.64 13.0627 13.1792 13.483C12.7383 13.8864 12.1842 13.999 11.5085 14.0001Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <span>{detailCuaHang.data?.soDienThoai}</span>
                  </li>
                  <li className="flex space-x-3 items-center leading-9 text-base font-normal">
                    <span>
                      <svg
                        width="14"
                        height="19"
                        viewBox="0 0 14 19"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.97116 2.68819e-05C2.96055 0.0118815 -0.248362 3.57049 0.0150623 7.72998C0.107867 9.19477 0.60259 10.5136 1.45069 11.6909C3.13831 14.0337 4.82379 16.3787 6.5107 18.7214C6.77412 19.0875 7.21745 19.0934 7.47659 18.734C9.17135 16.3816 10.8761 14.0359 12.5566 11.6724C15.2879 7.83075 14.0101 2.65546 9.84454 0.632026C9.03428 0.239342 7.93562 -0.00293677 6.97116 2.68819e-05ZM6.99257 9.29479C5.81395 9.29035 4.85877 8.29975 4.85734 7.08094C4.85592 5.8614 5.80752 4.86931 6.98686 4.86116C8.17762 4.85301 9.14708 5.85769 9.13994 7.09428C9.13351 8.3116 8.16977 9.29924 6.99257 9.29479Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <span
                      className="overflow-hidden w-4/5 line-clamp-2"
                      title={detailCuaHang.data?.diaChi}
                    >
                      {detailCuaHang.data?.diaChi}
                    </span>
                  </li>
                </ul>
              </span>
            </div>
            {/* /PC */}

            {/* Mobile */}
            <div className="store-status h-[170px] justify-around px-5 items-center glass flex sm:hidden space-x-4">
              <div className="flex-col justify-items-center">
                <div className="rounded-full p-1 bg-white mb-1 w-[100px] h-[100px]">
                  <img
                    src={`http://localhost:8080/file/images/${detailCuaHang.data?.hinhAnh}`}
                    alt="logo"
                    className="object-cover rounded-full h-full"
                  />
                </div>
              </div>

              <span className="text-[13px] text-white font-thin">
                <span className="text-[20px] font-medium text-center text-white">
                  {detailCuaHang.data?.tenCuaHang}
                </span>

                <ul className="mt-1 border-t">
                  <li className="flex space-x-3 items-center leading-7 text-base">
                    <span>
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 16 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.00250844 3.36719C0.156817 3.46656 0.260523 3.53094 0.362354 3.59906C2.3971 4.95656 4.43123 6.31406 6.46598 7.67156C7.55426 8.39781 8.44825 8.39844 9.53591 7.67281C11.5794 6.30969 13.6217 4.94531 15.6652 3.58219C15.7582 3.52031 15.8544 3.46219 15.9856 3.37969C15.9913 3.50031 15.9994 3.58781 15.9994 3.67594C16 5.91656 16.0013 8.15656 15.9994 10.3972C15.9988 11.3853 15.3903 11.9984 14.4038 11.9991C10.135 12.0009 5.86624 12.0009 1.59682 11.9991C0.612871 11.9984 0.00313317 11.3834 0.00250844 10.3959C0.00125898 8.15469 0.00250844 5.91469 0.00250844 3.67406C0.00250844 3.59156 0.00250844 3.50844 0.00250844 3.36719Z"
                          fill="white"
                        />
                        <path
                          d="M8.00103 0.00122449C10.1557 0.00122449 12.3104 -0.00252551 14.4651 0.00309949C15.366 0.00559949 16.0345 0.6806 15.9963 1.53997C15.9732 2.05935 15.7058 2.4331 15.2792 2.71622C13.4156 3.95435 11.5564 5.1981 9.6953 6.43998C9.42729 6.61873 9.15928 6.79873 8.89002 6.97685C8.29715 7.3706 7.70428 7.37185 7.11141 6.97623C4.97483 5.54935 2.83637 4.12435 0.699789 2.6956C0.100046 2.29435 -0.126731 1.68935 0.0681849 1.04747C0.256229 0.42685 0.820362 0.00559949 1.50507 0.00372449C3.33741 -0.00252551 5.16912 0.00122449 7.00146 0.00122449C7.33506 0.00122449 7.66805 0.00122449 8.00103 0.00122449Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <span className="text-[12px]">Demoemail@gmail.com</span>
                  </li>
                  <li className="flex space-x-3 items-center leading-7 text-base">
                    <span>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 15 14"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.5085 14.0001C10.5529 13.9553 9.6013 13.6377 8.6926 13.1988C6.27351 12.0295 4.30056 10.3639 2.60467 8.39981C1.65664 7.30216 0.854189 6.11977 0.351704 4.78105C0.0963526 4.09939 -0.084448 3.40133 0.0405862 2.66719C0.106332 2.27908 0.266587 1.9347 0.568313 1.65372C1.00388 1.24812 1.43592 0.838683 1.87618 0.437996C2.50077 -0.129964 3.37366 -0.152376 4.00587 0.410664C4.71205 1.03985 5.40649 1.68215 6.07862 2.34304C6.80124 3.05367 6.54589 4.09666 5.5826 4.47384C4.70383 4.81768 4.37452 5.42773 4.72966 6.25151C5.4106 7.8324 6.63746 8.94153 8.32865 9.57454C9.12171 9.87137 9.85842 9.52698 10.1918 8.7923C10.6145 7.86082 11.7292 7.63069 12.5129 8.33093C13.2114 8.9552 13.8936 9.59477 14.5669 10.2425C15.1533 10.8067 15.1416 11.6299 14.5475 12.2077C14.1014 12.6417 13.64 13.0627 13.1792 13.483C12.7383 13.8864 12.1842 13.999 11.5085 14.0001Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <span className="text-[12px]">
                      {detailCuaHang.data?.soDienThoai}
                    </span>
                  </li>
                  <li className="flex space-x-3 items-center leading-7 text-base">
                    <span>
                      <svg
                        width="10"
                        height="14"
                        viewBox="0 0 14 19"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.97116 2.68819e-05C2.96055 0.0118815 -0.248362 3.57049 0.0150623 7.72998C0.107867 9.19477 0.60259 10.5136 1.45069 11.6909C3.13831 14.0337 4.82379 16.3787 6.5107 18.7214C6.77412 19.0875 7.21745 19.0934 7.47659 18.734C9.17135 16.3816 10.8761 14.0359 12.5566 11.6724C15.2879 7.83075 14.0101 2.65546 9.84454 0.632026C9.03428 0.239342 7.93562 -0.00293677 6.97116 2.68819e-05ZM6.99257 9.29479C5.81395 9.29035 4.85877 8.29975 4.85734 7.08094C4.85592 5.8614 5.80752 4.86931 6.98686 4.86116C8.17762 4.85301 9.14708 5.85769 9.13994 7.09428C9.13351 8.3116 8.16977 9.29924 6.99257 9.29479Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <span className="text-[12px] line-clamp-2">
                      {detailCuaHang.data?.diaChi}
                    </span>
                  </li>
                </ul>
              </span>
            </div>
            {/* /mobile */}
          </div>

          <div
            className="product-des-wrapper w-full relative pb-[30px]"
            ref={reviewElement}
          >
            <div className="tab-buttons w-full mt-5 sm:mt-0 border-b border-gray-200">
              <div className="container-x mx-auto">
                <ul className="flex">
                  <li>
                    <span
                      onClick={() => setTab("product")}
                      className={`py-[15px] px-6 sm:text-[15px] text-sm sm:block border-b-2 font-medium cursor-pointer ${
                        tab === "product"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                      }`}
                    >
                      Sản phẩm
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => setTab("des")}
                      className={`py-[15px] px-6 sm:text-[15px] text-sm sm:block border-b-2 font-medium cursor-pointer ${
                        tab === "des"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                      }`}
                    >
                      Tổng quan cửa hàng
                    </span>
                  </li>

                  {currentUser.data.cuaHang &&
                    detailCuaHang.data?.maCuaHang ==
                      currentUser.data?.cuaHang?.maCuaHang && (
                      <li>
                        <span
                          onClick={() => setTab("bill")}
                          className={`py-[15px] px-6 sm:text-[15px] text-sm sm:block border-b-2 font-medium cursor-pointer ${
                            tab === "bill"
                              ? "border-qyellow text-qblack "
                              : "border-transparent text-qgray"
                          }`}
                        >
                          Đơn hàng
                        </span>
                      </li>
                    )}
                </ul>
              </div>
            </div>
            <div className="tab-contents w-full min-h-[100px] ">
              <div className="container-x mx-auto">
                {tab === "des" && (
                  <div data-aos="fade-up" className="w-full tab-content-item">
                    <div>
                      <ul className="list-disc ml-[15px]">
                        <li className="font-normal text-qgray leading-9">
                          Ngày tham gia:{" "}
                          <span className="text-qyellow">
                            {detailCuaHang.data?.ngayLapCH}
                          </span>
                        </li>
                        <li className="font-normal text-qgray leading-9">
                          Đánh giá:{" "}
                          <span className="text-qyellow">
                            4.7 (50 đánh giá)
                          </span>
                        </li>
                        <li className="font-normal text-qgray leading-9">
                          Sản phẩm: <span className="text-qyellow">17</span>
                        </li>
                        <li className="font-normal text-qgray leading-9">
                          {detailCuaHang.data?.moTa}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {tab === "product" && (
                  <div
                    data-aos="fade-up"
                    className="w-full tab-content-item pt-3"
                  >
                    <ProductsList></ProductsList>
                  </div>
                )}

                {tab === "bill" && (
                  <div className="w-full tab-content-item">
                    <div className="text-[15px] pt-5 text-qgray text-normal mb-10">
                      <OrderStore></OrderStore>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import ProductsFilter from "../AllProductPage/ProductsFilter";
import DataIteration from "../Helpers/DataIteration";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import productDatas from "../../data/products.json";
import { useSelector } from "react-redux";
import ProductCardCustom from "../Helpers/Cards/ProductCardCustom";
const ProductsList = () => {
  const { lstProduct, lstLoaiHang } = useSelector((state) => state.common);
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);

  const changeItem = (item, check) => {
    if (check) {
      setFilter([...filter, item]);
    } else {
      setFilter([...filter.filter((i) => i.itemKey != item.itemKey)]);
    }
  };
  useEffect(() => {
    if (lstProduct.data != null) {
      if (filter?.length == 0) {
        setData([...lstProduct.data]);
      } else {
        setData([
          ...lstProduct.data?.filter((item) => {
            return (
              filter.findIndex((i) => i.itemKey == item.loaiHang.itemKey) >= 0
            );
          }),
        ]);
      }
    }
  }, [filter.length]);

  useEffect(() => {
    if (lstProduct?.data != null) {
      setData([...lstProduct.data]);
    }
  }, [lstProduct.data]);
  console.log(data);
  return (
    <div className="w-full lg:flex lg:space-x-[30px]">
      <div className="lg:w-[270px]">
        <div className="lg:w-[270px] bg-white p-3">
          <div className="filter-subject-item pb-10 border-b border-qgray-border">
            <div className="subject-title mb-[30px]">
              <h1 className="text-black text-base font-500">Loại hàng</h1>
            </div>
            <div className="filter-items">
              <ul>
                {lstLoaiHang.data?.map((item) => {
                  return (
                    <li className="item flex justify-between items-center mb-5">
                      <div className="flex space-x-[14px] items-cente">
                        <div>
                          <input
                            type="checkbox"
                            id={item.itemKey}
                            onChange={(e) => changeItem(item, e.target.checked)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={item.itemKey}
                            className="text-xs font-black font-400 capitalize r cursor-pointer"
                          >
                            {item.itemName}
                          </label>
                        </div>
                      </div>
                      <div>
                        <span className="cursor-pointer">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect y="4" width="10" height="2" fill="#C4C4C4" />
                            <rect
                              x="6"
                              width="10"
                              height="2"
                              transform="rotate(90 6 0)"
                              fill="#C4C4C4"
                            />
                          </svg>
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* ads */}
        </div>
        {/* ads */}
        <div className="w-full hidden lg:block h-[295px]">
          <img
            src={`/assets/images/ads-5.png`}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
          <div>
            <p className="font-400 text-[13px]">
              <span className="text-qgray"> Showing</span> 1–16 of 66 results
            </p>
          </div>
          <div className="flex space-x-3 items-center">
            <span className="font-400 text-[13px]">Sort by:</span>
            <div className="flex space-x-3 items-center border-b border-b-qgray">
              <span className="font-400 text-[13px] text-qgray">Default</span>
              <span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 1L5 5L9 1" stroke="#9A9A9A" />
                </svg>
              </span>
            </div>
          </div>
          <button
            onClick={() => setToggle(!filterToggle)}
            type="button"
            className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </button>
        </div>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
          {lstProduct.data?.map((item) => {
            return (
              <div data-aos="fade-up" key={item.maSanPham}>
                <ProductCardCustom
                  item={item}
                  totleReview={"totalReview"}
                  rating={"star"}
                  image={"hinhAnh"}
                  name="tenSanPham"
                  maxPrice={"giaToiDa"}
                  minPrice={"giaToiThieu"}
                  id={"maSanPham"}
                />
              </div>
            );
          })}
        </div>

        <div className="w-full h-[164px] overflow-hidden mb-[40px]">
          <img
            src={`/assets/images/ads-6.png`}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        {/* <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
          <DataIteration datas={products} startLength={6} endLength={15}>
            {({ datas }) => (
              <div data-aos="fade-up" key={datas.id}>
                <ProductCardStyleOne datas={datas} />
              </div>
            )}
          </DataIteration>
        </div> */}
      </div>
    </div>
  );
};

export default ProductsList;

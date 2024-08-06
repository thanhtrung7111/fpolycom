import React, { useEffect, useState } from "react";
import BreadcrumbCom from "../components/BreadcrumbCom";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCardCustom from "../components/Helpers/Cards/ProductCardCustom";
import { loadAllProduct, loadLoaiHang } from "../redux/action/commonAction";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const { lstLoaiHang, lstAllProduct } = useSelector((state) => state.common);
  const [data, setData] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const id = searchParam.get("itemLoaiHang");
  useEffect(() => {
    dispatch(loadLoaiHang());
    dispatch(loadAllProduct());
  }, []);
  useEffect(() => {
    if (lstAllProduct.data != null) {
      id != null
        ? setData([
            ...lstAllProduct.data?.filter(
              (item) => item.loaiHang.itemKey == id
            ),
          ])
        : setData([...lstAllProduct.data]);
    }
  }, [lstAllProduct.data, id]);

  return (
    <>
      <div className="products-page-wrapper w-full">
        <div className="container-x mx-auto">
          <BreadcrumbCom
            paths={[
              { name: "Trang chủ", path: "/" },
              {
                name: `Loại hàng ${
                  lstLoaiHang.data?.find((item) => item.itemKey == id).itemName
                }`,
                path: `/search-products?itemLoaiHang=${id}`,
              },
            ]}
          />
          {data.length == 0 ? (
            <div>
              Không có sản phẩm của loại hàng{" "}
              {lstLoaiHang.data?.find((item) => item.itemKey == id).itemName}!
            </div>
          ) : (
            <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
              {data?.map((item) => {
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
          )}
        </div>
      </div>
    </>
  );
};

export default SearchProduct;

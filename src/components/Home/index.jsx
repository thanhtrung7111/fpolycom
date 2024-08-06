// import { useEffect, useState } from "react";
import { useEffect } from "react";
import datas from "../../data/products.json";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import SectionStyleOne from "../Helpers/SectionStyleOne";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Layout from "../Partials/Layout";
// import Ads from "./Ads";
import Banner from "./Banner";
import BestSellers from "./BestSellers";
import BrandSection from "./BrandSection";
import CampaignCountDown from "./CampaignCountDown";
import ProductsAds from "./ProductsAds";
import { useDispatch, useSelector } from "react-redux";
import { loadAllProduct, loadLoaiHang } from "../../redux/action/commonAction";
export default function Home() {
  const dispatch = useDispatch();
  const { lstLoaiHang } = useSelector((state) => state.common);
  const { products } = datas;
  const brands = [];
  products.forEach((product) => {
    brands.push(product.brand);
  });
  useEffect(() => {
    dispatch(loadAllProduct());
    dispatch(loadLoaiHang());
  }, []);

  return (
    <>
      {/* {ads && <Ads handler={adsHandle} />} */}
      <div className="btn w-5 h-5 "></div>
      <Banner className="banner-wrapper mb-[60px]" />
      {lstLoaiHang.data?.map((item) => {
        return (
          <SectionStyleOne
            categoryTitle="Mobile & Tablet"
            categoryID={item.itemKey}
            sectionTitle={item.itemName}
            seeMoreUrl={`/search-products?itemLoaiHang=${item.itemKey}`}
            className="category-products mb-[60px]"
          />
        );
      })}
    </>
  );
}

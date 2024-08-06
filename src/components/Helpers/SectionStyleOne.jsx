import { useEffect, useState } from "react";
import CategoryCard from "./Cards/CategoryCard";
import ProductCardStyleOne from "./Cards/ProductCardStyleOne";
import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";
import { useSelector } from "react-redux";
import ProductCardCustom from "./Cards/ProductCardCustom";

export default function SectionStyleOne({
  className,
  categoryTitle,
  sectionTitle,
  seeMoreUrl,
  categoryID,
  categoryBackground,
}) {
  const [data, setData] = useState([]);
  const { lstAllProduct } = useSelector((state) => state.common);
  useEffect(() => {
    if (lstAllProduct.data != null) {
      setData([
        ...lstAllProduct.data?.filter(
          (item) => item.loaiHang.itemKey == categoryID
        ),
      ]);
    }
  }, [lstAllProduct.data]);
  console.log(data);
  return (
    data.length > 0 && (
      <div
        data-aos="fade-up"
        className={`section-style-one ${className || ""}`}
      >
        <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
          <div className="products-section w-full">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
              {/* <div className="category-card hidden xl:block w-full">
              <CategoryCard
                background={categoryBackground}
                title={categoryTitle}
                brands={filterBrands}
              />
            </div> */}
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
          </div>
        </ViewMoreTitle>
      </div>
    )
  );
}

import { useState } from "react";
import Star from "../Helpers/icons/Star";
import Selectbox from "../Helpers/Selectbox";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "../StarRating";
import TagCustom from "../TagCustom";
import { addWishList, removeWishlist } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import { addToCartByUser } from "../../redux/action/cartAction";

export default function ProductView({ className, reportHandler }) {
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.common);
  const { wishList, currentUser } = useSelector((state) => state.user);
  const { lstEvaludate } = useSelector((state) => state.common);
  const [active, setActive] = useState({
    id: null,
    tenSPCT: null,
    motaOption: null,
    gia: null,
    hinhAnh: null,
    soLuong: null,
  });
  let productsImg = productDetail.data?.sanPhamChiTietList;
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const changeTag = (value) => {
    setActive(value);
  };
  const handleLike = (id) => {
    const sanPham = wishList.data.find(
      (item) => item.maSanPham == productDetail.data?.maSanPham
    );
    if (sanPham) {
      dispatch(
        removeWishlist({ maSanPham: id, maUser: currentUser.data?.maAccount })
      );
    } else {
      dispatch(
        addWishList({ maSanPham: id, maUser: currentUser.data?.maAccount })
      );
    }
  };
  console.log(productsImg);
  const addCart = () => {
    if (active.id == null) {
      toast.warning("Chưa chọn sản phẩm thêm vào giỏ hàng", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    if (active.soLuong == 0) {
      toast.warning("Sản phẩm đã hết hàng!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    dispatch(
      addToCartByUser({
        maUser: currentUser.data?.maAccount,
        maSanPhamCT: active.id,
        soLuong: quantity,
      })
    );
    toast.success("Thêm sản phẩm thành công!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
    });
  };
  return (
    <div
      className={`product-view w-full lg:flex justify-between ${
        className || ""
      }`}
    >
      <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]">
        <div className="w-full">
          <div className=" w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
            <img
              src={`http://localhost:8080/file/images/${
                active.id != null ? active.hinhAnh : productDetail.data?.hinhAnh
              }`}
              alt=""
              className="object-cover object-center h-full"
            />
            {/* <div className="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
              <span>-10%</span>
            </div> */}
            {active.soLuong == 0 && (
              <div className="absolute text-xl top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gray-600 bg-opacity-75 text-gray-50 px-10 py-5">
                Hết hàng
              </div>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <div
              onClick={() =>
                changeTag({
                  id: null,
                  tenSPCT: null,
                  motaOption: null,
                  gia: null,
                  hinhAnh: null,
                  soLuong: null,
                })
              }
              className={`${
                active.id == null && "!opacity-100"
              } w-[110px] h-[110px] p-[15px] border opacity-40 border-qgray-border cursor-pointer`}
            >
              <img
                src={`http://localhost:8080/file/images/${productDetail.data?.hinhAnh}`}
                alt=""
                className={`w-full h-full object-contain`}
              />
            </div>
            {productsImg?.length > 0 &&
              productsImg.map((item) => (
                <div
                  onClick={() => changeTag(item)}
                  key={item?.id}
                  className={`${
                    active.id == item.id && "!opacity-100"
                  } w-[110px] h-[110px] p-[15px] border opacity-40 border-qgray-border cursor-pointer`}
                >
                  <img
                    src={`http://localhost:8080/file/images/${item?.hinhAnh}`}
                    alt=""
                    className={`w-full h-full object-contain`}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="product-details w-full mt-10 lg:mt-0">
          <span className="text-qgray text-xs font-normal uppercase tracking-wider mb-2 inline-block">
            {productDetail.data?.loaiHang.itemName}
          </span>
          <p className="text-2xl font-medium text-qblack mb-4">
            {productDetail.data?.tenSanPham}
          </p>
          <div className="flex space-x-[10px] items-center mb-6">
            <div className="flex">
              <StarRating
                rating={Math.round(productDetail.data?.star)}
              ></StarRating>
            </div>
            <span className="text-[13px] font-normal text-qblack">
              {lstEvaludate.data?.length} Đánh giá
            </span>
          </div>

          <div className="flex space-x-2 mb-7">
            <span className="text-2xl font-500 text-qred">
              {active.gia != null
                ? active.gia.toLocaleString("en-US", {
                    style: "currency",
                    currency: "VND",
                  })
                : productDetail.data?.giaToiThieu?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "VND",
                  })}
            </span>
            {productDetail.data?.giaToiThieu !== productDetail.data?.giaToiDa &&
              active.gia == null && (
                <>
                  <span className="text-red-400">-</span>
                  <span className="text-2xl font-500 text-qred">
                    {productDetail.data?.giaToiDa?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </>
              )}
          </div>

          <p className="text-qgray text-sm text-normal mb-[30px] leading-7">
            {productDetail.data?.moTa}
          </p>

          {/* <div  className="colors mb-[30px]">
            <span className="text-sm font-normal uppercase text-qblack mb-[14px] inline-block">
              Lựa chọn:
            </span>

            <div className="flex space-x-4 items-center">
              {productsImg &&
                productsImg.length > 0 &&
                productsImg.map((img) => (
                  <div key={img.id}>
                    {img.color && img.color !== "" && (
                      <button
                        onClick={() => changeImgHandler(img.src)}
                        type="button"
                        style={{ "--tw-ring-color": `${img.color}` }}
                        className="w-[20px] h-[20px]  rounded-full focus:ring-2  ring-offset-2 flex justify-center items-center"
                      >
                        <span
                          style={{ background: `${img.color}` }}
                          className="w-[20px] h-[20px] block rounded-full border"
                        ></span>
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div> */}

          <div className="product-size mb-[30px]">
            <span className="text-sm font-normal uppercase text-qblack mb-[14px] inline-block">
              Lựa chọn
            </span>
            <div className="w-full flex  gap-2 flex-wrap items-center">
              {productDetail.data?.sanPhamChiTietList?.map((item) => {
                return (
                  <TagCustom
                    handleClick={changeTag}
                    item={item}
                    id={"id"}
                    active={active}
                    name={"tenSPCT"}
                  ></TagCustom>
                );
              })}
            </div>
          </div>

          <div className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px]">
            <div className="w-[120px] h-full px-[26px] flex items-center border border-qgray-border">
              <div className="flex justify-between items-center w-full">
                <button
                  onClick={decrement}
                  type="button"
                  className="text-base text-qgray"
                >
                  -
                </button>
                <span className="text-qblack">{quantity}</span>
                <button
                  onClick={increment}
                  type="button"
                  className="text-base text-qgray"
                >
                  +
                </button>
              </div>
            </div>
            <div className="w-[60px] h-full flex justify-center items-center border border-qgray-border">
              <button type="button">
                <span onClick={() => handleLike(productDetail.data?.maSanPham)}>
                  {wishList.data?.find(
                    (item) => item.maSanPham == productDetail.data?.maSanPham
                  ) == null ? (
                    <i class="ri-heart-line text-gray-200 text-xl"></i>
                  ) : (
                    <i class="ri-heart-fill text-red-500 text-xl"></i>
                  )}
                </span>
              </button>
            </div>
            <div className="flex-1 h-full">
              <button
                type="button"
                onClick={() => addCart()}
                className="black-btn text-sm font-semibold w-full h-full"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>

          <div className="mb-[20px]">
            <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">Mã sản phẩm:</span> #
              {productDetail.data?.maSanPham}
            </p>
            <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">Tồn kho :</span>{" "}
              {active.soLuong != null
                ? active.soLuong
                : productDetail.data?.sanPhamChiTietList?.reduce(
                    (total, item) => (total += item.soLuong),
                    0
                  )}
            </p>
            <p className="text-[13px] text-blue-900 leading-7">
              <span className="text-qblack">Tags :</span>{" "}
              {productDetail.data?.loaiHang.itemName}
            </p>
          </div>

          <div className="flex space-x-2 items-center mb-[20px]">
            <span>
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0C0.247634 0 0.475436 0 0.729172 0C0.738324 0.160174 0.747477 0.316279 0.757647 0.493233C1.05816 0.392044 1.33885 0.282211 1.62818 0.203395C3.11296 -0.201361 4.51385 0.0366111 5.84202 0.779512C6.47661 1.13494 7.14171 1.39071 7.86987 1.47207C8.88125 1.58496 9.82093 1.35817 10.7098 0.88426C10.9335 0.765274 11.1522 0.636627 11.411 0.491199C11.4161 0.606117 11.4237 0.693577 11.4237 0.780529C11.4242 3.18822 11.4222 5.5954 11.4288 8.00309C11.4293 8.1892 11.3718 8.29089 11.2096 8.38039C9.31956 9.42279 7.4285 9.43499 5.54557 8.37734C4.06231 7.54443 2.55363 7.43307 0.992568 8.13835C0.804428 8.22327 0.737816 8.33005 0.739341 8.53904C0.749003 9.9206 0.744426 11.3027 0.744426 12.6842C0.744426 12.7849 0.744426 12.8851 0.744426 13C0.48764 13 0.254244 13 0 13C0 8.67582 0 4.34961 0 0Z"
                  fill="#EB5757"
                />
              </svg>
            </span>

            <button
              type="button"
              onClick={reportHandler}
              className="text-qred font-semibold text-[13px]"
            >
              Báo cáo sản phẩm
            </button>
          </div>

          <div className="social-share flex  items-center w-full">
            <span className="text-qblack text-[13px] mr-[17px] inline-block">
              Chia sẻ
            </span>

            <div className="flex space-x-5 items-center">
              <span>
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 16V9H0V6H3V4C3 1.3 4.7 0 7.1 0C8.3 0 9.2 0.1 9.5 0.1V2.9H7.8C6.5 2.9 6.2 3.5 6.2 4.4V6H10L9 9H6.3V16H3Z"
                    fill="#3E75B2"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

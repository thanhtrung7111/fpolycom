import { NavLink } from "react-router-dom";
import Star from "../icons/Star";
import { useDispatch, useSelector } from "react-redux";
import { addWishList, removeWishlist } from "../../../redux/action/userAction";
import StarRating from "../../StarRating";

export default function ProductCardCustom({
  item,
  name,
  image,
  minPrice,
  maxPrice,
  totleReview,
  rating,
  id,
}) {
  const dispatch = useDispatch();
  const { wishList, currentUser } = useSelector((state) => state.user);

  const removeLiked = (id) => {
    dispatch(
      removeWishlist({ maUser: currentUser.data.maAccount, maSanPham: id })
    );
  };

  const addLiked = (id) => {
    dispatch(
      addWishList({ maUser: currentUser.data.maAccount, maSanPham: id })
    );
  };
  return (
    <div
      className="product-card-one w-full h-full bg-white relative group overflow-hidden shadow-lg"
      style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="absolute w-full h-10 px-[30px] left-0 -bottom-full group-hover:bottom-2 z-20 transition-all duration-300 ease-in-out">
        <NavLink
          to={`/single-product/${item[id]}`}
          type="button"
          className="yellow-btn"
        >
          <div className="flex items-center space-x-3">
            <span>Chi tiết</span>
          </div>
        </NavLink>
      </div>
      <img
        className="product-card-img w-full h-[300px] bg-center bg-cover bg-no-repeat"
        src={`http://localhost:8080/file/images/${item[image]}`}
      />

      <div className="product-card-details px-[30px] pb-[30px] relative">
        {/* add to card button */}

        <div className="reviews flex space-x-[1px] mb-3 mt-3 gap-x-1 items-center">
          <StarRating rating={item[rating]}></StarRating>
          <span className="text-gray-600 text-xs">
            {" "}
            ({item[totleReview]} Đánh giá)
          </span>
        </div>
        <a href="/single-product">
          <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
            {item[name]}
          </p>
        </a>
        <p className="price">
          <span className="offer-price text-qred font-600 text-[14px]">
            {item[minPrice]?.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        {item[maxPrice] > item[minPrice] && (
            <span className="text-qred px-2">-</span>
          )}
          {item[maxPrice] > item[minPrice] && (
            <span className="offer-price text-qred font-600 text-[14px]">
              {item[maxPrice]?.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          )}
        </p>
      </div>
      {/* quick-access-btns */}

      <div className="quick-access-btns flex flex-col space-y-2 absolute right-0 top-0 transition-all duration-300 ease-in-out">
        <span className="w-10 h-10 flex justify-center items-center bg-white shadow-sm">
          {wishList.data?.find((i) => i.maSanPham == item[id]) != null ? (
            <i
              className="ri-heart-fill text-red-600 text-xl cursor-pointer"
              onClick={() => removeLiked(item[id])}
            ></i>
          ) : (
            <i
              className="ri-heart-line text-xl cursor-pointer"
              onClick={() => addLiked(item[id])}
            ></i>
          )}
        </span>
      </div>
    </div>
  );
}

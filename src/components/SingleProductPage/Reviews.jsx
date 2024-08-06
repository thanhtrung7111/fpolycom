import { useDispatch, useSelector } from "react-redux";
import Star from "../Helpers/icons/Star";
import InputCom from "../Helpers/InputCom";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";
import StarRating from "../StarRating";
import { useState } from "react";
import { Field, Form, Formik } from "formik";

import * as Yup from "yup";
import {
  postEvaludate,
  removeEvaludate,
} from "../../redux/action/commonAction";
import api from "../../api/api";

export default function Reviews({
  comments,
  rating,
  ratingHandler,
  name,
  nameHandler,
  email,
  emailHandler,
  phone,
  phoneHandler,
  message,
  messageHandler,
  reviewAction,
  hoverRating,
  hoverHandler,
  reviewLoading,
}) {
  const dispatch = useDispatch();
  const { lstEvaludate, productDetail } = useSelector((state) => state.common);
  const { currentUser } = useSelector((state) => state.user);
  const [star, setStar] = useState(0);

  const initialState = {
    maUser: currentUser.data?.maAccount,
    tieuDeDanhGia: "",
    noiDungDanhGia: "",
    chatLuong: "",
    ngayDanhGia: new Date(),
    hinhAnh: null,
  };
  const loginSchema = new Yup.object().shape({
    noiDungDanhGia: Yup.string().required("Không để trống nội dung đánh giá!"),
    chatLuong: Yup.number().required("Không bỏ chọn sao đánh giá!"),
  });

  const remove = (value) => {
    dispatch(removeEvaludate(value));
  };
  return (
    <div className="review-wrapper w-full">
      <div className="w-full reviews mb-[60px]">
        {/* comments */}
        <div className="w-full comments mb-[60px]">
          {lstEvaludate.data?.length > 0 ? (
            lstEvaludate.data?.map((comment) => (
              <div
                key={comment.maNguoiDanhGia}
                className="comment-item relative bg-white px-10 py-[32px] mb-2.5"
              >
                {comment?.maNguoiDanhGia == currentUser.data?.maAccount && (
                  <div
                    title="Xóa đánh giá"
                    onClick={() =>
                      remove({
                        maSanPham: productDetail.data?.maSanPham,
                        maUser: comment?.maNguoiDanhGia,
                      })
                    }
                    className="absolute bottom-3 text-gray-600 right-4 cursor-pointer"
                  >
                    <i class="ri-delete-bin-line"></i>
                  </div>
                )}

                <div className="comment-author flex justify-between items-center mb-3">
                  <div className="flex space-x-3 items-center">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img
                        src={`http://localhost:8080/file/images/${comment.hinhAnhNguoiDanhGia}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[18px] font-medium text-qblack">
                        {comment?.tenNguoiDanhGia}
                      </p>
                      <span className="text-gray-400 text-xs italic">
                        {comment?.ngayDanhGia}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      <StarRating rating={comment?.chatLuong}></StarRating>
                    </div>
                    <span className="text-[13px] font-normal text-qblack mt-1 inline-block">
                      ({comment.chatLuong})
                    </span>
                  </div>
                </div>
                <div className="comment mb-[10px]">
                  <p className="text-[15px] text-gray-700 leading-7 text-normal">
                    "{comment?.tieuDeDanhGia}"
                  </p>
                  <p className="text-[15px] text-qgray leading-7 text-normal">
                    {comment?.noiDungDanhGia}
                  </p>
                </div>
                {comment?.hinhAnh && (
                  <div>
                    <img
                      src={`http://localhost:8080/file/images/${comment?.hinhAnh}`}
                      className="h-16 w-20 object-cover object-center"
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-600 text-xs">Chưa có đánh giá nào!</div>
          )}
        </div>
        {/* load comments */}
        {/* <div className="w-full flex justify-center">
          <button
            type="button"
            className="black-btn w-[300px] h-[50px] text-sm font-semibold"
          >
            Load More
          </button>
        </div> */}
      </div>{" "}
      {lstEvaludate.data?.find(
        (item) => item.maNguoiDanhGia == currentUser.data?.maAccount
      ) ? (
        <div className="text-gray-600 text-xs">
          Bạn đã đánh giá sản phẩm này!
        </div>
      ) : (
        <Formik
          className="input-area"
          initialValues={initialState}
          validationSchema={loginSchema}
          onSubmit={async (values, actions) => {
            event.preventDefault();
            let resultImg = null;
            console.log(values.maSanPham);
            if (values.hinhAnh != null) {
              const formData = new FormData();
              formData.append("image", values.hinhAnh);
              resultImg = await api
                .post("/file/upload", formData)
                .then((response) => response.data)
                .catch((e) => console.log(e));
            }
            dispatch(
              postEvaludate({
                ...values,
                hinhAnh: resultImg,
                maSanPham: productDetail.data?.maSanPham,
              })
            );
            actions.resetForm();
            setStar(0);
          }}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <div className="write-review w-full">
                <h1 className="text-2xl font-medium text-qblack mb-5">
                  Đánh giá sản phẩm
                </h1>
                <div>
                  <div className="flex space-x-1 items-center mb-[10px]">
                    <div>
                      {Array(5)
                        .fill("-")
                        .map((item, index) => {
                          return index + 1 <= star ? (
                            <i
                              class="ri-star-fill text-yellow-400 text-xl cursor-pointer"
                              onClick={() => {
                                setStar(index + 1);
                                setFieldValue("chatLuong", index + 1);
                                setFieldValue(
                                  "tieuDeDanhGia",
                                  index + 1 >= 4
                                    ? "Sản phẩm chất lượng tốt!"
                                    : star >= 2
                                    ? "Sản phẩm chất lượng không tốt!"
                                    : "Sản phẩm chất lượng kém!"
                                );
                              }}
                            ></i>
                          ) : (
                            <i
                              class="ri-star-line text-yellow-400 text-xl cursor-pointer"
                              onClick={() => {
                                setStar(index + 1);
                                setFieldValue("chatLuong", index + 1);
                                setFieldValue(
                                  "tieuDeDanhGia",
                                  index + 1 >= 4
                                    ? "Sản phẩm chất lượng tốt!"
                                    : star >= 2
                                    ? "Sản phẩm chất lượng không tốt!"
                                    : "Sản phẩm chất lượng kém!"
                                );
                              }}
                            ></i>
                          );
                        })}
                    </div>
                    <span className="text-qblack text-[15px] font-normal mt-1">
                      ({star}.0){" "}
                    </span>
                    <span className="text-yellow-600">
                      {" "}
                      {star >= 4
                        ? "Sản phẩm chất lượng tốt!"
                        : star >= 2
                        ? "Sản phẩm chất lượng không tốt!"
                        : "Sản phẩm chất lượng kém!"}
                    </span>
                  </div>
                  {errors.chatLuong && touched.chatLuong && (
                    <div className="text-red-500 text-xs">
                      {errors.chatLuong}
                    </div>
                  )}
                </div>

                <div className="w-full review-form ">
                  <div className="w-full mb-[30px]">
                    <div className="input-com w-full h-full">
                      <label
                        className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                      >
                        Nội dung đánh giá
                      </label>

                      <div
                        className={`${
                          errors.noiDungDanhGia &&
                          touched.noiDungDanhGia &&
                          "border-red-500"
                        }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                      >
                        <Field
                          name="noiDungDanhGia"
                          type="text"
                          as="textarea"
                          row="20"
                          placeholder={"Nhập nội dung đánh giá...."}
                          className={`input-field placeholder:text-sm text-sm  p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                        />
                      </div>
                      {errors.noiDungDanhGia && touched.noiDungDanhGia && (
                        <div className="text-red-500 text-xs">
                          {errors.noiDungDanhGia}
                        </div>
                      )}
                    </div>
                    <div className="input-com w-full h-full mt-3">
                      <label
                        className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                      >
                        Chọn hình ảnh
                      </label>

                      <input
                        hidden
                        id="img"
                        type="file"
                        onChange={(e) => {
                          setFieldValue("hinhAnh", e.target.files[0]);
                        }}
                      />
                      <label htmlFor="img">
                        <img
                          className="w-28 h-16 object-cover object-center"
                          src={
                            !values.hinhAnh
                              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFtIiwbQLKvRRQn_06612_CSC84SsKQTbvoQ&s"
                              : URL.createObjectURL(values.hinhAnh)
                          }
                          alt=""
                        />
                      </label>
                      {errors.hinhAnh && touched.hinhAnh && (
                        <div className="text-red-500 text-xs">
                          {errors.hinhAnh}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="black-btn w-[300px] h-[50px]  flex justify-center"
                    >
                      <span className="flex space-x-1 items-center h-full">
                        <span className="text-sm font-semibold">
                          Gửi đánh giá
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {/* Đánh giá sản phẩm  */}
    </div>
  );
}

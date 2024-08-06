import { useEffect, useRef, useState } from "react";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  loadThanhPho,
  loadThiXa,
  loadTinh,
} from "../../redux/action/commonAction";
import { registerStore } from "../../redux/action/userAction";
import api from "../../api/api";
export default function BecomeSaller() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { lstTinh, lstThanhPho, lstThiXa } = useSelector(
    (state) => state.common
  );
  const [tinh, setTinh] = useState("");
  const [thanhPho, setThanhPho] = useState("");
  const [error, setError] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [initialState, setInitialState] = useState({
    tenCuaHang: "",
    moTa: "",
    diaChi: "",
    maThanhPho: "",
    maTinh: "",
    maThiXa: "",
    soDienThoai: "",
    address: "",
    hinhAnh: "",
    banner: "",
  });

  const cuaHangSchema = Yup.object().shape({
    tenCuaHang: Yup.string().required("Không để trống tên của hàng"),
    moTa: Yup.string().required("Không để trống mô tả!"),
    address: Yup.string().required("Không để trống địa chỉ cụ thể"),
    // maThanhPho: Yup.string().required("Không để trống thành phố"),
    // maTinh: Yup.string().required("Không để trống tỉnh!"),
    // maThiXa: Yup.string().required("Không để trống thị xã!"),
    soDienThoai: Yup.string().required("Không để trống số điện thoại!"),
  });
  // logo img
  const logoImgInput = useRef(null);
  const browseLogoImg = () => {
    logoImgInput.current.click();
  };

  const profileImgInput = useRef(null);
  const browseProfileImg = () => {
    profileImgInput.current.click();
  };
  const profileImgChangHandler = (e) => {
    setProfileImg(e.target.files[0]);
  };
  // cover img
  const coverImgInput = useRef(null);
  const browseCoverImg = () => {
    coverImgInput.current.click();
  };
  const coverImgChangHandler = (e) => {
    setCoverImg(e.target.files[0]);
  };

  const handleRegister = async (values) => {
    if (profileImg == null || coverImg == null) {
      setError("Không để trống hình ảnh và hình nền cửa hàng!");
      return;
    }

    const image1 = new FormData();
    image1.append("image", profileImg);

    await api
      .post("/file/upload", image1)
      .then((response) => (values.hinhAnh = response.data))
      .catch((e) => console.log(e));

    const image2 = new FormData();
    image2.append("image", coverImg);
    await api
      .post("/file/upload", image2)
      .then((response) => (values.banner = response.data))
      .catch((e) => console.log(e));

    let diachi =
      (values.address != "" ? values.address : "") +
      "," +
      (values.maThiXa != ""
        ? "Thị xã " +
          lstThiXa.data?.find((item) => item.maThiXa == values.maThiXa)
            ?.tenThiXa +
          ","
        : "") +
      (values.maThanhPho
        ? "Thành phố " +
          lstThanhPho.data?.find((item) => item.maThanhPho == values.maThanhPho)
            ?.tenThanhPho
        : "") +
      "," +
      lstTinh.data.find((item) => item.maTinh == values.maTinh)?.tenTinh;
    values.diaChi = diachi;
    values.maUser = currentUser.data.maAccount;
    dispatch(registerStore(values));
    console.log(values);
  };

  const changeTinh = (e) => {
    setInitialState({ ...initialState, maTinh: e.target.value });
  };

  const changeThanhPho = (e) => {
    setInitialState({ ...initialState, maThanhPho: e.target.value });
  };

  useEffect(() => {
    dispatch(loadTinh());
  }, []);

  return (
    <>
      <div className="become-saller-wrapper w-full">
        <div className="title mb-10">
          <PageTitle
            title="Seller Application"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "Become Saller", path: "/become-saller" },
            ]}
          />
        </div>

        <Formik
          className="input-area"
          initialValues={initialState}
          validationSchema={cuaHangSchema}
          enableReinitialize
          onSubmit={(values, actions) => {
            event.preventDefault();
            handleRegister(values);
          }}
        >
          {({ errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <div className="content-wrapper w-full mb-10">
                <div className="container-x mx-auto">
                  <div className="w-full bg-white sm:p-[30px] p-3">
                    <div className="flex xl:flex-row flex-col-reverse xl:space-x-11">
                      <div className="xl:w-[824px]">
                        <div className="title w-full mb-4">
                          <h1 className="text-[22px] font-semibold text-qblack mb-1">
                            Thông tin cửa hàng
                          </h1>
                          <p className="text-[15px] text-qgraytwo">
                            Điền đầy đủ các thông tin.
                          </p>
                        </div>
                        <div className="input-area">
                          <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                            {/* TEN CUA HANG  */}
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Tên cửa hàng
                              </label>

                              <div
                                className={`${
                                  errors.tenCuaHang &&
                                  touched.tenCuaHang &&
                                  "border-red-500"
                                }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                              >
                                <Field
                                  name="tenCuaHang"
                                  placeholder={"Nhập tên cửa hàng"}
                                  className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                />
                              </div>
                              {errors.tenCuaHang && touched.tenCuaHang && (
                                <span className="!text-red-400 !text-xs">
                                  {errors.tenCuaHang}
                                </span>
                              )}
                            </div>
                            {/* Số điện thoại */}
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Số điện thoại
                              </label>

                              <div
                                className={`${
                                  errors.soDienThoai &&
                                  touched.soDienThoai &&
                                  "border-red-500"
                                }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                              >
                                <Field
                                  name="soDienThoai"
                                  placeholder={"Nhập số điện thoại"}
                                  className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                />
                              </div>
                              {errors.soDienThoai && touched.soDienThoai && (
                                <span className="!text-red-400 !text-xs">
                                  {errors.soDienThoai}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                            {/* TInh */}
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Tỉnh
                              </label>

                              <div
                                className={`${
                                  errors.maTinh &&
                                  touched.maTinh &&
                                  "border-red-500"
                                }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                              >
                                <Field
                                  as="select"
                                  name="maTinh"
                                  onChange={(e) => {
                                    dispatch(
                                      loadThanhPho({
                                        maTinh: e.target.value,
                                      })
                                    );
                                    setFieldValue("maTinh", e.target.value);
                                  }}
                                  className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                >
                                  {lstTinh?.data?.map((item, index) => {
                                    return (
                                      <option
                                        selected={index == 0}
                                        value={item.maTinh}
                                      >
                                        {item.tenTinh}
                                      </option>
                                    );
                                  })}
                                </Field>
                              </div>
                              {errors.maTinh && touched.maTinh && (
                                <span className="!text-red-400 !text-xs">
                                  {errors.maTinh}
                                </span>
                              )}
                            </div>
                            {/* Thành phố */}
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Thành phố
                              </label>

                              <div
                                className={`${
                                  errors.maThanhPho &&
                                  touched.maThanhPho &&
                                  "border-red-500"
                                }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                              >
                                <Field
                                  as="select"
                                  name="maThanhPho"
                                  onChange={(e) => {
                                    dispatch(
                                      loadThiXa({ maThanhPho: e.target.value })
                                    );
                                    setFieldValue("maThanhPho", e.target.value);
                                  }}
                                  className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                >
                                  {lstThanhPho?.data?.map((item, index) => {
                                    return (
                                      <option
                                        selected={index == 0}
                                        value={item.maThanhPho}
                                      >
                                        {item.tenThanhPho}
                                      </option>
                                    );
                                  })}
                                </Field>
                              </div>
                              {errors.maThanhPho && touched.maThanhPho && (
                                <span className="!text-red-400 !text-xs">
                                  {errors.maThanhPho}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                            {/* Thị Xã */}
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Thị xã
                              </label>

                              <div
                                className={`${
                                  errors.maThiXa &&
                                  touched.maThiXa &&
                                  "border-red-500"
                                }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                              >
                                <Field
                                  as="select"
                                  name="maThiXa"
                                  placeholder={"Nhập số điện thoại"}
                                  onChange={(e) =>
                                    setFieldValue("maThiXa", e.target.value)
                                  }
                                  className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                >
                                  {lstThiXa?.data?.map((item, index) => {
                                    return (
                                      <option
                                        selected={index == 0}
                                        value={item.maThiXa}
                                      >
                                        {item.tenThiXa}
                                      </option>
                                    );
                                  })}
                                </Field>
                              </div>
                              {errors.maThiXa && touched.maThiXa && (
                                <span className="!text-red-400 !text-xs">
                                  {errors.maThiXa}
                                </span>
                              )}
                            </div>

                            {/* TEN CUA HANG  */}
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Địa chỉ cụ thể
                              </label>

                              <div
                                className={`${
                                  errors.address &&
                                  touched.address &&
                                  "border-red-500"
                                }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                              >
                                <Field
                                  name="address"
                                  placeholder={"Nhập số điện thoại"}
                                  className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                />
                              </div>
                              {errors.address && touched.address && (
                                <span className="!text-red-400 !text-xs">
                                  {errors.address}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="input-item mb-5">
                            {/* Mô tả */}
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Mô tả
                              </label>

                              <div
                                className={`${
                                  errors.moTa &&
                                  touched.moTa &&
                                  "border-red-500"
                                }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                              >
                                <Field
                                  as="textarea"
                                  name="moTa"
                                  placeholder={"Nhập mô tả"}
                                  className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                />
                              </div>
                              {errors.moTa && touched.moTa && (
                                <span className="!text-red-400 !text-xs">
                                  {errors.moTa}
                                </span>
                              )}
                            </div>
                            <div className="flex justify-center mt-5">
                              <button
                                type="submit"
                                className={`
                                black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center`}
                              >
                                <span>Đăng kí</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 mb-10 xl:mb-0">
                        <div className="update-profile w-full mb-9">
                          <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
                            Chọn hình ảnh cửa hàng
                            <span className="ml-1">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z"
                                  fill="#374557"
                                  fillOpacity="0.6"
                                />
                              </svg>
                            </span>
                          </h1>
                          <p className="text-sm text-qgraytwo mb-5">
                            Kích thước yêu cầu 300x300
                          </p>
                          <div className="flex xl:justify-center justify-start">
                            <div className="relative">
                              <img
                                src={
                                  profileImg
                                    ? URL.createObjectURL(profileImg)
                                    : `/assets/images/edit-profileimg.jpg`
                                }
                                alt=""
                                className="sm:w-[198px] sm:h-[198px] w-[199px] h-[199px] rounded-full overflow-hidden object-cover"
                              />
                              <input
                                ref={profileImgInput}
                                onChange={(e) => profileImgChangHandler(e)}
                                type="file"
                                className="hidden"
                              />
                              <div
                                onClick={browseProfileImg}
                                className="w-[32px] h-[32px] absolute bottom-7 sm:right-0 right-[105px]  hover:bg-[#F539F8] bg-[#F539F8] rounded-full cursor-pointer"
                              >
                                <svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                                    fill="white"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="update-cover w-full">
                          <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
                            Chọn hình nền cửa hàng
                            <span className="ml-1">
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z"
                                  fill="#374557"
                                  fillOpacity="0.6"
                                />
                              </svg>
                            </span>
                          </h1>
                          <p className="text-sm text-qgraytwo mb-5">
                            Kích thước yêu cầu 1170x920
                          </p>
                          <div className="flex justify-center">
                            <div className="w-full relative">
                              <img
                                src={
                                  coverImg
                                    ? URL.createObjectURL(coverImg)
                                    : `/assets/images/edit-coverimg.jpg`
                                }
                                alt=""
                                className="w-full h-[120px] rounded-lg overflow-hidden object-cover"
                              />
                              <input
                                ref={coverImgInput}
                                onChange={(e) => coverImgChangHandler(e)}
                                type="file"
                                className="hidden"
                              />
                              <div
                                onClick={browseCoverImg}
                                className="w-[32px] h-[32px] absolute -bottom-4 right-4 bg-[#F539F8] hover:bg-[#F539F8] rounded-full cursor-pointer"
                              >
                                <svg
                                  width="32"
                                  height="32"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                                    fill="white"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        {error && (
                          <div className="text-xs text-red-500">{error}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

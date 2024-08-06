import { useState } from "react";
import InputCom from "../../Helpers/InputCom";
import Layout from "../../Partials/Layout";
import Thumbnail from "./Thumbnail";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../../../api/api";

export default function Signup() {
  const [checked, setValue] = useState(false);
  const [data, setData] = useState({
    data: null,
    messageError: "",
    message: "",
    error: false,
    isPending: false,
    status: true,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialState = {
    tenDangNhap: "",
    matKhau: "",
    confirm: "",
    tenNguoiDung: "",
    soDienThoai: "",
    diaChi: "",
    email: "",
    gioiTinh: true,
  };
  const loginSchema = new Yup.object().shape({
    tenDangNhap: Yup.string()
      .required("Không để trống tên đăng nhập!")
      .min(5, "Có ít nhất 8 kí tự!")
      .max(20, "Không vượt quá 20 kí tự!"),
    matKhau: Yup.string()
      .required("Không để trống mật khẩu!")
      .min(5, "Có ít nhất 8 kí tự!")
      .max(20, "Không vượt quá 20 kí tự!"),
    confirm: Yup.string().oneOf(
      [Yup.ref("matKhau"), null],
      "Mật khẩu không khớp!"
    ),
    tenNguoiDung: Yup.string()
      .required("Không để trống tên người dùng!")
      .min(5, "Có ít nhất 8 kí tự!")
      .max(20, "Không vượt quá 20 kí tự!"),
    soDienThoai: Yup.string()
      .required("Không để trống số điện thoại!")
      .min(10, "Có ít nhất 8 kí tự!")
      .max(10, "Không vượt quá 10 kí tự!")
      .matches("[0-9]{10}", "Không đúng định dạng số điện thoại!"),
    diaChi: Yup.string()
      .required("Không để trống địa chỉ!")
      .min(10, "Có ít nhất 8 kí tự!")
      .max(80, "Không vượt quá 10 kí tự!"),
    email: Yup.string()
      .email("Email không đúng định dạng!")
      .required("Không để trống email!"),
    gioiTinh: Yup.boolean().required("Không để trống email"),
  });
  const rememberMe = () => {
    setValue(!checked);
  };
  const handleRegister = async (values) => {
    setData({ ...data, isPending: true });
    await api
      .post("/userregister", values)
      .then((resp) => {
        setData({ ...resp.data, isPending: false });
      })
      .catch((e) => {
        console.log(e);
        setData({
          ...data,
          error: true,
          messageError: "Lỗi hệ thống!",
          isPending: false,
        });
      });
  };
  return (
    <>
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full lg:h-[900px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    {data.data != null ? "Xác thực tài khoản" : "Tạo tài khoản"}
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="354"
                      height="30"
                      viewBox="0 0 354 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                        stroke="#FFBB38"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                {data.data == null ? (
                  <Formik
                    className="input-area"
                    initialValues={initialState}
                    validationSchema={loginSchema}
                    enableReinitialize
                    onSubmit={(values, actions) => {
                      console.log(values);
                      // event.preventDefault();
                      handleRegister(values);
                    }}
                  >
                    {({ errors, touched, isSubmitting, setFieldValue }) => (
                      <Form>
                        <div className="input-area">
                          <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Tên đăng nhập*
                              </label>

                              <div
                                className={`${
                                  errors.tenDangNhap &&
                                  touched.tenDangNhap &&
                                  "border-red-500"
                                }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                              >
                                <Field
                                  name="tenDangNhap"
                                  placeholder={"Nhập tên đăng nhập"}
                                  className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                />
                              </div>
                              {errors.tenDangNhap && touched.tenDangNhap && (
                                <span className="!text-red-400 !text-xs">
                                  {errors.tenDangNhap}
                                </span>
                              )}
                            </div>
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Email*
                              </label>

                              <div
                                className={`${
                                  errors.email &&
                                  touched.email &&
                                  "border-red-500"
                                }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                              >
                                <Field
                                  name="email"
                                  placeholder={"Nhập tên đăng nhập"}
                                  className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                />
                              </div>
                              {errors.email && touched.email && (
                                <span className="!text-red-400 !text-xs">
                                  {errors.email}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="input-item mb-5">
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Họ tên*
                              </label>

                              <div
                                className={`${
                                  errors.tenNguoiDung &&
                                  touched.tenNguoiDung &&
                                  "border-red-500"
                                }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                              >
                                <Field
                                  name="tenNguoiDung"
                                  placeholder={"Nhập họ tên..."}
                                  className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                />
                              </div>
                              {errors.tenNguoiDung && touched.tenNguoiDung && (
                                <span className="!text-red-400 !text-xs">
                                  {errors.tenNguoiDung}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="input-item mb-5">
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Mật khẩu*
                              </label>

                              <div
                                className={`${
                                  errors.matKhau &&
                                  touched.matKhau &&
                                  "border-red-500"
                                }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                              >
                                <Field
                                  type="password"
                                  name="matKhau"
                                  placeholder={"Nhập mật khẩu..."}
                                  className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                />
                              </div>
                              {errors.matKhau && touched.matKhau && (
                                <span className="!text-red-400 !text-xs">
                                  {errors.matKhau}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="input-item mb-5">
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Xác nhận mật khẩu*
                              </label>

                              <div
                                className={`${
                                  errors.confirm &&
                                  touched.confirm &&
                                  "border-red-500"
                                }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                              >
                                <Field
                                  type="password"
                                  name="confirm"
                                  placeholder={"Xác nhận mật khẩu..."}
                                  className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                />
                              </div>
                              {errors.confirm && touched.confirm && (
                                <span className="!text-red-400 !text-xs">
                                  {errors.confirm}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="input-item mb-5">
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Số điện thoại*
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
                                  placeholder={"Nhập số điện thoại..."}
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

                          <div className="input-item mb-5">
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Địa chỉ*
                              </label>

                              <div
                                className={`${
                                  errors.diaChi &&
                                  touched.diaChi &&
                                  "border-red-500"
                                }  input-wrapper border border-qgray-border w-full h-full overflow-hidden relative`}
                              >
                                <Field
                                  name="diaChi"
                                  placeholder={"Nhập địa chỉ..."}
                                  className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                />
                              </div>
                              {errors.diaChi && touched.diaChi && (
                                <span className="!text-red-400 !text-xs">
                                  {errors.diaChi}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="input-item mb-5">
                            <div className="input-com w-full h-full">
                              <label
                                className={`input-label capitalize block mb-2 text-qgray text-[13px] font-normal`}
                              >
                                Giới tính
                              </label>
                              <div className="flex items-center gap-x-3">
                                <div className="flex items-center gap-x-1">
                                  <Field
                                    id="nam"
                                    value={true}
                                    type="radio"
                                    name="gioiTinh"
                                    onChange={() => {
                                      setFieldValue("gioiTinh", true);
                                    }}
                                    placeholder={"Nhập tên đăng nhập"}
                                    className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                  />
                                  <label id="nam">Nam</label>
                                </div>
                                <div className="flex items-center gap-x-1">
                                  <Field
                                    id="nu"
                                    value={false}
                                    onChange={() => {
                                      setFieldValue("gioiTinh", false);
                                    }}
                                    type="radio"
                                    name="gioiTinh"
                                    placeholder={"Nhập tên đăng nhập"}
                                    className={`input-field placeholder:text-sm text-sm p-3 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none`}
                                  />
                                  <label htmlFor="nu">Nữ</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {data.error && (
                            <div className="text-red-500 text-sm mb-1">
                              {data.messageError}
                            </div>
                          )}
                          <div className="signin-area mb-3">
                            <div className="flex justify-center">
                              <button
                                // disabled={isSubmitting}
                                type="submit"
                                disabled={data.isPending}
                                className={`black-btn mb-6 disabled:opacity-40 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center`}
                              >
                                <span>Đăng kí tài khoản</span>
                              </button>
                            </div>
                          </div>
                          <div className="signup-area flex justify-center">
                            <p className="text-base text-qgraytwo font-normal">
                              Bạn đã có tài khoản?
                              <a href="/login" className="ml-2 text-qblack">
                                Đăng nhập
                              </a>
                            </p>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        window.open("https://mail.google.com/", "_blank");
                        navigate("/login");
                      }}
                      type="button"
                      className={`black-btn mb-6  text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center`}
                    >
                      Xác thực
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center">
              <div
                className="absolute xl:-right-20 -right-[138px]"
                style={{ top: "calc(50% - 258px)" }}
              >
                <Thumbnail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

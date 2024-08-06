import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api";

const ConfirmRegisterPages = () => {
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const [data, setData] = useState({
    data: null,
    messageError: "",
    message: "",
    error: false,
    status: true,
  });
  const token = searchParam.get("token");

  useEffect(() => {
    if (token == null || token == "") {
      navigate("/login");
      return;
    }

    const confirmToken = async () => {
      await api
        .post("/confirmAccount", { token: token })
        .then((resp) => setData(resp.data))
        .catch((e) => {
          navigate("/login");
        });
    };
    confirmToken();
  }, []);

  return (
    <>
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center justify-centers relative">
            <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Xác thực thành công{" "}
                    {data?.data ? data?.data : "Xác thực thất bại!"}
                  </h1>
                </div>
                <div className="input-area">
                  <div className="signin-area mb-3">
                    <div className="flex justify-center">
                      <NavLink
                        to={"/login"}
                        type="button"
                        className="black-btn text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                      >
                        <span>Đăng nhập</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmRegisterPages;

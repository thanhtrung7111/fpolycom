import { useDispatch, useSelector } from "react-redux";
import Cart from "../../../Cart";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../../../redux/reducer/userReducer";
import { useEffect } from "react";
import { loadWishList } from "../../../../redux/action/userAction";
import { loadCartByUser } from "../../../../redux/action/cartAction";

export default function Middlebar({ className, type }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (currentUser != null) {
      dispatch(loadWishList({ maUser: currentUser.data.maAccount }));
      dispatch(loadCartByUser({ maUser: currentUser.data.maAccount }));
    }
  }, [currentUser]);
  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              <a href="/">
                <img
                  width="152"
                  height="36"
                  src={`/assets/images/FpolyComLogoVertical.png`}
                  alt="logo"
                />
              </a>
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox type={type} className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              <div className="cart-wrapper group relative py-4">
               
                {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                {/* hidden group-hover:block" */}
                <Cart
                  type={type}
                  className="absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                />
              </div>
              <div>
                <div className="group/user flex items-center gap-x-2 relative">
                  {currentUser.data.hinhAnh ? (
                    <img
                      className="h-8 w-8 object-cover object-center rounded-full"
                      src={
                        `http://localhost:8080/file/images/` +
                        currentUser.data.hinhAnh
                      }
                      alt=""
                    />
                  ) : (
                    <span>
                      <ThinPeople />
                    </span>
                  )}

                  {currentUser?.data.tenNguoiDung}

                  <div className="opacity-0 transition-all invisible group-hover/user:opacity-100 group-hover/user:visible absolute top-full z-50 right-0 bg-white border rounded-lg">
                    <ul>
                      <li>
                        <NavLink
                          to={"/profile"}
                          className="block px-2 py-2 border-b w-48"
                        >
                          Thông tin cá nhân
                        </NavLink>
                      </li>
                      <li>
                        <button
                          href=""
                          className="block px-2 py-2"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

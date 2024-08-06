import { Link } from "react-router-dom";
// import Arrow from "../../../Helpers/icons/Arrow";
// import Selectbox from "../../../Helpers/Selectbox";

export default function TopBar({ className }) {
  return (
    <>
      <div
        className={`w-full bg-white h-10 border-b border-qgray-border ${
          className || ""
        }`}
      >
        <div className="container-x mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            <div className="topbar-nav">
              <ul className="flex space-x-6">
                <li>
                  <Link to="/">
                    <span className="text-xs leading-6 text-qblack font-500">
                      Tài khoản
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/tracking-order">
                    <span className="text-xs leading-6 text-qblack font-500">
                      Theo dõi đơn hàng
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="topbar-dropdowns sm:block hidden">
              <div className="flex space-x-6">
                  <Link to="/faq">
                    <span className="text-xs leading-6 text-qblack font-500">
                      Trợ giúp
                    </span>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

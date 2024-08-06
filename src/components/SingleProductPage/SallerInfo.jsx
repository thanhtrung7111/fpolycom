import { NavLink } from "react-router-dom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Star from "../Helpers/icons/Star";

export default function SallerInfo({ data }) {
  return (
    <div className="saller-info-wrapper w-full">
      <div className="saller-info sm:flex justify-between items-center pb-[30px] border-b border-[#E8E8E8]">
        <NavLink
          to={`/saller-page/${data.maCuaHang}`}
          className="sm:flex sm:space-x-5 items-center sm:w-1/4"
        >
          <div className="saller rounded-full overflow-hidden shadow-lg">
            <img
              src={`http://localhost:8080/file/images/${data.hinhAnh}`}
              alt="saller"
              className="w-[100px] h-[100px]  object-cover"
            />
          </div>
          <div className="flex-1">
            <h6 className="text-[18px] font-medium leading-[30px]">
              {data.tenCuaHang}
            </h6>
            <p className="text-[13px] font-normal text-qgray leading-[30px] line-clamp-2">
              <span className="font-semibold">Địa chỉ:</span> {data.diaChi}
            </p>
            <p className="text-[13px] font-normal text-qgray leading-[30px]">
              <span className="font-semibold">Số điện thoại:</span>
              {data.soDienThoai}
            </p>
            {/* <div className="flex items-center mt-4">
              <div className="flex">
                <Star w="15" h="15" />
                <Star w="15" h="15" />
                <Star w="15" h="15" />
                <Star w="15" h="15" />
                <Star w="15" h="15" />
              </div>
              <span className="text-[13px] font-normal ml-1">(4.5)</span>
            </div> */}
          </div>
        </NavLink>
        {/* <div className="flex-1 w-full sm:flex sm:space-x-5 justify-between sm:ml-[60px] mt-5 sm:mt-0">
          <div className="w-full mb-5 sm:mb-0">
            <ul>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Số diện thoại:
                </span>
                {data.soDienThoai}
              </li>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Category
                </span>
                : Mobile Phone, Sports, Gaming, Electronics
              </li>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Tags
                </span>
                : Beer, Foamer
              </li>
            </ul>
          </div>
          <div className="w-full ">
            <ul>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Products
                </span>
                : 120
              </li>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Category
                </span>
                : Mobile Phone, Sports, Gaming, Electronics
              </li>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Tags
                </span>
                : Beer, Foamer
              </li>
            </ul>
          </div>
        </div> */}
      </div>
      {/* <div className="saller-product w-full mt-[30px]">
        <h1 className="text-[18px] font-medium mb-5">Product from Shop</h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
          <DataIteration
            datas={products}
            startLength={0}
            endLength={products.length}
          >
            {({ datas }) => (
              <div key={datas.id} className="item">
                <ProductCardStyleOne datas={datas} />
              </div>
            )}
          </DataIteration>
        </div>
      </div> */}
    </div>
  );
}

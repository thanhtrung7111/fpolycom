import React, { useState } from "react";
import Drawer from "../components/Mobile/Drawer";
import Footer from "../components/Partials/Footers/Footer";
import Header from "../components/Partials/Headers/HeaderOne";
import DiscountBanner from "../components/Home/DiscountBanner";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      <Drawer open={drawer} action={() => setDrawer(!drawer)} />
      <div className="w-full overflow-x-hidden">
        <Header drawerAction={() => setDrawer(!drawer)} />
        <div className={`w-full  ${"pt-[30px] pb-[60px]"}`}>
          <Outlet />
        </div>
        <DiscountBanner />
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;

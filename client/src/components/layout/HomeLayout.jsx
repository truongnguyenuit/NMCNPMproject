import { useState } from "react";
import SideBar from "../sidebar/SideBar";
import "./HomeLayout.css";
import { Outlet } from "react-router-dom";
const HomeLayout = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  return (
    <>
      <SideBar
        isOpenSidebar={isOpenSidebar}
        setIsOpenSidebar={setIsOpenSidebar}
      />
      <div
        style={{ marginLeft: isOpenSidebar ? "200px" : "56px" }}
        className="main"
      >
        <Outlet />
      </div>
    </>
  );
};
export default HomeLayout;

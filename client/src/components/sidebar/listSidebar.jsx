import { AiFillHome } from "react-icons/ai";
import { HiUsers, HiUserGroup } from "react-icons/hi";
import { BsFillBox2Fill } from "react-icons/bs";
import { RiAccountCircleFill } from "react-icons/ri";
import {FaMoneyBill} from "react-icons/fa";
import {MdSell} from "react-icons/md";

export const listSidebar = [
  {
    display_name: "Trang chủ",
    route: "/",
    icon: AiFillHome,
    permissionUser: [0, 1, 2],
  },
  {
    display_name: "Bán hàng",
    route: "/sales",
    icon: MdSell,
    permissionUser: [0, 1, 2],
  },
  {
    display_name: "Khách hàng",
    route: "/customers",
    icon: HiUsers,
    permissionUser: [0, 1, 2],
  },
  {
    display_name: "Sản phẩm",
    route: "/products",
    icon: BsFillBox2Fill,
    permissionUser: [0, 2],
  },
  {
    display_name: "Nhân viên",
    route: "/staffs",
    icon: HiUserGroup,
    permissionUser: [0],
  },
  {
    display_name: "Hoá đơn",
    route: "/orders",
    icon: FaMoneyBill,
    permissionUser: [0, 1],
  },
  {
    display_name: "Tài khoản",
    route: "/account",
    icon: RiAccountCircleFill,
    permissionUser: [0, 1, 2],
  },
];

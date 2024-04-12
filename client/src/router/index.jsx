import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Account from "../pages/account/Account";
import Customers from "../pages/customers/Customers";
import DashBoard from "../pages/dashboard/DashBoard";
import Orders from "../pages/orders/Orders";
import Products from "../pages/products/Products";
import Staffs from "../pages/staffs/Staffs";
import Login from "../pages/login/Login";
import PrivateRoute from "./PrivateRoute";
import HomeLayout from "../components/layout/HomeLayout";
import Sales from "../pages/sales/Sales";
import Checkout from "../pages/sales/checkout/Checkout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute> 
        <HomeLayout></HomeLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "/sales",
        element: <Sales/>
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "staffs",
        element: <Staffs />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path:'/checkout',
        element:<Checkout/>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

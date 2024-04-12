import React, { useState } from "react";
import dashboardCostIcon from "../../assets/images/dashboardCost.png";
import revenueIcon from "../../assets/images/dashboardIcon1.png";
import dashboardOrderIcon from "../../assets/images/dashboardOrderIcon1.png";
import marginIcon from "../../assets/images/dashboardRevenueIcon.png";
import star from "../../assets/images/star.png";
import topcustomer from "../../assets/images/top.png";
import BarChart from "../../components/barchart/BarChart";
import { LineChart } from "../../components/linechart/LineChart";
import "./DashBoard.css";
const Dashboard = () => {
  const [revenueToday, setRevenueToday] = useState(0);
  const [expensiveToday, setExpensiveToday] = useState(0);
  const [countNumberToday, setCountNumberToday] = useState(0);
  const [top1Customer, setTop1Customer] = useState({});
  const [totalCustomerThisWeek, setTotalCustomerThisWeek] = useState();
  const [totalCustomerLastWeek, setTotalCustomerLastWeek] = useState();
  const [topProductByRevenue, setTopProductByRevenue] = useState();
  const [topProductByQuantity, setTopProductByQuantity] = useState();

  const dataCustomer = {
    labels: [
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
      "Chủ nhật",
    ],
    datasets: [
      {
        label: "Tuần trước",
        data: totalCustomerLastWeek,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tuần này",
        data: totalCustomerThisWeek,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const dataClothes = {
    labels: topProductByQuantity?.map((value) => {
      return value.productName;
    }),
    datasets: [
      {
        data: topProductByQuantity?.map((value) => {
          return value.count;
        }),
        backgroundColor: "#62B4FF",
        borderColor: "#62B4FF",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="main">
      <div className="search_name"></div>

      <div className="main_list dashboard_main">
        <div className="dashboard_overview">
          <div
            className="card dashboard_overview-card"
            style={{
              background: "-webkit-linear-gradient(left, #e3876e, #ef9946)",
            }}
          >
            <div className="dashboard_overview-content">
              <div className="dashboard_content-heading">
                <h3>Doanh thu</h3>
              </div>
              <div className="dashboard_content-body">
                <h3>{revenueToday?.toLocaleString("en")} VND</h3>
              </div>
            </div>
            <div className="dashboard_overview-img">
              <img src={revenueIcon} alt="" />
            </div>
          </div>

          <div
            className="card dashboard_overview-card"
            style={{
              background: "-webkit-linear-gradient(left, #9756f3, #d36ad5)",
            }}
          >
            <div className="dashboard_overview-content">
              <div className="dashboard_content-heading">
                <h3>Chi phí</h3>
              </div>
              <div className="dashboard_content-body">
                <h3>{expensiveToday?.toLocaleString("en")} VND</h3>
              </div>
            </div>
            <div className="dashboard_overview-img">
              <img src={dashboardCostIcon} alt="" />
            </div>
          </div>

          <div
            className="card dashboard_overview-card"
            style={{
              background: "-webkit-linear-gradient(left, #3591d4, #78b8e4)",
            }}
          >
            <div className="dashboard_overview-content">
              <div className="dash-board-overview-card dashboard_overview-card-content">
                <div className="dashboard_content-heading">
                  <h3>Số đơn</h3>
                </div>
                <div className="dashboard_content-body">
                  <h3>{countNumberToday?.toLocaleString("en")} đơn</h3>
                </div>
              </div>
            </div>
            <div className="dashboard_overview-img">
              <img src={dashboardOrderIcon} alt="" />
            </div>
          </div>

          <div
            className="card dashboard_overview-card"
            style={{
              background: "-webkit-linear-gradient(left, #29b2a9, #3fdb91)",
            }}
          >
            <div className="dashboard_overview-content">
              <div className="dashboard_content-heading">
                <h3>Lợi nhuận</h3>
              </div>
              <div className="dashboard_content-body">
                <h3>
                  {(revenueToday - expensiveToday).toLocaleString("en")} VND
                </h3>
              </div>
            </div>
            <div className="dashboard_overview-img">
              <img src={marginIcon} alt="" />
            </div>
          </div>
        </div>
        {/**end dashboard overview */}

        <div className="div-customer-chart">
          <div className="div-top-customer">
            <div className="div-customer-header">
              <h3 className="title-header">Top 1 khách hàng</h3>
            </div>
            <div className="div-info-top-customer">
              <div className="avt-customer">
                <img src={topcustomer} alt="" />
              </div>
              <div className="info-customer">
                <p className="name">{top1Customer.name}</p>
                <p className="phonenumber">SĐT: {top1Customer.phone}</p>
                <div className="div-icon">
                  <img className="icon-star" src={star} alt="" />
                  <img className="icon-star" src={star} alt="" />
                  <img className="icon-star" src={star} alt="" />
                  <img className="icon-star" src={star} alt="" />
                  <img className="icon-star" src={star} alt="" />
                </div>
              </div>
              <div className="div-total-point">
                <p className="title-total">Tổng điểm tích lũy</p>
                <p className="point">
                  {top1Customer.point?.toLocaleString("en")} điểm
                </p>
              </div>
            </div>
          </div>
          <div className="div-info-char">
            <div className="div-customer-header">
              <h3 className="title-header">Số khách ghé mua</h3>
            </div>
            <div className="div-char">
              <LineChart data={dataCustomer} />
            </div>
          </div>
        </div>
        {/**table dashboard */}

        <div className="dashboard_product-top">
          <div className="dashboard_product-top-header">
            <h3>Top 6 sản phẩm có doanh thu cao nhất trong ngày</h3>
          </div>
          <div class="dashboard_product-top-table">
            <table id="dashboard_product-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mã sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá bán</th>
                  <th>Số lượng bán</th>
                  <th>Doanh thu</th>
                </tr>
              </thead>
              <tbody>
                {topProductByRevenue?.map((product, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{product._id.substr(product._id.length - 9)}</td>
                      <td>{product.productName}</td>
                      <td>{`${product.salePrice.toLocaleString("en")}đ`}</td>
                      <td>{product.count.toLocaleString("en")}</td>
                      <td>{`${product.totalSalePrice.toLocaleString(
                        "en"
                      )}đ`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/**end table dashboard */}

        <div className="dashboard_chart-amount">
          <BarChart
            title="Top 6 sản phẩm bán chạy theo số lượng "
            data={dataClothes}
            horizontal
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import ModalUnstyled from "@mui/core/ModalUnstyled";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "./../../App";
import "./Orders.css";

import { styled } from "@mui/system";
import setAuthToken from "../../untils/setAuthToken";
const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const Orders = () => {
  const navigate = useNavigate();
  const [showFormOrderDetail, setShowFormOrderDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(1);
  const [orders, setOrders] = useState([]);
  const [originOrders, setOriginOrders] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const [orderFilter, setOrderFilter] = useState({
    orderId: "",
    customerName: "",
    seller: "",
    listStatus: [
      {
        status: "Đã thanh toán",
        checked: false,
      },
      {
        status: "Đã trả hàng",
        checked: false,
      },
    ],
  });
  const pages = [];

  for (let i = 2; i <= Math.ceil(orders.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const currentOrders = orders.slice(
    currentPage * itemsPerPage - itemsPerPage,
    currentPage * itemsPerPage
  );
  const renderPageNumbers = pages.map((number) => {
    if (number <= maxPageNumberLimit && number >= minPageNumberLimit) {
      return (
        <div
          onClick={() => {
            setCurrentPage(number);
          }}
          class={`cell ${currentPage === number ? "active" : null}`}
        >
          {number}
        </div>
      );
    }
    return null;
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setAuthToken(accessToken);
    axios
      .get(`${ENDPOINT}/sale/orders`)
      .then((res) => {
        setOrders(res.data.saleBill);
        setOriginOrders(res.data.saleBill);
      })
      .catch((err) => {
        alert("Lỗi call api");
      });
  }, []);
  useEffect(() => {
    console.log(
      orderFilter.orderId,
      orderFilter.customerName,
      orderFilter.seller,
      fromDate,
      toDate
    );
    setCurrentPage(1);
    const listStatusChecked = orderFilter.listStatus.filter(
      (status) => status.checked === true
    );
    if (
      listStatusChecked.length === orderFilter.listStatus.length ||
      listStatusChecked.length === 0
    ) {
      handleFilter(
        orderFilter.orderId,
        orderFilter.customerName,
        orderFilter.seller,
        fromDate,
        toDate
      );
    } else {
      const newOrder = orders.filter(
        (order) => order.status === listStatusChecked[0].status
      );
      setOrders(newOrder);
    }
  }, [orderFilter, fromDate, toDate]);
  const formateDate = (dateStr) => {
    var date = new Date(dateStr);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handlePreviousPagination = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage - 1 < minPageNumberLimit) {
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNextPagination = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    }
  };
  const handleFilter = (orderId, customerName, seller, fromDate, toDate) => {
    console.log({ orderId, customerName, seller, fromDate, toDate });
    if (!orderId && !customerName && !seller && !fromDate && !toDate) {
      setOrders(originOrders);
    } else {
      setCurrentPage(1);

      const fromDateTime = (fromDate && fromDate.getTime()) || 0;
      const toDateTime =
        (toDate && toDate.getTime() + 3600 * 24 * 1000) || new Date().getTime();
      var orderFiltered = originOrders.filter((order) => {
        const dateOrder = new Date(order.dateOrder);

        if (order.customer) {
          return (
            fromDateTime <= dateOrder.getTime() &&
            toDateTime > dateOrder.getTime() &&
            order._id.indexOf(orderId) >= 0 &&
            order.customer &&
            order.customer?.name
              .toLowerCase()
              .indexOf(customerName.toLowerCase()) >= 0 &&
            order.customer &&
            order.user.fullname.indexOf(seller) >= 0
          );
        } else {
          return (
            fromDateTime <= dateOrder.getTime() &&
            toDateTime > dateOrder.getTime() &&
            order._id.indexOf(orderId) >= 0 &&
            !customerName &&
            order.user.fullname.indexOf(seller) >= 0
          );
        }
      });

      setOrders(orderFiltered);
    }
  };

  return (
    <div className="main">
      <div className="search_name"></div>

      <div className="main_list">
        <div className="list_left">
          <div className="card_value">
            <label className="card_value-label">Tìm kiếm</label>
            <div className="card_value-body">
              <div className="card_value-item">
                <input
                  placeholder="Theo mã hoá đơn"
                  type="text"
                  className="card_value-input"
                  value={orderFilter.orderId}
                  onChange={(e) => {
                    setOrderFilter((prev) => {
                      return {
                        ...prev,
                        orderId: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="card_value-item">
                <input
                  placeholder="Theo tên khách hàng"
                  type="text"
                  className="card_value-input"
                  value={orderFilter.customerName}
                  onChange={(e) => {
                    setOrderFilter((prev) => {
                      return {
                        ...prev,
                        customerName: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="card_value-item">
                <input
                  placeholder="Theo tên người bán"
                  type="text"
                  className="card_value-input"
                  value={orderFilter.seller}
                  onChange={(e) => {
                    setOrderFilter((prev) => {
                      return {
                        ...prev,
                        seller: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="card_value">
            <h4 className="card_value-label">Thời gian</h4>
            <div className="card_value-body">
              <div className="card_value-item">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    inputFormat="dd/MM/yyyy"
                    views={["day", "month", "year"]}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    label={fromDate ? "" : "Từ ngày"}
                    value={fromDate}
                    onChange={(newValue) => {
                      setFromDate(newValue);
                    }}
                    // className="card_value-input"
                    renderInput={(params) => (
                      <TextField
                        InputLabelProps={{
                          shrink: false,
                        }}
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="card_value-item">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    minDate={fromDate}
                    inputFormat="dd/MM/yyyy"
                    views={["day", "month", "year"]}
                    label={toDate ? "" : "Đến ngày"}
                    value={toDate}
                    onChange={(newValue) => {
                      setToDate(newValue);
                    }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    className="card_value-input"
                    renderInput={(params) => (
                      <TextField
                        InputLabelProps={{
                          shrink: false,
                        }}
                        {...params}
                        variant="standard"
                        size="small"
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <div className="card_value">
            <h4 className="card_value-label">Trạng thái</h4>
            <div className="card_value-item">
              <Checkbox
                onChange={() => {
                  let newListStatus = orderFilter.listStatus;
                  newListStatus[0].checked = !newListStatus[0].checked;
                  setOrderFilter({
                    ...orderFilter,
                    listStatus: newListStatus,
                  });
                }}
                value={orderFilter.listStatus[0]}
              />
              <span style={{ width: "100%" }}>Đã thanh toán</span>
            </div>
            <div className="card_value-item">
              <Checkbox
                value={orderFilter.listStatus[1]}
                onChange={() => {
                  let newListStatus = orderFilter.listStatus;
                  newListStatus[1].checked = !newListStatus[1].checked;
                  setOrderFilter({
                    ...orderFilter,
                    listStatus: newListStatus,
                  });
                }}
              />
              <span style={{ width: "100%" }}>Đã trả hàng</span>
            </div>
          </div>
        </div>

        <div className="list_right">
          <div class="order-table-container">
            <table id="order-table">
              <thead>
                <tr>
                  <th>Mã hoá đơn</th>
                  <th>Ngày tạo</th>
                  <th>Khách hàng</th>
                  <th>Nhân viên</th>
                  <th>Tổng cộng</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  currentOrders.map((order, index) => {
                    return (
                      <tr
                      >
                        <td>{order._id.substr(order._id.length - 10)}</td>
                        <td>{formateDate(order?.customer?.createAt)}</td>
                        <td>
                          {order.customer ? order.customer.name : "Khách lẻ"}
                        </td>
                        <td>{userLocal?.fullname}</td>
                        <td>{`${order.orderTotal.toLocaleString("en")}đ`}</td>
                        <td>Đã thanh toán</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {/**Start Pagination */}
            {pages.length >= 1 && (
              <div class="pagination">
                <div class="pagination-left">
                  <button
                    disabled={currentPage === 1 ? true : false}
                    onClick={handlePreviousPagination}
                    class="cell"
                    id="prev-btn"
                  >
                    <i class="fas fa-caret-left"></i>
                  </button>
                  <div
                    onClick={() => {
                      setCurrentPage(1);
                      setminPageNumberLimit(1);
                      setmaxPageNumberLimit(pageNumberLimit);
                    }}
                    className={`cell ${currentPage === 1 ? "active" : ""}`}
                  >
                    1
                  </div>
                  {minPageNumberLimit > 1 && (
                    <div onClick={handlePreviousPagination} class="cell">
                      {" "}
                      &hellip;
                    </div>
                  )}

                  {renderPageNumbers}

                  {maxPageNumberLimit < pages.length && (
                    <div onClick={handleNextPagination} class="cell">
                      {" "}
                      &hellip;
                    </div>
                  )}

                  <button
                    disabled={
                      currentPage === pages[pages.length - 1] ? true : false
                    }
                    onClick={handleNextPagination}
                    class="cell"
                    id="next-btn"
                  >
                    <i class="fas fa-caret-right"></i>
                  </button>
                </div>
                <div class="pagination-right">
                  <p>Số hàng mỗi dòng: {itemsPerPage} / Tổng số hoá đơn</p>
                </div>
              </div>
            )}
            {/**Pagination */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

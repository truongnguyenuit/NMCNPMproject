import React, { useState } from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import axios from "axios";
import "./addcustomer.css";
import useFormAddCustomer from "./useFormAddCustomer";
import validateCustomer from "./validateCustomer";
import { toast } from "react-toastify";
import { ENDPOINT } from '../../../App'
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

const AddCustomer = ({ open, handleCancel }) => {
  const [customer, setCustomer] = useState({
    name: "",
    telephoneNumber: "",
    email: "",
    address: "",
  });

  const submitForm = () => {
    console.log(customer);
    const test = {
      name: customer.name,
      telephoneNumber: customer.telephoneNumber,
      email: customer.email,
      address: customer.address,
    };
    console.log(customer)

    //post to API
    axios
      .post(`${ENDPOINT}/customer`, customer)
      .then((res) => {
        toast("Thêm khách hàng thành công.");
      })
      .catch((err) => {
        console.log(err.response.data);
        toast(
          "Thêm khách hàng thất bại, tên tài khoản hoặc số điện thoại đã tồn tại trong hệ thống."
        );
      });
  };
  const { handleChange, handleSubmit, errors } = useFormAddCustomer(
    submitForm,
    customer,
    setCustomer,
    validateCustomer
  );

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleCancel}
      BackdropComponent={Backdrop}
    >
      <div className="add-customer-container">
        <div className="add-customer-title ">
          <p>Thêm khách hàng</p>
          <div
            onClick={() => {
              handleCancel();
            }}
            className="bx bx-x form-btn-exit add-customer-close"
          ></div>
        </div>
        <div className="add-customer-input-container">
          <input
            name="name"
            className={`add-customer-input ${
              errors.name ? "error active" : ""
            }`}
            type="text"
            placeholder={errors.name ? errors.name : "Họ và tên"}
            value={customer.name}
            onChange={handleChange}
          />
          <input
            name="telephoneNumber"
            className={`add-customer-input ${
              errors.telephoneNumber ? "error active" : ""
            }`}
            type="text"
            value={customer.telephoneNumber}
            onChange={handleChange}
            placeholder={
              errors.telephoneNumber ? errors.telephoneNumber : "Số điện thoại"
            }
          />
          <input
            name="email"
            className={`add-customer-input ${
              errors.email ? "error active" : ""
            }`}
            type="text"
            value={customer.email}
            onChange={handleChange}
            placeholder={errors.email ? errors.email : "Email"}
          />
          <input
            name="address"
            className={`add-customer-input ${
              errors.address ? "error active" : ""
            }`}
            type="text"
            value={customer.address}
            onChange={handleChange}
            placeholder={errors.address ? errors.address : "Address"}
          />
        </div>

        <div className="action-btn" style={{ margin: "0" }}>
          <button className="btn" onClick={handleSubmit}>
            <i className="bx bx-plus action-btn-icon"></i>
            Thêm khách hàng
          </button>
        </div>
      </div>
    </StyledModal>
  );
};

export default AddCustomer;

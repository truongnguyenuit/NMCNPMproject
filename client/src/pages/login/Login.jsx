import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import useFormLogin from "./useFormLogin";
import validateUser from "./validateUser";
import { ENDPOINT } from './../../App';
const Login = () => {
  const [errorLogin, setErorLogin] = useState("");
  const navigate = useNavigate();

  const submitForm = () => {
    const registerInput = {
      account: user.username,
      password: user.password,
    };
    axios
      .post(`${ENDPOINT}/auth/login`, registerInput)
      .then((res) => {
        console.log(res.data)
        if (res.data.success) {
          localStorage.setItem(
            "accessToken",
            res.data.accessToken
          );
          localStorage.setItem(
            "user",
            JSON.stringify(res.data.user)
          );
          console.log(res)
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        setErorLogin("Tên tài khoản hoặc mật khẩu không chính xác");
      });
  };
  const { handleChange, handleSubmit, user, errors } = useFormLogin(
    submitForm,
    validateUser
  );

  return (
    <div className="login-container">
      <div className="login-form">
        <h3 id="login-form-title">ĐĂNG NHẬP</h3>

        <div className="login-form-inputs">
          <input
            value={user.username}
            className="login-form-input"
            type="text"
            placeholder="Tài khoản"
            onChange={handleChange}
            name="username"
          />
          <p className="login-form-error">{errors.username}</p>
        </div>
        <div className="login-form-inputs">
          <input
            className="login-form-input"
            type="password"
            placeholder="Mật khẩu"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
          <p className="login-form-error">{errors.password}</p>
        </div>

        <div className="login-form-row login-failed">
          <p>{errorLogin}</p>
        </div>
        <div className="login-form-item">
          <button onClick={handleSubmit} className="btn-login">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

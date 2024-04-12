import axios from "axios";
import React, { useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFormStaff from "./form_validate/useFormStaff";
import validateStaff from "./form_validate/validateStaff";
import { ENDPOINT } from "./../../App";
const AddStaff = ({ setShowFormAddStaff }) => {
  const inputAvatarRef = useRef(null);
  const [avatar, setAvatar] = useState();
  const [staff, setStaff] = useState({
    account: "",
    password: "",
    telephoneNumber: "",
    address: "",
    sex: "Nam",
    email: "",
    fullname: "",
    img: "",
  });

  //Call API
  const submitForm = () => {
    const formStaff = {
      account: staff.account,
      password: staff.password,
      fullname: staff.fullname,
      address: staff.address,
      sex: staff.sex,
      email: staff.email,
      telephoneNumber: staff.telephoneNumber,
      img: avatar
        ? avatar
        : "https://cdn-icons-png.flaticon.com/512/3342/3342137.png",
    };
    console.log("submit");
    //post to API
    axios
      .post(`${ENDPOINT}/auth/register`, formStaff)
      .then((res) => {
        setShowFormAddStaff(false);
        toast("Thêm mới nhân viên thành công");
      })
      .catch((err) => {
        toast("Thêm mới nhân viên thất bại");
      });
  };
  const { handleChange, handleSubmit, errors } = useFormStaff(
    submitForm,
    staff,
    setStaff,
    validateStaff
  );
  const onExitClick = () => {
    setShowFormAddStaff(false);
  };
  //active function when choose image from pc
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      const uploadImg = async () => {
        try {
          const formData = new FormData();
          formData.append(`file`, event.target.files[0]);
          formData.append("upload_preset", "minaTram");
          formData.append("cloud_name", "ltbichtram");
          formData.append("folder", "nhapmoncongnghephanmem");
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/ltbichtram/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          return res.json(); // Trả về response
        } catch (error) {
          throw error; // Ném lỗi để xử lý ở bên ngoài
        }
      };

      (async () => {
        try {
          const response = await uploadImg();
          console.log(response);
          setAvatar(response.url);
        } catch (error) {
          // Xử lý lỗi
          console.log(error);
        }
      })();
    }
  };

  return (
    <div className="form-container">
      <div className="form-heading">
        <h3 className="form-heading-title">Thêm mới nhân viên</h3>
        <div onClick={onExitClick} className="form-btn-exit">
          <GrClose />
        </div>
      </div>
      <div className="form-body">
        <div className="form_img">
          <img
            src={
              avatar
                ? avatar
                : "https://cdn-icons-png.flaticon.com/512/3342/3342137.png"
            }
            alt=""
            className="form-avatar"
            style={{ objectFit: "cover" }}
          />
          <input
            ref={inputAvatarRef}
            type="file"
            onChange={onImageChange}
            style={{ display: "none" }}
          />
          <button
            className="btn-pickImage"
            onClick={() => {
              inputAvatarRef.current.click();
            }}
          >
            Chọn ảnh
          </button>
        </div>
        <div className="form">
          <div className="form-row">
            <span>Tên tài khoản</span>
            <input
              className={errors.account ? "error" : ""}
              onChange={handleChange}
              name="account"
              value={staff.account}
              type="text"
            />
            <p className="form-error">{errors.account}</p>
          </div>
          <div className="form-row">
            <span>Họ tên</span>
            <input
              name="fullname"
              onChange={handleChange}
              value={staff.fullname}
              className={errors.fullname ? "error" : ""}
              type="text"
            />
            <p className="form-error">{errors.fullname}</p>
          </div>
          <div className="form-row">
            <span>Mật khẩu</span>
            <input
              className={errors.password ? "error" : ""}
              onChange={handleChange}
              type="password"
              value={staff.password}
              name="password"
            />
            <p className="form-error">{errors.password}</p>
          </div>
          <div className="form-row">
            <span>Giới tính</span>

            <select
              value={staff.sex}
              className="form-select"
              name="sex"
              onChange={handleChange}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="form-row">
            <span>Email</span>
            <input
              name="email"
              onChange={handleChange}
              value={staff.email}
              type="text"
              className={errors.email ? "error" : ""}
            />
            <p className="form-error">{errors.email}</p>
          </div>
          <div className="form-row">
            <span>Địa chỉ</span>
            <input
              name="address"
              onChange={handleChange}
              value={staff.address}
              className={errors.address ? "error" : ""}
              type="text"
            />
            <p className="form-error">{errors.address}</p>
          </div>
          <div className="form-row">
            <span>Số điện thoại</span>
            <input
              name="telephoneNumber"
              value={staff.telephoneNumber}
              onChange={handleChange}
              className={errors.telephoneNumber ? "error" : ""}
              type="text"
            />
            <p className="form-error">{errors.telephoneNumber}</p>
          </div>
        </div>
      </div>
      <div className="form-btn-row">
        <button onClick={handleSubmit} className="form-btn-save">
          Lưu
        </button>
        <button onClick={onExitClick} className="form-btn-cancel">
          Bỏ qua
        </button>
      </div>
    </div>
  );
};

export default AddStaff;

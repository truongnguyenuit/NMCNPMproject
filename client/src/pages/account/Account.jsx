import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ENDPOINT } from "./../../App";
import "./Account.css";

const Account = ({ rerender, setRerender }) => {
  const userLocal = JSON.parse(localStorage.getItem("user"));
  console.log(userLocal);
  const [user, setUser] = useState(userLocal);
  const [avatar, setAvatar] = useState("");
  const [userUpdate, setUserUpdate] = useState({
    fullname: "",
    phone: "",
    address: "",
    email: "",
  });
  const handleUpdateUser = (e) => {
    setUserUpdate((prev) => {
      const name = e.target.name;
      const value = e.target.value;
      return { ...prev, [name]: value };
    });
  };
  const handleSubmitFormUpdate = (e) => {
    e.preventDefault();
    const formStaff = {
      fullname: userUpdate.fullname,
      address: userUpdate.address,
      email: userUpdate.email,
      telephoneNumber: userUpdate.telephoneNumber,
      img: avatar,
    };

    //post to API
    axios
      .put(`${ENDPOINT}/auth/update/${user._id}`, formStaff)
      .then((res) => {
        toast("Cập nhật thông tin thành công");
        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: res.data._id,
            fullname: res.data.fullname,
          })
        );
        setRerender(!rerender);
      })
      .catch((err) => {
        toast("Cập nhật thông tin thất bại");
      });
  };
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
  const inputAvatarRef = useRef(null);

  return (
    <div className="main">
      <div className="search_name"></div>

      <div className="account_header">
        <h1 className="userTitle" style={{fontWeight: '600'}}>Thông tin người dùng</h1>
        <div className="account_header-control">
          <Link
            to={{
              pathname: "./changePassWord",
              state: { user: user },
            }}
          >
            <div className="action-btn mg-0 ani_fade-in-top">
              <button
                className="btn mg-0"
                style={{ fontSize: "16px", padding: ".5rem 2rem !important" }}
              >
                Đổi mật khẩu
              </button>
            </div>
          </Link>

          <div className="action-btn mg-0 ani_fade-in-top account-logout">
            <button
              className="btn mg-0"
              style={{ fontSize: "16px", padding: ".5rem 2rem !important" }}
              onClick={() => {
              
                localStorage.removeItem('accessToken')
                window.location.reload();
              }}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      <div
        className="main_list"
        style={{ justifyContent: "space-between", padding: "0 40px" }}
      >
        <div className="">
          <div className="userShow">
            <div className="userShowTop">
              <img src={user?.img} alt="" className="userShowImg" />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user?.fullname}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Tài khoản</span>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">{user?.account}</span>
              </div>
              <span className="userShowTitle">Liên hệ</span>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  {user?.telephoneNumber}
                </span>
              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">{user?.email}</span>
              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">{user?.address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="list_right">
          <div className="userUpdate">
            <span className="userUpdateTitle">Cập nhật</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Họ tên</label>
                  <input
                    type="text"
                    name="fullname"
                    value={userUpdate?.fullname}
                    onChange={handleUpdateUser}
                    placeholder={user?.fullname}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Số điện thoại</label>
                  <input
                    name="telephoneNumber"
                    type="telephoneNumber"
                    value={userUpdate?.telephoneNumber}
                    placeholder={user?.telephoneNumber}
                    onChange={(e) => {
                      const re = /^[0-9\b]+$/;

                      // if value is not blank, then test the regex

                      if (e.target.value === "" || re.test(e.target.value)) {
                        setUserUpdate((prev) => {
                          return { ...prev, phone: e.target.value };
                        });
                      }
                    }}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder={user?.email}
                    className="userUpdateInput"
                    value={userUpdate?.email}
                    onChange={handleUpdateUser}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    placeholder={user?.address || ""}
                    name="address"
                    value={userUpdate?.address}
                    className="userUpdateInput"
                    onChange={handleUpdateUser}
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    onClick={() => {
                      inputAvatarRef.current.click();
                    }}
                    className="userUpdateImg"
                    src={avatar ? avatar : user?.img}
                    alt=""
                  />

                  <label htmlFor="file"></label>
                  <input
                    onChange={onImageChange}
                    accept="image/png, image/gif, image/jpeg"
                    ref={inputAvatarRef}
                    type="file"
                    style={{ display: "none" }}
                  />
                </div>
                <div className="action-btn mg-0 ani_fade-in-top">
                  <button
                    onClick={handleSubmitFormUpdate}
                    className="userUpdateButton"
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;

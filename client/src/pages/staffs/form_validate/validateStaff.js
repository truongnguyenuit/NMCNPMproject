import formatDate from "../../../utils/formatDate";
export default function validateStaff(staff) {
  let errors = {};

  if (!staff.account.trim()) {
    errors.account = "Tài khoản là bắt buộc";
  } else if (!/^[A-Za-z]+/.test(staff.account.trim())) {
    errors.account = "Nhập vào tài khoản hợp lệ";
  }

  if (!staff.password) {
    errors.password = "Mật khẩu là bắt buộc";
  } else if (staff.password.length < 6) {
    errors.password = "Mật khẩu ít nhất là 6 kí tự";
  }
  if (!staff.email) {
    errors.email = "Email là bắt buộc";
  } else if (!/\S+@\S+\.\S+/.test(staff.email)) {
    errors.email = "Email không hợp lệ";
  }
  if (!staff.fullname) {
    errors.fullname = "Họ tên là bắt buộc";
  } else if (!/^[A-Za-z]+/.test(staff.fullname.trim())) {
    errors.username = "Nhập vào tên hợp lệ";
  }
  if (!staff.telephoneNumber) {
    errors.telephoneNumber = "Số điện thoại là bắt buộc";
  }
  if (!staff.address) {
    errors.address = "Địa chỉ là bắt buộc";
  }
  return errors;
}

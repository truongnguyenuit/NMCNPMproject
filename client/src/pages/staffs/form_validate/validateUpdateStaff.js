import formatDate from "../../../utils/formatDate";
export default function validateUpdateStaff(staff) {
  let errors = {};

  if (!staff.email) {
    errors.email = "Email là bắt buộc";
  } else if (!/\S+@\S+\.\S+/.test(staff.email)) {
    errors.email = "Email không hợp lệ";
  }
  if (!staff.fullname) {
    errors.fullname = "Họ tên là bắt buộc";
  } else if (!/^[A-Za-z]+/.test(staff.account.trim())) {
    errors.account = "Nhập vào tên hợp lệ";
  }
  if (!staff.telephoneNumber) {
    errors.telephoneNumber = "Số điện thoại là bắt buộc";
  }
  if (!staff.address) {
    errors.address = "Địa chỉ là bắt buộc";
  }
  return errors;
}

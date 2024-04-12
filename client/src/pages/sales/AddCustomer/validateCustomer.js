export default function validateCustomer(customer) {
  let errors = {};

  if (!/\S+@\S+\.\S+/.test(customer.email) && customer.email) {
    errors.email = "Email không hợp lệ";
  }
  if (!customer.name) {
    errors.name = "Họ tên là bắt buộc";
  }
  if (!customer.telephoneNumber) {
    errors.telephoneNumber = "Số điện thoại là bắt buộc";
  }

  return errors;
}

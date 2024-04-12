import axios from "axios";
import React, { useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
import "./AddProduct.css";
import useFormProduct from "./form_validate/useFormProduct";
import validateProduct from "./form_validate/validateProduct";
import { ENDPOINT } from "./../../App";

const AddProduct = ({ setRerenderProducts, setShowFormAddProduct }) => {
  const inputAvatarRef = useRef(null);
  const [productId, setProductId] = useState();
  const [avatar, setAvatar] = useState();
  const [product, setProduct] = useState({
    name: "",
    amount: 0,
    costPrice: 0,
    salePrice: 0,
    originPrice: 0,
    discount: 0,
    img: "",
  });

  const handleIncreaseDiscount = (e) => {
    setProduct((prev) => {
      if (prev.discount <= 99) {
        const discount = Math.floor(prev.discount) + 1;
        return {
          ...prev,
          discount: discount,
          salePrice: prev.costPrice - (discount * prev.costPrice) / 100,
        };
      } else {
        return prev;
      }
    });
  };

  const handleDecreaseDiscount = (e) => {
    setProduct((prev) => {
      if (prev.discount > 0) {
        const discount = Math.floor(prev.discount) - 1;
        return {
          ...prev,
          discount: discount,
          salePrice: prev.costPrice - (discount * prev.costPrice) / 100,
        };
      } else {
        return prev;
      }
    });
  };

  //active function when choose image from pc
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      const addImg = async () => {
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
          const response = await addImg();
          console.log(response);
          setAvatar(response.url);
        } catch (error) {
          // Xử lý lỗi
          console.log(error);
        }
      })();
    }
  };

  //Submit form
  const submitForm = async () => {
    const formProduct = {
      name: product.name,
      amount: product.amount,
      costPrice: product.costPrice,
      discount: product.discount,
      salePrice: product.salePrice,
      originPrice: product.originPrice,
      img: avatar,
    };

    //post to API
    axios
      .post(`${ENDPOINT}/product`, formProduct)
      .then((res) => {
        console.log(res.data);
        setProductId(res.data.id);
        setRerenderProducts(true);
        toast("Thêm mới sản phẩm thành công");
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          toast("Thêm mới sản phẩm thất bại");
          // Request made and server responded
          console.log(error.response.data);
        }
      });
  };
  const { handleChange, handleSubmit, errors } = useFormProduct(
    submitForm,
    product,
    setProduct,
    validateProduct
  );

  const onExitClick = () => {
    setShowFormAddProduct(false);
  };

  return (
    <div className="form-container">
      <div className="form-heading">
        <h3 className="form-heading-title">Thêm mới sản phẩm</h3>
        <div onClick={onExitClick} className="form-btn-exit">
          <GrClose />
        </div>
      </div>
      <div className="form-body">
        <div className="form">
          <div className="form-row">
            <span>Tên sản phẩm</span>
            <input name="name" value={product.name} onChange={handleChange} />
            <p className="form-error">{errors.name}</p>
          </div>
          <div className="form-row">
            <span>Giá bán khi sale (đồng)</span>
            <input
              type="text"
              pattern="[0-9]*"
              name="salePrice"
              className="salePrice"
              value={product.salePrice}
              onChange={handleChange}
            />
            <p className="form-error">{errors.salePrice}</p>
          </div>

          <div className="form-row">
            <span>Giá bán (đồng)</span>
            <input
              type="text"
              pattern="[0-9]*"
              name="costPrice"
              value={product.costPrice}
              onChange={handleChange}
            />
            <p className="form-error">{errors.costPrice}</p>
          </div>
          <div className="form-row">
            <span>Số lượng</span>
            <input
              type="number"
              pattern="[0-9]*"
              name="amount"
              value={product.amount}
              onChange={handleChange}
            />
            <p className="form-error">{errors.amount}</p>
          </div>
          <div className="form-row">
            <span>Giảm giá (%)</span>
            <input
              name="discount"
              type="text"
              pattern="[0-9]*"
              value={product.discount}
              onChange={handleChange}
            />
            <div className="discount_type">
              <i
                onClick={handleIncreaseDiscount}
                class="bx bxs-up-arrow discount_type_item"
              ></i>
              <i
                onClick={handleDecreaseDiscount}
                class="bx bxs-down-arrow discount_type_item"
              ></i>
            </div>
            <p className="form-error">{errors.countInStock}</p>
          </div>
          <div className="form-row">
            <span>Giá nhập hàng</span>
            <input
              pattern="[0-9]*"
              name="originPrice"
              type="text"
              value={product.originPrice}
              onChange={handleChange}
            />
            <p className="form-error">{errors.originPrice}</p>
          </div>
        </div>
      </div>
      <div className="add_product-form-images">
        <div className="add_product-form-image">
          <input
            ref={inputAvatarRef}
            type="file"
            name="img"
            onChange={onImageChange}
            style={{ display: "none" }}
          />
          <p>Hình ảnh sản phẩm</p>
          <img
            onClick={() => {
              inputAvatarRef.current.click();
            }}
            style={{ height: 120, width: 120, cursor: "pointer" }}
            src={
              avatar
                ? avatar
                : "https://cdn-icons-png.flaticon.com/512/3342/3342137.png"
            }
            alt=""
          />
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

export default AddProduct;

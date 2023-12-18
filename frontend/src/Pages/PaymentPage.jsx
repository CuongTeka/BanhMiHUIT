import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/PaymentPage.css";
import { ShopContext } from "../Context/ShopContext";
import { numberFormat } from "../util";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(""); // Chon phuong thuc thanh toan
  const navigate = useNavigate();
  const { resetCart } = useContext(ShopContext);
  const { getTotalCartAmount, products, cartItems } = useContext(ShopContext);

  const handlePayment = () => {
    if (paymentMethod === "cash") {
      
      alert("Thanh toán tiền mặt thành công!");
    } else if (paymentMethod === "online") {
      
      alert("Thanh toán trực tuyến thành công!");
    }
    resetCart();
    navigate("/");
  };

  return (
    <div className="payment-container">
      <div className="paymentcartitems">
        <div className="paymentcartitems-fomart-main">
          <p>Sản Phẩm</p>
          <p>Tiêu Đề</p>
          <p>Giá Tiền</p>
          <p>Số lượng</p>
          <p>Tổng</p>
        </div>
        <hr />
        {products.map(
          (e) =>
            cartItems[e._id] > 0 && (
              <div key={e._id}>
                <div className="paymentcartitems-format paymentcartitems-fomart-main">
                  <img
                    className="carticon-product-icon"
                    src={`http://localhost:8080/api/images?imageName=${encodeURIComponent(
                      e.image
                    )}`}
                    alt=""
                  />
                  <p>{e.name}</p>
                  <p>{numberFormat(e.price)}</p>
                  <p>{cartItems[e._id]}</p>
                  <p>{numberFormat(e.price * cartItems[e._id])}</p>
                </div>
                <hr />
              </div>
            )
        )}
        <div className="paymentcartitems-down">
          <div className="paymentcartitems-downleft">
            <h1>Tổng Tiền Giỏ Hàng</h1>
            <div>
              <div className="paymentcartitems-total-item">
                <p>Tổng số tiền hàng</p>
                <p>{numberFormat(getTotalCartAmount())}</p>
              </div>
              <hr />
              <div className="paymentcartitems-total-item">
                <p>Phí giao hàng</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="paymentcartitems-total-item">
                <h3>Tổng </h3>
                <h3>{numberFormat(getTotalCartAmount())}</h3>
              </div>
            </div>
          </div>
          <div className="paymentcartitems-downright">
            <h1 className="payment-title">Chọn phương thức thanh toán</h1>
            <div className="payment-options">
              <label className="payment-option-label">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />
                Thanh toán tiền mặt
              </label>
              <label className="payment-option-label">
                <input
                  type="radio"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                Thanh toán VnPay
              </label>
              <label className="payment-option-label">
                <input
                  type="radio"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                Thanh toán MoMo
              </label>
            </div>
            <button className="payment-button" onClick={handlePayment}>
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

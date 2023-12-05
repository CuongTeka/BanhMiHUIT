import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/PaymentPage.css"; 
import { ShopContext } from "../Context/ShopContext";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(""); // Chon phuong thuc thanh toan
  const navigate = useNavigate();
  const { resetCart } = useContext(ShopContext);

  const handlePayment = () => {
    if (paymentMethod === "cash") {
      // Implement cash payment logic here
      alert("Thanh toán tiền mặt thành công!");
    } else if (paymentMethod === "online") {
      // Implement online payment logic here
      alert("Thanh toán trực tuyến thành công!");
    }
    resetCart();
    navigate("/");
  };

  return (
    <div className="payment-container">
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
          Thanh toán trực tuyến
        </label>
      </div>
      <button className="payment-button" onClick={handlePayment}>
        Xác nhận thanh toán
      </button>
    </div>
  );
};

export default PaymentPage;

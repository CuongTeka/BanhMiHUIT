import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/PaymentPage.css";
import { ShopContext } from "../Context/ShopContext";
import { numberFormat } from "../util";
import QRCodePopup from "../Components/QRCodePopup/QRCodePopup";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(""); // Chon phuong thuc thanh toan
  const [paymentConfirmed, setPaymentConfirmed] = useState(false); //theo dõi trạng thái đã xác nhận thanh toán
  const { resetCart } = useContext(ShopContext);
  const { getTotalCartAmount, products, cartItems } = useContext(ShopContext);
  const [showQRCodePopup, setShowQRCodePopup] = useState(false); // hiển thị pop up

  const handlePayment = () => {
    if (paymentMethod === "cash") {
      alert("Thanh toán tiền mặt thành công!");
      navigate("/category");
      resetCart();
    } else if (paymentMethod === "ZaloPay" || paymentMethod === "MoMo") {
      setShowQRCodePopup(true);
    }
    
    setPaymentConfirmed(true); // Đã xác nhận thanh toán
  };

  const handleCancel = () => {
    setShowQRCodePopup(false);
    setPaymentConfirmed(false);
  };

  return (
    <div className="payment-container">
      <div className="paymentcartitems">
        <div className="paymentcartitems-fomart-main">
          <p>Sản Phẩm</p>
          <p>Giá Tiền</p>
          <p>Số lượng</p>
          <p>Địa điểm nhận hàng</p>
          <p>Thời gian nhận hàng</p>
          <p>Tổng</p>
        </div>
        <hr />
        {products.map(
          (e) =>
            cartItems[e._id] > 0 && (
              <div key={e._id}>
                <div className="paymentcartitems-format paymentcartitems-fomart-main">
                  <p>{e.name}</p>
                  <p>{numberFormat(e.price)}</p>
                  <p>{cartItems[e._id]}</p>
                  <p>Căn tin trường</p>
                  <p>mẹ chán vl</p>
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
                  disabled={paymentConfirmed}
                />
                Thanh toán tiền mặt
              </label>
              <label className="payment-option-label">
                <input
                  type="radio"
                  value="ZaloPay"
                  checked={paymentMethod === "ZaloPay"}
                  onChange={() => setPaymentMethod("ZaloPay")}
                  disabled={paymentConfirmed}
                />
                Thanh toán ZaloPay
              </label>
              <label className="payment-option-label">
                <input
                  type="radio"
                  value="MoMo"
                  checked={paymentMethod === "MoMo"}
                  onChange={() => setPaymentMethod("MoMo")}
                  disabled={paymentConfirmed}
                />
                Thanh toán MoMo
              </label>
              {showQRCodePopup && (
                <QRCodePopup
                  paymentMethod={paymentMethod}
                  onClose={() => setShowQRCodePopup(false)}
                  onCancel={handleCancel}
                />
              )}
              <button className="payment-button" onClick={handlePayment}>
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

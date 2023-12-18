import React, { useContext } from "react";
import zlpqr from "../Assets/zalopayqrcode.png";
import momoqr from "../Assets/momoqrcode.png";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const QRCodePopup = ({ paymentMethod, onClose, onCancel }) => {
  const navigate = useNavigate();
  const { resetCart } = useContext(ShopContext);
  const handleClose = () => {
    onClose();
    navigate("/category"); // Chuyển hướng sau khi đóng popup
    resetCart(); //reset gio hang khi thanh toan xong
  };
  return (
    <div className="qrcode-popup">
      <div className="qrcode-image">
        <img
          src={
            paymentMethod === "ZaloPay"
              ? zlpqr
              : paymentMethod === "MoMo"
              ? momoqr
              : null
          }
          alt={paymentMethod === "ZaloPay" ? "ZaloPay QR Code" : "MoMo QR Code"}
        />
      </div>
      <div className="qrcode-btn">
        <button onClick={handleClose}>Đóng</button>
        <button onClick={onCancel}>Huỷ thanh toán</button>
      </div>
    </div>
  );
};

export default QRCodePopup;

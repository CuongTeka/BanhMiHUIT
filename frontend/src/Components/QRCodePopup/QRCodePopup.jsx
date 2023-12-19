import React, { useContext, useState } from "react";
import zlpqr from "../Assets/zalopayqrcode.png";
import momoqr from "../Assets/momoqrcode.png";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import Cookies from "js-cookie";
import { handleCreateOrder } from "../../services/orderService";
import { Modal } from "antd";

const QRCodePopup = ({ paymentMethod, onClose, onCancel }) => {
  const navigate = useNavigate();
  const { resetCart, getTotalCartAmount, cartItems } = useContext(ShopContext);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [shipping, setShipping] = useState("");
  const [note, setNote] = useState("");
  const [showQRCodePopup, setShowQRCodePopup] = useState(false);

  const formatCartItemsForApi = (
    cartItems,
    total,
    paymentMethod,
    shipping,
    note
  ) => {
    if (Cookies.get("id") !== undefined) {
      const formattedItems = Object.keys(cartItems)
        .filter((itemId) => cartItems[itemId] > 0)
        .map((itemId) => {
          return {
            pro_id: itemId,
            quantity: cartItems[itemId],
          };
        });

      return {
        customer: Cookies.get("id"),
        item: formattedItems,
        total: total,
        payment: paymentMethod,
        shipping: shipping,
        note: note,
      };
    }
  };

  const handleClose = async () => {
    try {
      const formattedData = formatCartItemsForApi(
        cartItems,
        getTotalCartAmount(),
        paymentMethod,
        shipping,
        note
      );
      console.log(formattedData);
      const create = await handleCreateOrder(formattedData);
      console.log(create.message);
      if (
        paymentMethod === "cash" ||
        paymentMethod === "ZaloPay" ||
        paymentMethod === "MoMo"
      ) {
        setShowQRCodePopup(true);
        if (create.errCode === 0) {
          setModalSuccess(true);
        }
        resetCart();
        setTimeout(() => {
          navigate("/orderhistory");
        }, 2000);
      } else {
        setModalError(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        console.log("Lỗi: ", create.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          console.log("Lỗi: " + error.response.data.message);
        }
      }
    }

    onClose();
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
        <button onClick={handleClose}>Xác nhận</button>
        <button onClick={onCancel}>Huỷ thanh toán</button>
      </div>

      {/* thông báo đặt hàng thành công */}
      <Modal open={modalSuccess} footer={null}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{ color: "green", fontSize: "48px", marginBottom: "20px" }}
          >
            <i className="fa-regular fa-circle-check fa-2x"></i>
          </div>
          <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
            ĐẶT HÀNG THÀNH CÔNG
          </h1>
          <p style={{ fontSize: "16px" }}>
            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn ngay lập
            tức.
          </p>
        </div>
      </Modal>
      {/* thông báo đặt hàng không thành công */}
      <Modal open={modalError} footer={null}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "red", fontSize: "48px", marginBottom: "20px" }}>
            <i className="fa-regular fa-circle-xmark fa-2x"></i>
          </div>
          <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
            ĐẶT HÀNG THẤT BẠI
          </h1>
          <p style={{ fontSize: "16px" }}>
            Có vẻ như đã xảy ra trục trặc, xin hãy thử lại sau ít phút
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default QRCodePopup;

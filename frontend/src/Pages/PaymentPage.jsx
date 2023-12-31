import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/PaymentPage.css";
import { ShopContext } from "../Context/ShopContext";
import { numberFormat, renderImage } from "../util";
import QRCodePopup from "../Components/QRCodePopup/QRCodePopup";
import Cookies from "js-cookie";
import { handleCreateOrder } from "../services/orderService";
import { Modal } from "antd";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(""); // Chon phuong thuc thanh toan
  const [showQRCodePopup, setShowQRCodePopup] = useState(false);
  const navigate = useNavigate();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false); //theo dõi trạng thái đã xác nhận thanh toán
  const { resetCart } = useContext(ShopContext);
  const {
    getTotalCartAmount,
    products,
    cartItems,
    deliveryTime,
    deliveryLocation,
    notes,
  } = useContext(ShopContext);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);

  // xu ly phan loai thanh toan
  const handlePayment = () => {
    if (paymentMethod === "cash") {
      handleCreateNewOrder();
    } else if (paymentMethod === "ZaloPay" || paymentMethod === "MoMo") {
      setShowQRCodePopup(true);
    }

    setPaymentConfirmed(true); // Đã xác nhận thanh toán
  };

  // Tat cua so thanh toan
  const handleCancel = () => {
    setShowQRCodePopup(false);
    setPaymentConfirmed(false);
  };

  const formatCartItemsForApi = (
    cartItems,
    total,
    paymentMethod,
    deliveryTime,
    deliveryLocation,
    notes
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
        deliTime: deliveryTime,
        deliLocation: deliveryLocation,
        note: notes,
      };
    }
  };

  const handleCreateNewOrder = async () => {
    try {
      const formattedData = formatCartItemsForApi(
        cartItems,
        getTotalCartAmount(),
        paymentMethod,
        deliveryTime,
        deliveryLocation,
        notes
      );
      console.log(formattedData);
      const create = await handleCreateOrder(formattedData);
      console.log(create.message);
      if (create.errCode === 0) {
        setModalSuccess(true);
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
  };

  return (
    <div className="payment-container">
      <div className="paymentcartitems">
        <div className="paymentcartitems-fomart-main">
          <p>Sản Phẩm</p>
          <p>Hình ảnh</p>
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
                  <p>{e.name}</p>
                  <img
                    className="carticon-product-icon"
                    src={renderImage(e.image)}
                    alt={e.image}
                  />
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
                  value="Tiền mặt"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
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

export default PaymentPage;

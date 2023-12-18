import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/PaymentPage.css";
import { ShopContext } from "../Context/ShopContext";
import { numberFormat } from "../util";
import Cookies from "js-cookie";
import { handleCreateOrder } from "../services/orderService";
import { Modal } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(""); // Chon phuong thuc thanh toan
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [shipping, setShipping] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const { resetCart } = useContext(ShopContext);
  const { getTotalCartAmount, products, cartItems } = useContext(ShopContext);
  // const handlePayment = () => {
  //   if (paymentMethod === "cash") {
  //     alert("Thanh toán tiền mặt thành công!");
  //   } else if (paymentMethod === "online") {
  //     alert("Thanh toán trực tuyến thành công!");
  //   }
  //   resetCart();
  //   navigate("/");
  // };
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

  const handlePayment = async () => {
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
      if (create.errCode === 0) {
        setModalSuccess(true);
        setTimeout(() => {
          navigate("/order");
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
          // message.error("Lỗi: " + error.response.data.message);
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
                  value="Tiền mặt"
                  checked={paymentMethod === "Tiền mặt"}
                  onChange={() => setPaymentMethod("Tiền mặt")}
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

import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./CartItems.css";
import remove_icon from "../Assets/cart_cross_icon.png";
import { numberFormat, renderImage } from "../../util";
import { useAuth } from "../../Context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";

const CartItems = () => {
  const { getTotalCartAmount, products, cartItems, removeToCart, addToCart } =
    useContext(ShopContext);

  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  const handlePaymentClick = () => {
    if (isCartEmpty()) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng thêm sản phẩm vào giỏ hàng",
      });

      return;
    }

    if (isLoggedIn) {
      // User da dang nhap, chuyen huong ve trang thanh toan
      navigate("/payment");
    } else {
      // User chua dang nhap, chuyen huong ve trang login
      login(() => navigate("/payment"));
    }
  };

  const isCartEmpty = () =>
    Object.values(cartItems).every((quantity) => quantity === 0);
  // kiem tra gio hang
  return (
    <div className="cartitems-container">
      <div className="cartitems">
        <div className="cartitems-fomart-main">
          <p>Sản Phẩm</p>
          <p>Tiêu Đề</p>
          <p>Giá Tiền</p>
          <p>Số lượng</p>
          <p>Tổng</p>
          <p>Xoá</p>
        </div>
        <hr />
        {products.map(
          (e) =>
            cartItems[e._id] > 0 && (
              <div key={e._id}>
                <div className="cartitems-format cartitems-fomart-main">
                  <img
                    className="carticon-product-icon"
                    src={renderImage(e.image)}
                    alt={e.image}
                  />
                  <p>{e.name}</p>
                  <p>{numberFormat(e.price)}</p>
                  <button onClick={() => addToCart(e._id)}>
                    {cartItems[e._id]}
                  </button>
                  <p>{numberFormat(e.price * cartItems[e._id])}</p>
                  <img
                    onClick={() => removeToCart(e._id)}
                    className="cartitems-remove-icon"
                    src={remove_icon}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            )
        )}
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Tổng Tiền Giỏ Hàng</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Tổng số tiền hàng</p>
                <p>{numberFormat(getTotalCartAmount())}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Phí giao hàng</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Tổng </h3>
                <h3>{numberFormat(getTotalCartAmount())}</h3>
              </div>
            </div>

            {isLoggedIn ? (
              <button onClick={handlePaymentClick}>TIẾN HÀNH THANH TOÁN</button>
            ) : (
              <Link style={{ textDecoration: "none" }} to="/signin">
                <button>ĐĂNG NHẬP ĐỂ THANH TOÁN</button>
              </Link>
            )}
          </div>
          <div className="cartitems-promocode">
            <p>Nếu bạn có mã giảm giá, Điền tại đây !</p>
            <div className="cartitems-promobox">
              <input type=" " placeholder="Nhập mã giảm giá" />
              <button>Gửi Mã</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;

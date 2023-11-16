import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./CartItems.css";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  return (
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
      {all_product.map(
        (e) =>
          cartItems[e.id] > 0 && (
            <div key={e.id}>
              <div className="cartitems-format cartitems-fomart-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>{e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>{e.new_price * cartItems[e.id]}</p>
                <img onClick={() => removeFromCart(e.id)} className="cartitems-remove-icon" src={remove_icon} alt=""/>
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
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cartitems-total-item">
                <p>Phí giao hàng</p>
                <p>Free</p>
            </div>
            <hr/>
            <div className="cartitems-total-item">
                <h3>Tổng </h3>
                <h3>{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>TIẾN HÀNH THANH TOÁN</button>
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
  );
};

export default CartItems;

import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./ProductDisplay.css";

const ProductDisplay = (props) => {
  const { product } = props;
  const {addToCart} =useContext(ShopContext);
  // console.log('new' + product)
  // console.log(product._id)

  const numberFormat = (value) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-newprice">
            {numberFormat(product.price)}
          </div>
        </div>
        <button onClick={()=>addToCart(product._id)}>THÊM VÀO GIỎ HÀNG</button>
        <div className="productdisplay-right-description">
          <p>
            {product.detail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;

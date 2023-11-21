import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./ProductDisplay.css";

const ProductDisplay = (props) => {
  const { product } = props;
  const {addToCart} =useContext(ShopContext);

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
            {product.new_price}
          </div>
        </div>
        <button onClick={()=>addToCart(product.id)}>THÊM VÀO GIỎ HÀNG</button>
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

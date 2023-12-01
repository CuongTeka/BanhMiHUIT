import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./ProductDisplay.css";
import {numberFormat} from '../../util'

const ProductDisplay = (props) => {
  const { product } = props;
  const {addToCart} =useContext(ShopContext);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setImageData(`http://localhost:8080/api/images?imageName=${encodeURIComponent(product.image)}`)
      } catch (error) {
        console.error('Error fetching image:', error.message);
      }
    };
    fetchImage();
  }, [product.image]);

// console.log('image data: '+ imageData)
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img">
            <img className="productdisplay-main-img" src={imageData} alt={product.image} />
          {/* <img className="productdisplay-main-img" src={imageData} alt="" /> */}
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

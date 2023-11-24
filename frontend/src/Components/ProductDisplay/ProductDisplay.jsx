import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./ProductDisplay.css";

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

  const numberFormat = (value) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);
console.log('image data: '+ imageData)
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img">
            <img className="productdisplay-main-img" src={imageData} alt="" />
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
            {/* Thức Uống Trái Cây SJORA VỊ XOÀI ĐÀO được làm từ 100% trái cây tươi
            và được bán theo dạng thức uống chiết từ máy rót để đảm bảo trải
            nghiệm hương vị tuyệt vời nhất. Thức uống này là 1 sản phẩm của Công
            ty Nestlé Vietnam. */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;

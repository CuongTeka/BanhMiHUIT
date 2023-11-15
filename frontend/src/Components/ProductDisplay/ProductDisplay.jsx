import React from "react";
import "./ProductDisplay.css";

const ProductDisplay = (props) => {
  const { product } = props;

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
        <button>THÊM VÀO GIỎ HÀNG</button>
        <div className="productdisplay-right-description">
          <p>
            Thức Uống Trái Cây SJORA VỊ XOÀI ĐÀO được làm từ 100% trái cây tươi
            và được bán theo dạng thức uống chiết từ máy rót để đảm bảo trải
            nghiệm hương vị tuyệt vời nhất. Thức uống này là 1 sản phẩm của Công
            ty Nestlé Vietnam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;

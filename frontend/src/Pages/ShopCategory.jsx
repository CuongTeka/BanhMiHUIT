import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 12 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      
      <div className="shopcategory-products">
        {all_product.map((item, i) => 
          props.category === null||props.category === item.category ? (
             <Item key={i} id={item.id} name={item.name} image={item.image} price={item.new_price}/>
          ) :null
          
        )}
      </div>
      <div className="shopcategory-loadmore"><p>Xem Thêm</p></div>
    </div>
  );
};

export default ShopCategory;

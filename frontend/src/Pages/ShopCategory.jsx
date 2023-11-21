import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { all_product, loading, error } = useContext(ShopContext);

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or a more sophisticated loading component
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>; // Display a meaningful error message
  }

  //format tiền thành vnđ
  const numberFormat = (value) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);

  console.log('props.category: ' + props.category)
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {all_product.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      
      <div className="shopcategory-products">
        {all_product.map((item, i) => 
          props.category === null || props.category === item.category_id ? (
            <Item key={i} id={item._id} name={item.name} image={item.image} price={numberFormat(item.price)}/>
          ) : null
        )}
      </div>
      <div className="shopcategory-loadmore"><p>Xem Thêm</p></div>
    </div>
  );
};

export default ShopCategory;

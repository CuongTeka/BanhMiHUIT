import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import Searchbar from "../Components/Searchbar/Searchbar";
import { numberFormat } from "../util";
import { useDispatch } from "react-redux";
import { searchProduct } from "../Redux/slides/productSlide";

const ShopCategory = (props) => {


  const [, setSearch] = useState("");
  const { products } = useContext(ShopContext);
  const dispatch = useDispatch();

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {products.length} products
        </p>
        <div className="searchbar-mid">
          <Searchbar
            size="large"
            bordered={true}
            textbutton="Tìm kiếm"
            placeholder="bánh mì, đồ uống, món ăn thêm,..."
            onChange={onSearch}
            width="500"
          />
        </div>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products">
        {products.map((item, i) =>
          props.category === null || props.category === item.category_id ? (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              image={item.image}
              price={numberFormat(item.price)}
            />
          ) : null
        )}
      </div>

      <div className="shopcategory-loadmore">
        <p>Xem Thêm</p>
      </div>
    </div>
  );
};

export default ShopCategory;

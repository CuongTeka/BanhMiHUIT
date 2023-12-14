import React from "react";
import "./Popular.css";
// import data_product from '../Assets/data'
// import Item from '../Item/Item'

const Popular = (props) => {
  return (
    <div className="popular">
      <h1>SẢN PHẨM BÁN CHẠY</h1>
      <hr />
      <div className="popular-item">
        {/* {data_product.map((item,i)=>
                props.Popular===item.Popular ? (
                <Item key={i} id={item.id} name={item.name} image={item.image} price={item.new_price} />
                ) : null
            )} */}
      </div>
    </div>
  );
};

export default Popular;

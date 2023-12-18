import React, { useContext } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const Popular = (props) => {
  const { products } = useContext(ShopContext);

  return (
    <div className="popular">
      <h1>THỰC ĐƠN PHONG PHÚ</h1>
      <hr />
      <div className="popular-item">
        {products.map((item, i) =>
          props.Popular === item.Popular ? (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.new_price}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default Popular;

import React, { useContext, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";
import { numberFormat } from "../../util";

const Popular = (props) => {
  const { products } = useContext(ShopContext);
  const [visibleProducts] = useState(4);

  return (
    <div className="popular">
      <div className="popular-container">
        <h1>SẢN PHẨM PHONG PHÚ</h1>
        <hr />
        <div className="popular-item">
          <div className="popular-itemcover">
            {products
              .slice(0, visibleProducts)
              .map((item, i) =>
                props.Popular === item.Popular ? (
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
        </div>
      </div>
    </div>
  );
};

export default Popular;

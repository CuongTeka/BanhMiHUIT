import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { renderImage, numberFormat } from "../../util";

const Item = (props) => {
  // console.log(process.env.BEURL);
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img
          onClick={window.scrollTo(0, 0)}
          src={renderImage(props.image)}
          alt={props.image}
        />
      </Link>
      <p>{props.name}</p>
      <div className="item-new-price">{numberFormat(props.price)}</div>
      {props.category}
    </div>
  );
};

export default Item;

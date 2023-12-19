import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/ShopCategory.css";
import Item from "../Components/Item/Item";
import Searchbar from "../Components/Searchbar/Searchbar";
import { numberFormat } from "../util";

const ShopCategory = (props) => {
  const { products } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("default"); // State cho sắp xếp
  const [visibleProducts, setVisibleProducts] = useState(6); // Số lượng sản phẩm hiển thị ban đầu
  const { category } = useParams();

  useEffect(() => {
    let filtered = products;

    // Lọc sản phẩm dựa trên category và thanh tìm kiếm

    if (searchText) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Sắp xếp sản phẩm dựa trên trạng thái của sortBy
    if (sortBy === "name-asc") {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "name-desc") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price-asc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "price-desc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(filtered);
  }, [category, products, searchText, sortBy]);

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6);
  };

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <div className="shopcategory-log">
          <p>
            <span>Showing 1-12</span> out of {filteredProducts.length} products
          </p>
        </div>
        <div className="searchbar">
          <Searchbar
            size="large"
            bordered={true}
            textbutton="Tìm kiếm"
            placeholder="bánh mì, đồ uống, món ăn thêm,..."
            width="200"
            onSearch={(value) => setSearchText(value)}
          />
        </div>
        <div className="shopcategory-sort">
          Sort by
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="default">Mặc định</option>
            <option value="name-asc">Tên(A-Z)</option>
            <option value="name-desc">Tên(Z-A)</option>
            <option value="price-asc">Giá (thấp đến cao)</option>
            <option value="price-desc">Giá (cao đến thấp)</option>
          </select>
        </div>
      </div>

      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <Item
            key={i}
            id={item._id}
            name={item.name}
            image={item.image}
            price={numberFormat(item.price)}
          />
        ))}
      </div>

      {visibleProducts < filteredProducts.length && (
        <div className="shopcategory-loadmore" onClick={handleLoadMore}>
          <p>Xem Thêm</p>
        </div>
      )}
    </div>
  );
};

export default ShopCategory;

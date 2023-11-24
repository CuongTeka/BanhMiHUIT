import React, { useContext,  } from "react";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import Searchbar from '../Components/Searchbar/Searchbar';
// import { useDispatch } from 'react-redux';

const ShopCategory = (props) => {

  // const [search,setSearch] = useState('')
  const { all_product, loading, error } = useContext(ShopContext);
  // const dispatch = useDispatch()
  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>; 
  }

  //format tiền thành vnđ
  const numberFormat = (value) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value);

  console.log('props.category: ' + props.category)

  // const onSearch = (e) => {
  //   setSearch(e.target.value)
  //   dispatch(searchProduct(e.target.value))
  // }
  // Cái này dùng tìm sản phẩm nè mà chưa cài đặt nên tạm để như vầy

  return (
    
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {all_product.length} products
        </p>
        <div className="searchbar-mid">
        <Searchbar size="large"
              bordered={true}
              textbutton="Tìm kiếm"
              placeholder="bánh mì, đồ uống, món ăn thêm,..."
              // onChange={onSearch}
              //backgroundColorButton="#5a20c1"
              width='500'
              />
        </div>
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

import React, {useContext, useState } from "react";    
import './Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import Logobm from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from "../../Context/ShopContext";
import { useAuth } from '../../authContext';
import Cookies from "js-cookie";


const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [menu,SetMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  const isAdmin = Cookies.get("isAdmin") === "true";
  const handleLogout = async() => {
    logout()
    navigate('/')
  }
  
  return (
    <div className='navbar'> 
      <div className='nav-logo'>
        <img src={Logobm} alt=""/>
        <p >BÁNH MÌ HUIT</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={()=> {SetMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>TRANG CHỦ</Link>{menu==="shop"?<hr/>:<></>}</li>
        <div className="dropdown">
        <button className="dropbtn" onClick={()=> {SetMenu("category")}}>
        <Link style={{textDecoration:'none'}} to ='/category' >SẢN PHẨM</Link>{menu==="category"?<hr/>:<></>}
        </button> 
          <div className="dropdown-content">
          <ul className="sub-menu">
            <li onClick={()=> {SetMenu("banhmi")}}><Link style={{textDecoration:'none' }} to='/banhmi' className="a">Bánh mì</Link>{menu==="banhmi"?<hr/>:<></>}</li>
            <li onClick={()=> {SetMenu("nuocuong")}}><Link style={{textDecoration:'none' }} to='/nuocuong' className="a">Nước uống</Link>{menu==="nuocuong"?<hr/>:<></>}</li>
            <li onClick={()=> {SetMenu("monanthem")}}><Link style={{textDecoration:'none' }} to='/monanthem' className="a">Món ăn thêm</Link>{menu==="monanthem"}</li>
          </ul>
          </div>
       
        </div>
        <li onClick={()=> {SetMenu("aboutus")}}><Link style={{textDecoration:'none'}} to='/aboutus'>VỀ CHÚNG TÔI</Link>{menu==="aboutus"?<hr/>:<></>}</li>
      </ul>
      <div className='nav-login-cart'>
  {isLoggedIn ? (
    isAdmin ? (
      <>
        <Link style={{ textDecoration: 'none' }} to='/system/admin'>
          <p>Xin chào: {Cookies.get('name')}</p>
        </Link>
        <Link style={{ textDecoration: 'none' }} to='/'>
          <button onClick={() => { handleLogout() }}>Đăng xuất</button>
        </Link>
      </>
    ) : (
      <>
        <Link style={{ textDecoration: 'none' }} to='/'>
          <p>Xin chào: {Cookies.get('name')}</p>
        </Link>
        <Link style={{ textDecoration: 'none' }} to='/'>
          <button onClick={() => { handleLogout() }}>Đăng xuất</button>
        </Link>
      </>
    )
  ) : (
    <Link style={{ textDecoration: 'none' }} to='/signin'>
      <button>Đăng Nhập</button>
    </Link>
  )}

  <Link to='/cart'>
    <img src={cart_icon} alt="" />
  </Link>

  <div className='nav-cart-count'>{getTotalCartItems()}</div>
</div>
    </div>
  )
}

export default Navbar
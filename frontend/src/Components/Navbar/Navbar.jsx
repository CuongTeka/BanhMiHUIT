import React, {useState} from "react";    
import './Navbar.css'
import { Link } from "react-router-dom";
import Logobm from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'


const Navbar = () => {
  
  const [menu,SetMenu] = useState("shop");
  return (
    <div className='navbar'> 
      <div className='nav-logo'>
        <img src={Logobm} alt=""/>
        <p >BÁNH MÌ HUIT</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={()=> {SetMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Trang Chủ</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=> {SetMenu("product")}}><Link style={{textDecoration:'none'}} to ='/product'>Sản Phẩm</Link>{menu==="product"?<hr/>:<></>}</li>
        <li onClick={()=> {SetMenu("new")}}><Link style={{textDecoration:'none'}} to ='/new'>Danh Mục</Link>{menu==="new"?<hr/>:<></>}</li>
        <li onClick={()=> {SetMenu("feedback")}}><Link style={{textDecoration:'none'}} to ='/feedback'>Phản Hồi</Link>{menu==="feedback"?<hr/>:<></>}</li>
      </ul>
      <div className='nav-login-cart'>
        <Link to = '/signin'><button>Đăng Nhập</button></Link>
        <Link to = '/cart'><img src={cart_icon} alt=""/></Link>
      <div className='nav-cart-count'>0</div>
      </div>
    </div>
  )
}

export default Navbar
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
        <li onClick={()=> {SetMenu("shop")}}><Link style={{textDecoration:'none'  }} to='/'>TRANG CHỦ</Link>{menu==="shop"?<hr/>:<></>}</li>
        {/* <li onClick={()=> {SetMenu("product")}}><Link style={{textDecoration:'none' }} to ='/product'>SẢN PHẨM</Link>{menu==="product"?<hr/>:<></>}</li>  */}
        <div className="dropdown">
        <button className="dropbtn" onClick={()=> {SetMenu("category")}}>

        <Link style={{textDecoration:'none' }} to ='/category' >SẢN PHẨM</Link>{menu==="category"?<hr/>:<></>}
        </button> 
          <div className="dropdown-content">
          <ul className="sub-menu">
            <li onClick={()=> {SetMenu("banhmi")}}><Link style={{textDecoration:'none' }} to='/banhmi' className="a">Bánh mì</Link>{menu==="banhmi"?<hr/>:<></>}</li>
            <li onClick={()=> {SetMenu("nuocuong")}}><Link style={{textDecoration:'none' }} to='/nuocuong' className="a">Nước uống</Link>{menu==="nuocuong"?<hr/>:<></>}</li>
            <li onClick={()=> {SetMenu("monanthem")}}><Link style={{textDecoration:'none' }} to='/monanthem' className="a">Món ăn thêm</Link>{menu==="monanthem"}</li>
          </ul>
          </div>
       
        </div>
        {/* <li onClick={()=> {SetMenu("feedback")}}><Link style={{textDecoration:'none' }} to ='/feedback'>PHẢN HỒI</Link>{menu==="feedback"?<hr/>:<></>}</li>  */}
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
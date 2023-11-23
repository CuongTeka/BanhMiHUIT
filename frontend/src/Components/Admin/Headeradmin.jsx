import React, { useEffect } from 'react'
import './Headeradmin.css'
import { Link, useNavigate } from "react-router-dom";
import Logobm from "../Assets/logo.png";
import { useAuth } from "../../authContext";
import Cookies from "js-cookie";

const Headeradmin = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, isAdmin } = useAuth();


  const handleLogout = async() => {
    logout()
    window.location.href = '/';
  }

  return (
    <div className="headeradmin">
      <div className="head-logo">
        <img src={Logobm} alt="" />
        <p>BÁNH MÌ HUIT</p>
      </div>
      <div className="head-login-cart">
        <p><Link style={{textDecoration:'none'}} to='/'>TRANG CHỦ</Link></p>
        <p><Link style={{textDecoration:'none'}} to='/system/admin'>ADMIN INDEX</Link></p>
        {isLoggedIn ? (      
        <>    
          <p>Xin chào: {Cookies.get("name")}</p>
          <Link style={{ textDecoration: "none" }} to="/">
            <button onClick={() => { handleLogout();}}> Đăng xuất </button>
          </Link>
        </>
    
        ) : (
          <Link style={{ textDecoration: "none" }} to="/signin">
            <button>Đăng Nhập</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Headeradmin;

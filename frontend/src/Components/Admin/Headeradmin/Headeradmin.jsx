import React, {} from 'react'
import './Headeradmin.css'
import { Link, } from "react-router-dom";
import Logobm from "../../Assets/logo.png";
import { useAuth } from "../../../authContext";
import Cookies from "js-cookie";
import {UserOutlined} from '@ant-design/icons';

const Headeradmin = () => {

  const { isLoggedIn, logout,  } = useAuth();

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
      
        {isLoggedIn ? (      
        <>    
          <Link style={{ textDecoration: "none" }} to="/system/admin"><p><UserOutlined style={{ fontSize: '26px', color: '#515151', marginRight:'10px' }} />Xin chào: {Cookies.get("name")}</p></Link>
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

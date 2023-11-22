import React from "react";
import "./Headeradmin.css";
import { Link, useNavigate } from "react-router-dom";
import Logobm from "../Assets/logo.png";
import { useAuth } from "../../authContext";
import Cookies from "js-cookie";

const Headeradmin = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout} = useAuth();

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  return (
    <div className="headeradmin">
      <div className="head-logo">
        <img src={Logobm} alt="" />
        <p>BÁNH MÌ HUIT</p>
      </div>
      <div className="head-login-cart">
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

import React from "react";
import "./CSS/SignIn.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="signin">
      <div className="signin-container">
        <h1>Đăng Nhập</h1>
        <div className="signin-fields">
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="Mật khẩu"></input>
        </div>
        <button>Tiếp Tục</button>
        <p className="signin-login">
          Chưa có tài khoản ?{" "}
          <Link to="/login">
            <span>Đăng Ký</span>
          </Link>
        </p>
        <div className="signin-agree">
          <input type="checkbox" name="" id=""></input>
          <p>
            Bằng cách tiếp tục, tôi đồng ý với mọi điều khoản & chính sách bảo
            mật.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

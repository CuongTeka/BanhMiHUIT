import React from "react";
import "./CSS/SignIn.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="signin">
      <div className="signin-container">
        <h1>Đăng Nhập</h1>
        <form className="signin-fields" action="../../validate_login" method="post">
          <input type="email" placeholder="Email" name="email"></input>
          <input type="password" placeholder="Mật khẩu" name="pass"></input>
          <button type="submit">Tiếp Tục</button>
        </form>
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

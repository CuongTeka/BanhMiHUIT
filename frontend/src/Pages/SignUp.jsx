import React from "react";
import "./CSS/Loginsignup.css";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Đăng Ký</h1>
        <form className="loginsignup-fields" action="/signup" method="post">
          <input type="email" placeholder="Email" name="email"></input>
          <input type="password" placeholder="Mật khẩu" name="pass"></input>
          <input type="name" placeholder="Họ Tên" name="name"></input>
          <input type="mssv" placeholder="Mã số sinh viên" name="mssv"></input>
          <input type="phone" placeholder="Số điện thoại" name="phone"></input>
          <button type="submit">Tiếp Tục</button>
        </form>
        <p className="loginsignup-login">
          Đã có tài khoản ?{" "}
          <Link to="/signin">
            <span>Đăng Nhập</span>
          </Link>
        </p>
        <div className="loginsignup-agree">
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

export default SignUp;




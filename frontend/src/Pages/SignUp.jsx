import React from "react";
import "./CSS/Loginsignup.css";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Đăng Ký</h1>
        <div className="loginsignup-fields">
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="Mật khẩu"></input>
          <input type="name" placeholder="Họ Tên"></input>
          <input type="mssv" placeholder="Mã số sinh viên"></input>
          <input type="phone" placeholder="Số điện thoại"></input>
        </div>
        <button>Tiếp Tục</button>
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




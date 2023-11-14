import React from "react";
import "./Footer.css";
import Logobm from "../Assets/logo.png";
import fb_icon from "../Assets/fb.png";
import mail_icon from "../Assets/mail.png";
import phone_icon from "../Assets/phone.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={Logobm} alt="" />
        </div>
        <div className="footer-contact">
          <p className="desc">
            Cửa hàng bánh mì độc quyền Trường ĐH Công Thương
          </p>
          <p className="icon-contact">
            <img src={phone_icon} alt="" />
            <a href="?">0346009095</a>
          </p>
          <p className="icon-contact">
            <img src={mail_icon} alt="" />
            <a href="mailto:tenho6857@gmail.com">tenho6857@gmail.com</a>
          </p>
          <p className="icon-contact">
            <img src={fb_icon} alt="" />
            <a href="https://www.facebook.com/thai.phong.4754">https://www.facebook.com/thai.phong.4754</a>
          </p>
        </div>
        <div className="footer-copyright">
          <hr />
          <p>Copyright @ 2023 - All Right Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
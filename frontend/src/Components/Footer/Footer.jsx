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
          <p className="desc">
            Cửa hàng bánh mì độc quyền Trường ĐH Công Thương
          </p>
        </div>
        <div className="footer-contact">
          <p className="icon-contact">
            <img src={phone_icon} alt="" />
            <a href="callto:0346009095">0346009095</a>
          </p>
          <p className="icon-contact">
            <img src={mail_icon} alt="" />
            <a href="mailto:tenho6857@gmail.com">tenho6857@gmail.com</a>
          </p>
          <p className="icon-contact">
            <img src={fb_icon} alt="" />
            <a href="https://www.facebook.com/profile.php?id=61553840430877&locale=vi_VN">FB: Bánh Mì SV HUIT</a>
          </p>
        </div>
        <div className="footer-copyright">
          <hr/>
          <p color="white">Copyright @ 2023 - All Right Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

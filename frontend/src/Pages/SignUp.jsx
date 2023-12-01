import React, { useState } from "react";
import "./CSS/Loginsignup.css";
import { Link, useNavigate } from "react-router-dom";
import { handleRegisterApi } from "../services/userServices";



const SignUp = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [name, setName] = useState('')
  const [mssv, setMssv] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleMssvChange = (e) => {
    setMssv(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async() => {
    setErrors('')
    try {
      let data = await handleRegisterApi(email, pass, name, mssv, phone)
      console.log(data.message);

      if(data && data.errCode !== 0){
        setErrors(data.message)
      }
      if(data && data.errCode === 0){
        navigate('/signin')
      }

    } catch (error) {
      if (error.response) {
        if(error.response.data)
        {
          setErrors(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Đăng Ký</h1>
        <form className="loginsignup-fields" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" value={email} onChange={handleEmailChange}></input>
          <input type="password" placeholder="Mật khẩu" name="pass" value={pass} onChange={handlePassChange}></input>
          <input type="name" placeholder="Họ Tên" name="name" value={name} onChange={handleNameChange}></input>
          <input type="mssv" placeholder="Mã số sinh viên" name="mssv" value={mssv} onChange={handleMssvChange}></input>
          <input type="phone" placeholder="Số điện thoại" name="phone" value={phone} onChange={handlePhoneChange}></input>
          <div style={{ color:'red', textAlign:'center'}}>{errors}</div>
          <button type="submit">Tiếp Tục</button>
        </form>
        <p className="loginsignup-login">
          Đã có tài khoản ?{" "}
          <Link to="/signin">
            <span>Đăng Nhập</span>
          </Link>
        </p>
      </div>
    </div>
  );
};


export default SignUp;




import React, { useState } from "react";
import "./CSS/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { handleLoginApi } from "../services/userServices";
import Cookies from 'js-cookie';
import { useAuth } from '../authContext';

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [errMessage, setMessage] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };
  const handleLogin = async() => {
    setMessage('')
    try {
      let data = await handleLoginApi(email, pass)
      console.log(data.message)
      if(data && data.errCode !== 0){
        setMessage(data.message)
      }
      if(data && data.errCode === 0){
        // setMessage(data.user.role)
        login()
        Cookies.set('name', data.user.name)
        if(data.user.role === 1){
          Cookies.set('isAdmin', 'true');
          navigate('/system')
        }else{
          Cookies.set('isAdmin', 'false');
          navigate('/')
        }
        console.log('login success')
      }
    } catch (error) {
      if(error.response){
        if(error.response.data){
          setMessage(error.response.data.message)
        }
      }
    }
  }
  
  return (
    <div className="signin">
      <div className="signin-container">
        <h1>Đăng Nhập</h1>
        <div className="signin-fields">
          <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} id="email"></input>
          <input type="password" placeholder="Mật khẩu" value={pass} onChange={handlePassChange} id="password"></input>
          <div style={{ color:'red', textAlign:'center' }}>{errMessage}</div>
        <button type="submit" onClick={()=>{handleLogin()}}>Tiếp Tục</button>
        </div>
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

// const mapDispatchToProps = dispatch => {
//   return {
//     navigate: (path) => dispatch(push(path)),
//     adminLoginSuccess: (adminInfo) => dispatch(actions.userLoginSuccess(adminInfo)),
//     adminLoginFail: () => dispatch(actions.userLoginFail()),
//     userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
//   }
// }

export default SignIn;

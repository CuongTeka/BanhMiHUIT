import React, { useEffect } from 'react'
import './Headeradmin.css'
import { Link, useNavigate } from "react-router-dom";
import Logobm from '../Assets/logo.png'
import { useAuth } from '../../authContext';
import Cookies from "js-cookie";

const Headeradmin = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, isAdmin } = useAuth();

  useEffect(() => {
    const isAdmin = Cookies.get('isAdmin') === 'true';
    if (!isAdmin) {
      window.location.href = '/';
      // navigate('/');
    }
  }, [navigate, isAdmin]);

  const handleLogout = async() => {
    logout()
    navigate('/')
  }

  return (
    <div className='headeradmin'> 
      <div className='head-logo'>
        <img src={Logobm} alt=""/>
        <p >BÁNH MÌ HUIT</p>
      </div>
      <div className='head-login-cart'>
        {isLoggedIn ? (
            <><Link style={{textDecoration:'none' }} to ='/system/admin'><p>Xin chào: {Cookies.get('name')}</p></Link><button onClick={()=>{handleLogout()}}>Đăng xuất</button></>
        ) : (
          <Link style={{textDecoration:'none' }} to = '/signin'><button>Đăng Nhập</button></Link>
        )}
    
      </div>
    </div>
  )
}

export default Headeradmin
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  // const [name, setName] = useState('');

  useEffect(() => {
    const storedLoggedIn = Cookies.get('isLoggedIn');
    const storedAdmin = Cookies.get('isAdmin');
    if (storedLoggedIn === 'true') {
      setLoggedIn(true);
    }
    if(storedAdmin === 'true'){
      setAdmin(true)
    }else{
      setAdmin(false)
    }
  }, []);


  const grantAdmin = () => {
      setAdmin(true)
      Cookies.set('isAdmin', 'true');
  }

  const setUser = () => {
      setAdmin(false)
      Cookies.set('isAdmin', 'false');
  }

  const login = () => {
    setLoggedIn(true);
    Cookies.set('isLoggedIn', 'true');
  }

  const logout = () => {
    setLoggedIn(false);
    Cookies.remove('isLoggedIn');
    Cookies.remove('isAdmin');
    Cookies.remove('name')
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout, grantAdmin, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
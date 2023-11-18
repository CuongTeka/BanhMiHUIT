import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoggedIn = Cookies.get('isLoggedIn');
    if (storedLoggedIn === 'true') {
      setLoggedIn(true);
    }
  }, []);

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
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
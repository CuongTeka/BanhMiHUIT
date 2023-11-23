import React, { useState, useEffect } from "react";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { getItem } from "../util";
import Adminuser from "../Components/Admin/Adminuser/Adminuser";
import Adminproduct from "../Components/Admin/Adminproduct/Adminproduct";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../authContext';
import Cookies from "js-cookie";


const items = [
  getItem("Quản Lý Người Dùng", "user", <UserOutlined />,),
  getItem("Quản Lý Sản Phẩm", "product", <AppstoreOutlined />,),
];

const AdminPage = () => {
  const [keyselected, setKeySelected] = useState("");

  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    // const isAdmin = Cookies.get('isAdmin') === 'true';
    if (!isAdmin) {
      window.location.href = '/';
      // navigate('/');
    }
  }, [navigate, isAdmin]);

  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return(
          <Adminuser/>
        )
      case 'product':
        return(
          <Adminproduct/>
        )    
      default:
        break;
    }
  }

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <div style={{ display: "flex",  }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh',
            
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex :"1", padding: "20px", textAlign:'left'}}>
          {renderPage(keyselected)}
        </div> 
      </div>
    </>
  );
};

export default AdminPage;

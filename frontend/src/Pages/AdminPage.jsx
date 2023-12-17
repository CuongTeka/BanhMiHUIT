import React, { useState } from "react";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { getItem } from "../util";
import Adminuser from "../Components/Admin/Adminuser/Adminuser";
import Adminproduct from "../Components/Admin/Adminproduct/Adminproduct";
import Adminorder from "../Components/Admin/Adminorder/Adminorder";

const items = [
  getItem("Quản Lý Người Dùng", "user", <UserOutlined />),
  getItem("Quản Lý Sản Phẩm", "product", <AppstoreOutlined />),
  getItem("Quản Lý Đơn Hàng", "order", <AppstoreOutlined />),
];

const AdminPage = () => {
  const [keyselected, setKeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <Adminuser />;
      case "product":
        return <Adminproduct />;
      case "order":
        return <Adminorder />;
      default:
        break;
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: "1px 1px 2px #ccc",
            height: "100vh",
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: "1", padding: "20px", textAlign: "left" }}>
          {renderPage(keyselected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;

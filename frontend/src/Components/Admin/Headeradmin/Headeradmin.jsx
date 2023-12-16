import React, { useEffect, useState } from "react";
import "./Headeradmin.css";
import { Link } from "react-router-dom";
import Logobm from "../../Assets/logo.png";
import { useAuth } from "../../../Context/authContext.js";
import Cookies from "js-cookie";
import { UserOutlined } from "@ant-design/icons";
import { handleGetUserById } from "../../../services/userServices";

const Headeradmin = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    logout();
    window.location.href = "/";
  };

  const [userData, setuserData] = useState([]);
  const id = Cookies.get("id");
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      let data = await handleGetUserById(id);
      if (data && data.errCode === 0) {
        setuserData(data.data);
        // console.log(data.data)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          console.error(error);
          console.log(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="headeradmin">
      <div className="head-logo">
        <img src={Logobm} alt="" />
        <p>BÁNH MÌ HUIT</p>
      </div>
      <div className="head-login-cart">
        {isLoggedIn ? (
          <>
            <Link style={{ textDecoration: "none" }} to="/system/admin">
              <p>
                <UserOutlined
                  style={{
                    fontSize: "26px",
                    color: "#515151",
                    marginRight: "10px",
                  }}
                />
                Xin chào: {userData.name}
              </p>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/">
              <button
                onClick={() => {
                  handleLogout();
                }}
              >
                {" "}
                Đăng xuất{" "}
              </button>
            </Link>
          </>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/signin">
            <button>Đăng Nhập</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Headeradmin;

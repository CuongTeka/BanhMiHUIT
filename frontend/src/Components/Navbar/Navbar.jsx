import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logobm from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { useAuth } from "../../Context/authContext";
import Cookies from "js-cookie";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { handleGetUserById } from "../../services/userServices";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [menu, SetMenu] = useState();
  const [userData, setuserData] = useState([]);
  const { getTotalCartItems } = useContext(ShopContext);
  const [menuOpen, setmenuOpen] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const id = Cookies.get("id");
      let data = await handleGetUserById(id);
      if (data && data.errCode === 0) {
        setuserData(data.data);
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
  const items = [
    {
      key: "1",
      label: (
        <Link style={{ textDecoration: "none" }} to="/profile_user">
          Thông tin người dùng
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link style={{ textDecoration: "none" }} to="/orderhistory">
          Lịch sử đơn hàng
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <>
          {isLoggedIn ? (
            <span
              onClick={() => {
                logout();
              }}
            >
              Đăng xuất
            </span>
          ) : null}
        </>
      ),
    },
  ];

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="nav-logo">
          <Link style={{ textDecoration: "none" }} to="/">
            <img src={Logobm} alt="" />
            <p>BÁNH MÌ HUIT</p>
          </Link>
        </div>
        <div className="cart-mobile">
          {" "}
          {/*su dung cho mobile */}
          <Link to="/cart">
            <img src={cart_icon} alt="" />
          </Link>
          <div className="cart-count-mobile">{getTotalCartItems()}</div>
        </div>
        <div
          className="menu"
          onClick={() => {
            setmenuOpen(!menuOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-menu ${menuOpen ? "open" : " "}`}>
          <li
            onClick={() => {
              SetMenu("shop");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              TRANG CHỦ
            </Link>
            {menu === "shop" ? <hr /> : <></>}
          </li>
          <div className="mobile-hr"><hr /> </div>
          <div className="dropdown">
            <button
              className="dropbtn"
              onClick={() => {
                SetMenu("category");
              }}
            >
              <Link style={{ textDecoration: "none" }} to="/category">
                SẢN PHẨM
              </Link>
              {menu === "category" ? <hr /> : <></>}
            </button>
            <div className="dropdown-content">
              <ul className="sub-menu">
                <li
                  onClick={() => {
                    SetMenu("banhmi");
                  }}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/banhmi"
                    className="a"
                  >
                    Bánh mì
                  </Link>
                  {menu === "banhmi" ? <hr /> : <></>}
                </li>
                <li
                  onClick={() => {
                    SetMenu("nuocuong");
                  }}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/nuocuong"
                    className="a"
                  >
                    Nước uống
                  </Link>
                  {menu === "nuocuong" ? <hr /> : <></>}
                </li>
                <li
                  onClick={() => {
                    SetMenu("monanthem");
                  }}
                >
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/monanthem"
                    className="a"
                  >
                    Món ăn thêm
                  </Link>
                  {menu === "monanthem"}
                </li>
              </ul>
            </div>
          </div>

          <div className="mobile-hr"><hr /> </div>
        
          <li
            onClick={() => {
              SetMenu("aboutus");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/aboutus">
              VỀ CHÚNG TÔI
            </Link>
            {menu === "aboutus" ? <hr /> : <></>}
          </li>
          <div className="mobile-hr"><hr /> </div>
          <li
            onClick={() => {
              SetMenu("feedback");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/feedback">
              PHẢN HỒI
            </Link>
            {menu === "feedback" ? <hr /> : <></>}
          </li>
          <div className="mobile-hr"><hr /> </div>
          <li className="signin-mobile">
            {isLoggedIn ? (
              <>
                <Dropdown menu={{ items }} placement="bottom" arrow>
                  <Link style={{ textDecoration: "none" }}>
                    <p>
                      <UserOutlined
                        style={{
                          fontSize: "26px",
                          color: "#515151",
                          marginRight: "10px",
                        }}
                      />
                      {userData.name}
                    </p>
                  </Link>
                </Dropdown>
              </>
            ) : (
              <Link style={{ textDecoration: "none" }} to="/signin">
                <button>Đăng Nhập</button>
              </Link>
            )}
            {menu === "signin" ? <hr /> : <></>}
          </li>
        </ul>

        <div className="nav-login-cart">
          {isLoggedIn ? (
            <>
              <Dropdown menu={{ items }} placement="bottom" arrow>
                <Link style={{ textDecoration: "none" }}>
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
              </Dropdown>
            </>
          ) : (
            <Link style={{ textDecoration: "none" }} to="/signin">
              <button>Đăng Nhập</button>
            </Link>
          )}
          <div className="cart">
            <Link to="/cart">
              <img src={cart_icon} alt="" />
            </Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

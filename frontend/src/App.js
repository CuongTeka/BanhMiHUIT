import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Footer from "./Components/Footer/Footer";
import ProductBanner from "./Components/Assets/Product_Banner.png";
import ProductBanner1 from "./Components/Assets/Product_Banner1.png";
import ProductBanner2 from "./Components/Assets/Product_Banner2.png";
import AboutUs from "./Pages/AboutUs";
import PaymentPage from "./Pages/PaymentPage";
import Failpage from "./Components/404page/Failpage";
import AdminPage from "./Pages/AdminPage";
import { useAuth } from "./Context/authContext";
import Headeradmin from "./Components/Admin/Headeradmin/Headeradmin";
import ProfileUser from "./Pages/ProfileUser";
import Order from "./Components/OrderHistory/OrderHistory";
import FeedBack from "./Pages/FeedBack";
// import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {
  const { isAdmin } = useAuth();

  return (
    <div className="App">
      {isAdmin ? (
        <>
          <Headeradmin />
          <Routes>
            <Route path="/system/admin" element={<AdminPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<Failpage />} />
            <Route path="/" element={<Shop />} />
          </Routes>
        </>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route
              path="/category"
              element={<ShopCategory banner={ProductBanner} category={null} />}
            />
            <Route
              path="/banhmi"
              element={
                <ShopCategory
                  banner={ProductBanner}
                  category="653c5f91eee1ad0711267a15"
                />
              }
            />
            <Route
              path="/nuocuong"
              element={
                <ShopCategory
                  banner={ProductBanner1}
                  category="653c5f91eee1ad0711267a16"
                />
              }
            />
            <Route
              path="/monanthem"
              element={
                <ShopCategory
                  banner={ProductBanner2}
                  category="653c5f91eee1ad0711267a17"
                />
              }
            />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile_user" element={<ProfileUser />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/orderhistory" element={<Order />} />
            <Route path="/feedback" element={<FeedBack />} />
            <Route path="*" element={<Failpage />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

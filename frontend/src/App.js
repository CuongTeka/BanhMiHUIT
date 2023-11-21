import React, {} from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {Routes,Route} from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn';
import Footer from './Components/Footer/Footer';
import ProductBanner from './Components/Assets/Product_Banner.png';
import ProductBanner1 from './Components/Assets/Product_Banner1.png';
import ProductBanner2 from './Components/Assets/Product_Banner2.png';
import { BrowserRouter } from "react-router-dom";
import AboutUs from './Pages/AboutUs';
import Failpage from "./Components/404page/Failpage";



function App() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if the "isAdmin" cookie is set to "true"
  //   const isAdmin = Cookies.get("isAdmin") === "true";

  //   // If not an admin, redirect to the login page or another location
  //   if (!isAdmin) {
  //     navigate("/404page"); // Replace '/login' with your desired redirect location
  //   }
  // }, [navigate]);

  return (
    <div className="App">
        
        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route index element={<Shop/>}/>
            <Route path='/' element={<Shop/>}/>
            <Route path='/category' element={<ShopCategory banner={ProductBanner} category={null}  />}/>
            <Route path='/banhmi' element={<ShopCategory banner={ProductBanner} category="653c5f91eee1ad0711267a15"/>}/>
            <Route path='/nuocuong' element={<ShopCategory banner={ProductBanner1} category="653c5f91eee1ad0711267a16"/>}/>
            <Route path='/monanthem' element={<ShopCategory banner={ProductBanner2} category="653c5f91eee1ad0711267a17"/>}/>
            <Route path='/product' element={<Product/>}>
              <Route path=':productId' element={<Product/>}/>
            </Route>
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path="/404page" element={<Failpage />} />
        </Routes>
        <Footer/>
        </BrowserRouter>
    
    </div>
  );
  
}

export default App

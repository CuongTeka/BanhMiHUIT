import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {Routes,Route} from 'react-router-dom';
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


function App() {
  return (
    <div className="App">

        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Shop/>}/>
            <Route path='/category' element={<ShopCategory banner={ProductBanner} category={null}  />}/>
            <Route path='/banhmi' element={<ShopCategory banner={ProductBanner} category="banhmi"/>}/>
            <Route path='/nuocuong' element={<ShopCategory banner={ProductBanner1} category="nuocuong"/>}/>
            <Route path='/monanthem' element={<ShopCategory banner={ProductBanner2} category="monanthem"/>}/>
            <Route path='/product' element={<Product/>}>
              <Route path=':productId' element={<Product/>}/>
              </Route>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
        </Routes>
        <Footer/>
        </BrowserRouter>
    
    </div>
  );
}

export default App

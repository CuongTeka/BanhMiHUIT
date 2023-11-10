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
 
function App() {
  return (
    <div className="App">
       
        <Navbar/>
        <Routes>
            <Route path='/' element={<Shop/>}/>
            <Route path='/new' element={<ShopCategory category="new"/>}/>
            <Route path='/sas' element={<ShopCategory category="sas"/>}/>
            <Route path='/congra' element={<ShopCategory category="congra"/>}/>
            <Route path='/product' element={<Product/>}/>
              <Route path=':productId' element={<Product/>}>
              </Route>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
        </Routes>

    
    </div>
  );
}

export default App;

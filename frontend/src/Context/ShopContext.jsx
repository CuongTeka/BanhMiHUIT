import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assets/all_product";


export const ShopContext = createContext(null);


const getDefaultCart= ()=>{
  let cart ={};
  for (let index = 0; index <all_product.length+1; index++){
      cart[index] = 0;
  }
  return cart;
}

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating asynchronous data fetching (replace this with your actual data fetching logic)
    const fetchData = async () => {
      try {
        // Simulating a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(all_product);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [cartItems, setCartItems] = useState(getDefaultCart())

  
  const addToCart = (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    console.log(cartItems)
  } 
  const removeToCart = (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  } 

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for(const item in cartItems)
    {
        if(cartItems[item] > 0)
        {
           let itemInfo = all_product.find((product)=>product.id===Number(item))
           totalAmount += itemInfo.new_price * cartItems[item];
        }
    }
    return totalAmount;
  }
  const getTotalCartItems = () =>{
    let totalItem = 0;
    for(const item in cartItems)
    {
      if(cartItems[item] > 0)
      {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  }
  
 


  const contextValue = {
  
    getTotalCartAmount,
    getTotalCartItems,
    all_product: products,
    loading,
    error,
    cartItems,
    addToCart,
    removeToCart,
    
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider
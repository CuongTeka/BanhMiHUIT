import React, { createContext, useState, useEffect } from "react";
import productData from "../Components/Assets/all_product"; // Rename the imported variable

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < productData.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(productData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [cartItems, setCartItems] = useState(getDefaultCart());

  const contextValue = {
    loading,
    error,
    all_product: products, // Rename to match the variable in your ShopCategory component
    cartItems,
    addToCart: (itemId) => {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    },
    removeToCart: (itemId) => {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    },
    getTotalCartAmount: () => {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = products.find((product) => product.id === Number(item));
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
      return totalAmount;
    },
    getTotalCartItems: () => {
      let totalItem = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          totalItem += cartItems[item];
        }
      }
      return totalItem;
    },
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

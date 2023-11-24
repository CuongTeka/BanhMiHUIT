import React, { createContext, useState, useEffect } from "react";
// import productData from "../Components/Assets/all_product"; // Rename the imported variable
import { handleGetAllProduct } from "../services/adminServices";
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        productData();
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const productData = async () => {
    try {
      let data = await handleGetAllProduct();
      // console.log(data.message)
      // console.log(data.data)
      if (data && data.errCode === 0) {
        setProducts(data.data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          console.log(error.response.data.message);
        }
      }
    }
  };

  const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < products.length + 1; index++) {
      cart[index] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  const contextValue = {
    loading,
    error,
    all_product: products,
    cartItems,
    addToCart: (itemId) => {
      setCartItems((prev) => ({ ...prev, [itemId]: itemId}));
    },
    removeToCart: (itemId) => {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId]}));
    },
    getTotalCartAmount: () => {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = products.find(
            (product) => product._id === Number(item)
          );
          totalAmount += itemInfo.price * cartItems[item];
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

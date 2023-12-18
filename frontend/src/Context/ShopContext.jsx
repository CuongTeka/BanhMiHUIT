import React, { createContext, useState, useEffect } from "react";
import { handleGetAllProduct } from "../services/productService";
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await productData();
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
      // console.log('Data:', data);
      if (data && data.errCode === 0) {
        setProducts(data.data);
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
    products,
    cartItems,
    addToCart: (itemId) => {
      setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    },
    // them san pham

    removeToCart: (itemId) => {
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        if (updatedCart[itemId] > 0) {
          updatedCart[itemId] -= 1;
        }
        return updatedCart;
      });
    },
    // bot san pham

    getTotalCartAmount: () => {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = products.find((product) => product._id === item);
          // console.log('iteminfo',itemInfo)
          if (itemInfo && itemInfo.price !== undefined) {
            totalAmount += itemInfo.price * cartItems[item];
          }
        }
      }
      return totalAmount;
    },
    // lay tong so luong san pham

    getTotalCartItems: () => {
      let totalItem = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          totalItem += cartItems[item];
        }
      }
      return totalItem;
    },
    // lay tong san pham

    resetCart: () => {
      setCartItems(getDefaultCart());
    },
    //Đưa gio hang ve trang hai ban dau
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ShopContextProvider from "./Context/ShopContext";
import { AuthProvider } from "./authContext";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
// import { store } from "./Redux/Store.jsx";
// import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();

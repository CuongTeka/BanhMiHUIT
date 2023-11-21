import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AdminP from "./AdminP";
import reportWebVitals from "./reportWebVitals";
import ShopContextProvider from "./Context/ShopContext";
import { AuthProvider } from "./authContext";
import Cookies from "js-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
const isAdmin = Cookies.get("isAdmin") === "true";
console.log("isAdmin:", isAdmin);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ShopContextProvider>
      {isAdmin ? <AdminP /> : <App />}
      </ShopContextProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();

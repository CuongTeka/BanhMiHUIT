import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AdminP from "./AdminP";
import reportWebVitals from "./reportWebVitals";
import ShopContextProvider from "./Context/ShopContext";
import { AuthProvider } from "./authContext";
import Cookies from "js-cookie";
import { store } from "./Redux/Store.jsx";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const isAdmin = Cookies.get("isAdmin") === "true";
console.log("isAdmin:", isAdmin);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ShopContextProvider>
          {isAdmin ? <AdminP /> : <App />}
        </ShopContextProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();

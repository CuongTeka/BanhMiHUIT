import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ShopContextProvider from "./Context/ShopContext";
import { AuthProvider } from "./authContext";
import { store } from "./Redux/Store.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(

    <BrowserRouter>
        <React.StrictMode>
          <AuthProvider>
            <Provider store={store}>
              <ShopContextProvider>
                 <App />
              </ShopContextProvider>
            </Provider>
          </AuthProvider>
        </React.StrictMode>
      </BrowserRouter>
  
);

reportWebVitals();

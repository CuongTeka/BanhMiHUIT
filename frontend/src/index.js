import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ShopContextProvider from "./Context/ShopContext";
import { AuthProvider } from "./Context/authContext";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { store, persistor } from "./Redux/Store.jsx";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <ShopContextProvider>
            <App />
          </ShopContextProvider>
        </AuthProvider>
        </PersistGate>
      </Provider>,
  </BrowserRouter>
);

reportWebVitals();

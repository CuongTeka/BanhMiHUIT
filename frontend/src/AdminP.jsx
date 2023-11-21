import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./Pages/AdminPage";
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import Headeradmin from "./Components/Admin/Headeradmin";

function AdminP() {
  return (
    <div className="adminpage">
      <BrowserRouter>
        <Headeradmin />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/system/admin" element={<AdminPage />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AdminP;

import React from "react";
import { Route, Routes } from "react-router-dom";
import AddRestaurant from "../components/AddRestaurant";
import Home from "../components/Home";
import Orders from "../components/Orders";
import Profile from "../components/Profile";
import RestoDetails from "../components/restoDetails/RestoDetails";


const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/addRestaurant" element={<AddRestaurant />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/details" element={<RestoDetails />} />
    </Routes>
  );
};

export default DashboardRouter;

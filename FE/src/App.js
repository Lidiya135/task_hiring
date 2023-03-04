import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Products from "./pages/Products.js";
import ModalEdit from "./components/ModalEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} replace="true" />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/edit" element={<ModalEdit />} />
      </Routes>
    </BrowserRouter>
   
  );
};

export default App;
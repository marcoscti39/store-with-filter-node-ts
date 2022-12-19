import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
};

export default App;

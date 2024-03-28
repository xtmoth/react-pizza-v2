import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx";
import Header from "./components/Header";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound.jsx";
import PizzaFull from "./pages/PizzaFull";
import "./scss/app.scss";

export const SearchContext = React.createContext();

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<PizzaFull />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

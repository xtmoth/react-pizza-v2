import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound.jsx";
import "./scss/app.scss";

export const SearchContext = React.createContext();

function App() {
  return (
    <div className="app">
      <div className="layoutMain">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <button
          className="btnToTop"
          type="button"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Вернуться к началу страницы
        </button>
      </div>
    </div>
  );
}

export default App;

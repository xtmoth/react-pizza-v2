import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components/Header";

const MainLayout: React.FC = () => {
  return (
    <div className="app">
      <div className="layoutMain">
        <Header />

        <Outlet />

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
};

export default MainLayout;

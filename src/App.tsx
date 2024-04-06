import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loadable from "react-loadable";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

import "./scss/app.scss";

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => <div>Загрузка...</div>,
});

const PizzaFull = React.lazy(() =>
  import(/* webpackChunkName: "PizzaFull" */ "./pages/PizzaFull").then(
    (module) => ({
      default: module.PizzaFull,
    })
  )
);

const NotFound = React.lazy(() =>
  import(/* webpackChunkName: "NotFound" */ "./pages/NotFound").then(
    (module) => ({
      default: module.NotFound,
    })
  )
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <PizzaFull />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

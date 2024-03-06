import React from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton";
import "./scss/app.scss";

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://65e7602b53d564627a8eab8e.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <div className="layoutMain">
        <Header />
        {isLoading && "Загрузка..."}
        <div className="layout1">
          <Categories />
          <Sort />
        </div>
        <div className="layout2">
          {isLoading
            ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
            : pizzas.map((obj) =>
                isLoading ? (
                  <Skeleton />
                ) : (
                  <PizzaBlock {...obj} key={obj.imgUrl} />
                )
              )}
        </div>
      </div>
    </div>
  );
}

export default App;

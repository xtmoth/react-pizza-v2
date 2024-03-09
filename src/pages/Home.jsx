import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://65e7602b53d564627a8eab8e.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="layout1">
        <Categories />
        <Sort />
      </div>
      {isLoading && (
        <div style={{ margin: "30px 0 30px" }}>Загружаем пиццы...</div>
      )}
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
    </>
  );
}

export default Home;

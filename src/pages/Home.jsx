import React from "react";
import { SearchContext } from "../App";
import Categories from "../components/Categories";
import Search from "../components/Search";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [pageCurrent, setPageCurrent] = React.useState(1);
  const [sortTypeObj, setSortTypeObj] = React.useState({
    name: "популярности ⬇",
    sortProperty: "rating",
  });

  const skeletonBlocks = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzaBlocks = pizzas.map((obj) =>
    isLoading ? <Skeleton /> : <PizzaBlock {...obj} key={obj.imgUrl} />
  );

  const { searchValue } = React.useContext(SearchContext);

  React.useEffect(() => {
    setIsLoading(true);
    const order = sortTypeObj.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortTypeObj.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    fetch(
      `https://65e7602b53d564627a8eab8e.mockapi.io/items?page=${pageCurrent}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortTypeObj, searchValue, pageCurrent]);

  return (
    <>
      <div className="layout">
        <Categories
          categoryId={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <div className="layout1">
          <Sort
            sortTypeObj={sortTypeObj}
            onChangeSort={(index) => setSortTypeObj(index)}
          />
          <Search />
        </div>
      </div>
      <Pagination onChangePage={(number) => setPageCurrent(number)} />

      {isLoading && (
        <div style={{ margin: "30px 0 30px" }}>Загружаем пиццы...</div>
      )}
      <div className="layout2">{isLoading ? skeletonBlocks : pizzaBlocks}</div>
      <Pagination onChangePage={(number) => setPageCurrent(number)} />
    </>
  );
}

export default Home;

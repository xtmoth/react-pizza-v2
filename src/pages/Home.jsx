import React from "react";
import Categories from "../components/Categories";
import Search from "../components/Search";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

function Home({ searchValue, setSearchValue }) {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortTypeObj, setSortTypeObj] = React.useState({
    name: "популярности ⬇",
    sortProperty: "rating",
  });

  const skeletonBlocks = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzaBlocks = pizzas
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   }
    //   return false;
    // })
    .map((obj) =>
      isLoading ? <Skeleton /> : <PizzaBlock {...obj} key={obj.imgUrl} />
    );

  React.useEffect(() => {
    setIsLoading(true);
    const order = sortTypeObj.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortTypeObj.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    fetch(
      `https://65e7602b53d564627a8eab8e.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortTypeObj, searchValue]);

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
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
      </div>
      {isLoading && (
        <div style={{ margin: "30px 0 30px" }}>Загружаем пиццы...</div>
      )}
      <div className="layout2">{isLoading ? skeletonBlocks : pizzaBlocks}</div>
    </>
  );
}

export default Home;

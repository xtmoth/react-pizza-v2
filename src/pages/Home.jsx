import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { SearchContext } from "../App";
import { setCategoryId, setPageCurrent } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Search from "../components/Search";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

function Home() {
  const dispatch = useDispatch();
  const { categoryId, sortTypeObj, pageCurrent } = useSelector(
    (state) => state.filter
  );

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const skeletonBlocks = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzaBlocks = pizzas.map((obj) =>
    isLoading ? <Skeleton /> : <PizzaBlock {...obj} key={obj.imgUrl} />
  );

  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setPageCurrent(number));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortTypeObj.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortTypeObj.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://65e7602b53d564627a8eab8e.mockapi.io/items?page=${pageCurrent}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortTypeObj, searchValue, pageCurrent]);

  return (
    <>
      <div className="layout">
        <Categories
          categoryId={categoryId}
          onChangeCategory={(id) => onChangeCategory(id)}
        />
        <div className="layout1">
          <Sort />
          <Search />
        </div>
      </div>
      <Pagination pageCurrent={pageCurrent} onChangePage={onChangePage} />

      {isLoading && (
        <div style={{ margin: "30px 0 30px" }}>Загружаем пиццы...</div>
      )}
      <div className="layout2">{isLoading ? skeletonBlocks : pizzaBlocks}</div>
      <Pagination pageCurrent={pageCurrent} onChangePage={onChangePage} />
    </>
  );
}

export default Home;

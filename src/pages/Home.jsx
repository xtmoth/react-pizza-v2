import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

import { SearchContext } from "../App";
import { sortTypes } from "../components/Sort";
import {
  setCategoryId,
  setPageCurrent,
  setFilters,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Search from "../components/Search";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

function Home() {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortTypeObj, pageCurrent } = useSelector(
    (state) => state.filter
  );

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setPageCurrent(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = sortTypeObj.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortTypeObj.sortProperty.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://65e7602b53d564627a8eab8e.mockapi.io/items?page=${pageCurrent}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });
  };

  // Парсинг заданных параметров фильтрации и/или сортировки и сохранение их в Редакс
  React.useEffect(() => {
    if (window.location.hash === "#/") {
      window.location.hash.substring(3);
    } else if (window.location.hash) {
      const params = qs.parse(window.location.hash.substring(3));
      const sort = sortTypes.find(
        (sortType) => sortType.sortProperty === params.sortProperty
      );
      console.log(
        "Произошёл парсинг заданных параметров фильтрации и/или сортировки"
      );
      console.log(
        "Параметры после парсинга: \n",
        "pageCurrent = ",
        params.pageCurrent,
        "\n",
        "categoryId =",
        params.categoryId,
        "\n",
        "sort =",
        sort
      );

      console.log(
        "Произошло сохранение заданных параметров фильтрации и/или сортировки в Редакс"
      );
      console.log(
        "После сохранения параметров в Редакс новый sortProperty теперь такой:\n",
        sort.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Получение пицц
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      console.log(
        "Запрашиваем пиццы по заданным параметрам фильтрации и/или сортировки: \n",
        "pageCurrent = ",
        pageCurrent,
        "\n",
        "categoryId =",
        categoryId,
        "\n",
        "sortTypeObj.sortProperty =",
        sortTypeObj.sortProperty,
        "\n",
        "searchValue =",
        searchValue
      );
      fetchPizzas();
    }

    isSearch.current = false;
  }, [pageCurrent, categoryId, sortTypeObj.sortProperty, searchValue]);

  // Вшивание параметров фильтрации и/или сортировки в адресную строку при их изменении
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        pageCurrent,
        categoryId,
        sortProperty: sortTypeObj.sortProperty,
      });

      navigate(`?${queryString}`);

      console.log(
        "Параметры фильтрации и/или сортировки были:\n 1. изменены\n 2. вшиты в адресную строку\nТекущий статус: параметры готовы к парсингу и сохранению в Редакс"
      );
    }
    isMounted.current = true;
  }, [pageCurrent, categoryId, sortTypeObj.sortProperty]);

  const skeletonBlocks = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzaBlocks = pizzas.map((obj) =>
    isLoading ? <Skeleton /> : <PizzaBlock {...obj} key={obj.imgUrl} />
  );

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

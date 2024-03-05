import pizzas from "./assets/pizzas.json";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import "./scss/app.scss";

function App() {
  return (
    <div className="App">
      <div className="layoutMain">
        <Header />
        <div className="layout1">
          <Categories />
          <Sort />
        </div>
        <div className="layout2">
          {pizzas.map((obj) => (
            <PizzaBlock {...obj} key={obj.imgUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

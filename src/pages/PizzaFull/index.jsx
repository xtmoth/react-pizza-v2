import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import styles from "./PizzaFull.module.scss";

function PizzaFull() {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://65e7602b53d564627a8eab8e.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
        alert(error.message);
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={pizza.imgUrl} alt="Pizza image" />
      </div>
      <div className={styles.title}>
        <h2>{pizza.title}</h2>
      </div>
      {/* <div className={styles.description}>
        <p>Pizza Description</p>
      </div> */}
      <div className={styles.cost}>
        <h4>{pizza.price} RUB</h4>
      </div>
    </div>
  );
}

export default PizzaFull;

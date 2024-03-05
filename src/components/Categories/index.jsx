import React from "react";
import styles from "./Categories.module.scss";

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className={styles.categories}>
      <ul className={styles.list}>
        {categories.map((value, index) => (
          <li
            className={`${styles.item} ${
              activeIndex === index ? `${styles.active}` : ""
            }`}
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

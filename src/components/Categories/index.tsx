import React from "react";
import styles from "./Categories.module.scss";

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (index: number) => void;
};

const categoryNames = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = ({
  categoryId,
  onChangeCategory,
}) => {
  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {categoryNames.map((categoryName, index) => (
          <li
            className={`${styles.item} ${
              categoryId === index ? `${styles.active}` : ""
            }`}
            key={index}
            onClick={() => onChangeCategory(index)}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

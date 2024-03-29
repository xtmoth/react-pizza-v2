import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addItem, selectCartItemById } from "../../redux/slices/cartSlice";

import styles from "./PizzaBlock.module.scss";

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  sizes: number[];
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imgUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  const [activeType, setActiveType] = React.useState<number>(0);
  const [activeSize, setActiveSize] = React.useState<number>(0);

  const typeNames = ["тонкое", "традиционное"];

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imgUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <div className={styles.about}>
          <div className={styles.image}>
            <img src={imgUrl} alt="Pizza image" />
          </div>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.options}>
          <div className={styles.type}>
            <ul className={styles.list}>
              {types.map((typeIndex) => (
                <li
                  className={`${styles.item} ${
                    activeType === typeIndex ? `${styles.active}` : ""
                  }`}
                  key={typeIndex}
                  onClick={() => setActiveType(typeIndex)}
                >
                  {typeNames[typeIndex]}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.size}>
            <ul className={styles.list}>
              {sizes.map((size, index) => (
                <li
                  className={`${styles.item} ${
                    activeSize === index ? `${styles.active}` : ""
                  }`}
                  key={size}
                  onClick={() => setActiveSize(index)}
                >
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.user}>
          <div className={styles.price}>от {price} RUB</div>
          <div className={styles.cart}>
            <div className={styles.add}>
              <button onClick={onClickAdd}>
                <div className={styles.plus}>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                      fill="#EB5A1E"
                    />
                    <path
                      d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                      fill="#EB5A1E"
                    />
                  </svg>
                </div>
                <div className={styles.text}>Добавить</div>
                {addedCount > 0 && (
                  <div className={styles.indicator}>{addedCount}</div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;

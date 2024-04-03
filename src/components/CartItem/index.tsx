import React from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";

import { addItem, minusItem, removeItem } from "../../redux/cart/slice";
import { CartItem } from "../../redux/cart/types";

import styles from "./CartItem.module.scss";

type CartItemProps = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imgUrl: string;
};

const CartItemBlock: React.FC<CartItemProps> = ({
  id,
  title,
  type,
  size,
  price,
  count,
  imgUrl,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      } as CartItem)
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить товар?"))
      dispatch(removeItem(id));
  };

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src={imgUrl} alt="Pizza" />
        </div>
        <div className={styles.about}>
          <div className={styles.title}>
            <h3>{title}</h3>
          </div>
          <div className={styles.options}>
            {type}, {size} <span> см.</span>
          </div>
        </div>
      </div>

      <div className={styles.number}>
        <button
          onClick={onClickMinus}
          disabled={count === 1}
          // className={clsx("countBtn", {
          //   "countBtnDisabled": count === 1,
          // })}
          className={clsx("countBtn", {
            countBtnDisabled: count === 1,
          })}
        >
          <span>-</span>
        </button>
        <div>{count}</div>
        <button onClick={onClickPlus} className="countBtn">
          <span>+</span>
        </button>
      </div>
      <div className={styles.cost}>
        {price * count} <span> ₽</span>
      </div>
      <div className={styles.delete} onClick={onClickRemove}>
        x
      </div>
    </div>
  );
};

export default CartItemBlock;

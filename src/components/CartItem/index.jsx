import React from "react";
import styles from "./CartItem.module.scss";

function CartItem() {
  return (
    <div className={styles.cartItem}>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src="" alt="Pizza" />
        </div>
        <div className={styles.about}>
          <div className={styles.title}>
            <h3>Title</h3>
          </div>
          <div className={styles.options}>
            Type, Size <span> см.</span>
          </div>
        </div>
      </div>

      <div className={styles.number}>
        <button>-</button>
        <div>Number</div>
        <button>+</button>
      </div>
      <div className={styles.cost}>
        Cost <span> ₽</span>
      </div>
      <div className={styles.delete}>x</div>
    </div>
  );
}

export default CartItem;

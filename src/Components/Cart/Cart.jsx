//!REVAN
import React from 'react';
import styles from './Cart.module.css';
import svg  from "../../Images/Cart/cartimg.png"
import svg2  from "../../Images/Cart/cartimg2.png"
import { useState } from 'react';
import productsItem from '../../Server/Products';

const Cart = () => {
  return (
    <div className={styles.cartContainer}>
      <nav className={styles.breadcrumb}>
        <a href="/">Home</a> / <span>Cart</span>
      </nav>
      <div className={styles.cartTable}>
        <div className={`${styles.cartTr} ${styles.cartHeader}`}>
          <div style={{ width: "182px"}}>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>
        <div className={styles.cartTr}>
          <div className={styles.crtImg}>
            <img src={svg} alt='Cart' id='image' className={styles.cartImg} />
            <div>LCD Monitor</div>
          </div>
          <div>$650</div>
          <div>
            <select defaultValue="1">
              <option value="1">01</option>
              <option value="2">02</option>
              <option value="3">03</option>
            </select>
          </div>
          <div>$650</div>
        </div>
        <div className={styles.cartTr}>
          <div className={styles.crtImg2}>
            <img src={svg2} alt='Cart' id='image' className={styles.cartImg2} />
            <div>H1 Gamepad</div>
          </div>
          <div>$550</div>
          <div>
            <select defaultValue="2">
              <option value="1">01</option>
              <option value="2">02</option>
              <option value="3">03</option>
            </select>
          </div>
          <div>$1100</div>
        </div>
      </div>
      <div className={styles.btn}>
        <button className={styles.returnButton}>Return To Shop</button>
        <button className={styles.updateButton}>Update Cart</button>
      </div>
      <div className={styles.couponContainer}>
        <input type="text" placeholder="Coupon Code" />
        <button className={styles.couponButton}>Apply Coupon</button>
      </div>
      <div className={styles.crtTotal}>
        <div className={styles.cartTotal}>
          <h4>Cart Total</h4>
          <div className={styles.cartTtl1}>
            <p>Subtotal:</p>
            <p> $1750</p>
          </div>
          <div className={styles.cartTtl2}>
            <p>Shipping:</p>
            <p> Free</p>
          </div>
          <div className={styles.cartTtl3}>
            <p>Total: </p>
            <p>$1750</p>
          </div>
          <button className={styles.checkoutButton}>Process to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;





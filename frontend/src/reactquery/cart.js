import React from "react";
import useCart from "../hooks/useCart.js";
import "../cart.css";



    const Cart= () => {
      const { items, toggleCart, isCartVisible } = useCart();



      return (
        <>
          <div
            className={`overlay ${isCartVisible ? "visible" : ""}`}
            onClick={toggleCart}
          ></div>
          <div className={`cart-panel ${isCartVisible ? "visible" : ""}`}>
            <button className="close-btn" onClick={toggleCart}>
              Close
            </button>
            <h1>Cart</h1>
            {!items || items.length===0 ?(<div>no items in the cart </div>):(items.map((item) => (
              <div key={item.fob}>
                <p>
                  {item.title} - {item.price} - {item.quantity}
                </p>
              </div>
            )))}
          </div>
        </>
      );
    };



   
 
export default Cart
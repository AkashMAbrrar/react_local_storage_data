import "./Bottles.css";

import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import { addToLs, getStoredCart } from "../../utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
  const [bottles, setBottles] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("bottle.json")
      .then((res) => res.json())
      .then((data) => setBottles(data));
  }, []);

  // load cart from local storage

  useEffect(() => {
    console.log("called the use effect", bottles.length);
    if (bottles.length) {
      const storedCart = getStoredCart();
      const savedCart = [];
      // console.log(storedCart);

      for (const id of storedCart) {
        console.log(id);
        const bottle = bottles.find((bottle) => bottle.id === id);
        if (bottle) {
          savedCart.push(bottle);
        }
      }
      console.log("saved cart", savedCart);
      setCart(savedCart);
    }
  }, [bottles]);

  const handleAddToCart = (bottle) => {
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLs(bottle.id); // set to local store bottle id
  };

  return (
    <div>
      <h2>Bottles Available: {bottles.length}</h2>
      <Cart cart={cart}></Cart>
      <div className="bottle_container">
        {bottles.map((bottle) => (
          <Bottle
            key={bottle.id}
            bottle={bottle}
            handleAddToCart={handleAddToCart}></Bottle>
        ))}
      </div>
    </div>
  );
};

export default Bottles;

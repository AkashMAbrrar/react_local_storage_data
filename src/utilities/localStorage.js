// check the item whether its exists in the array
const getStoredCart = () => {
  const storedCartString = localStorage.getItem("cart");
  if (storedCartString) {
    return JSON.parse(storedCartString);
  }
  return [];
};

//
const saveCartToLS = (cart) => {
  const cartStringified = JSON.stringify(cart);
  localStorage.setItem("cart", cartStringified);
};

// if we need to added any item in the local storage
const addToLs = (id) => {
  const cart = getStoredCart();
  cart.push(id);
  // save to local storage
  saveCartToLS(cart);
};

export { addToLs, getStoredCart };

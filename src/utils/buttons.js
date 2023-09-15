const isInCart = (cartItems, productId) => {
  const items = !!cartItems.find((item) => item.id === productId);
  return items;
};

const itemQty = (cartItems, productId) => {
  const index = cartItems.findIndex((item) => item.id === productId);
  if (index === -1) return false;
  return cartItems[index].qty;
};

export { isInCart, itemQty };

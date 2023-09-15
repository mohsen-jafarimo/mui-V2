import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      totalPrice: 0,
    };

const Calc = (state) => {
  const totalPrice = state.cartItems.reduce((acc, item) => {
    return (acc += item.qty * item.price);
  }, 0);
  return totalPrice;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existItem) {
        existItem.qty = 1;
      } else {
        state.cartItems.push({ ...action.payload, qty: 1 });
      }

      state.totalPrice = Calc(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    IncreaseQty: (state, action) => {
      const indexI = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems[indexI].qty++;
      state.totalPrice = Calc(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    DecreaseQty: (state, action) => {
      const indexD = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems[indexD].qty--;
      state.totalPrice = Calc(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    RemoveItem: (state, action) => {
      const items = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.cartItems = [...items];
      state.totalPrice = Calc(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, IncreaseQty, DecreaseQty, RemoveItem } =
  cartSlice.actions;
export default cartSlice.reducer;

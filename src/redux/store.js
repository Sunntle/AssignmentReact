import { configureStore } from "@reduxjs/toolkit";
import reducer, { addToCart } from "./cart/cartSlice";
import toastReducer from "./toast/toastSlice";
import userReducer from "./user/userSlice";
import wishlistReducer from "./wishlist/wishlistSlice";
const rootReducer = {
  cartReducer: reducer,
  toastReducer: toastReducer,
  userReducer: userReducer,
  wishlistReducer: wishlistReducer
};
export const store = configureStore({
  reducer: rootReducer,
});
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cartReducer));
});
const cartData = localStorage.getItem("cart");
if (cartData) {
  const cartState = JSON.parse(cartData);
  cartState.forEach((item) => {
    store.dispatch(addToCart(item));
  });
}

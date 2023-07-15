import { configureStore } from "@reduxjs/toolkit";
import reducer from "./cart/cartSlice";
import toastReducer from "./toast/toastSlice";
const rootReducer = {
  cartReducer: reducer,
  toastReducer: toastReducer,
};
export const store = configureStore({
  reducer: rootReducer,
});

import { configureStore } from "@reduxjs/toolkit";
import reducer from "./cart/cartSlice";
const rootReducer = {
  cartReducer: reducer,
};
export const store = configureStore({
  reducer: rootReducer,
});

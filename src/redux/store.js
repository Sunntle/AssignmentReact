import { configureStore } from "@reduxjs/toolkit";
import reducer from "./cart/cartSlice";
import toastReducer from "./toast/toastSlice";
import userReducer from "./user/userSlice";
const rootReducer = {
  cartReducer: reducer,
  toastReducer: toastReducer,
  userReducer: userReducer,
};
export const store = configureStore({
  reducer: rootReducer,
});

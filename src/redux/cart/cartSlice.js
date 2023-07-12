import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity, sizeSelected, colorSelected } = action.payload;
      const obj = state.find(
        (el) => el.id === id && el.sizeSelected === sizeSelected && el.colorSelected === colorSelected
      );
      if (obj) {
        obj.quantity += quantity;
      } else {
        state.push(action.payload);
      }
    },
    updateCart: (state, action) => {
      const { id, quantity, sizeSelected, colorSelected } = action.payload;
      const obj = state.find(
        (el) => el.id === id && el.sizeSelected === sizeSelected && el.colorSelected === colorSelected
      );
      obj.quantity = quantity;
    },
    removeItem: (state, action) => {
      const index = state.findIndex((el) => action.payload.id === el.id);
      state.splice(index, 1);
    },
    removeAll: (state) => {
      state.splice(0, state.length);
    },
  },
});
const { reducer, actions } = cartSlice;
export const { addToCart, removeAll, removeItem, updateCart } = actions;
export default reducer;

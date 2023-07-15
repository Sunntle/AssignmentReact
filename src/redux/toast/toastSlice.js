import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
  message: "",
  type: "",
};
const toastSlice = createSlice({
  name: "toast",
  initialState: initialState,
  reducers: {
    showToast: (state, action) => {
      return {
        isOpen: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideToast: (state, action) => {
      return {
        ...state,
        isOpen: false,
      };
    },
  },
});
const { reducer: toastReducer, actions } = toastSlice;
export const { showToast, hideToast } = actions;
export default toastReducer;

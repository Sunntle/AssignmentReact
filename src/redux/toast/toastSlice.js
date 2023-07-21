import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  notification: null,
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
        notification: action.payload.notification,
      };
    },
    hideToast: (state, action) => {
      return initialState;
    },
  },
});
const { reducer: toastReducer, actions } = toastSlice;
export const { showToast, hideToast } = actions;
export default toastReducer;

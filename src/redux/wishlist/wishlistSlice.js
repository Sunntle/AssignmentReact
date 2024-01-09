import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showToast } from "redux/toast/toastSlice";

const initialState = {
  list: JSON.parse(localStorage.getItem("favoritesList")) || [],
  errorMessage: ""
};
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlistAndClearMessage",
  async (item, { dispatch, getState }) => {
    const list = [...getState().wishlistReducer.list];
    const obj = list.findIndex((el) => el.id === item?.id)
    if (obj === -1) {
      list.push(item);
      await dispatch(
        showToast({
          type: "success",
          message: "Add item to wishlist successfully!",
        })
      );
      localStorage.setItem("favoritesList", JSON.stringify(list));
    } else {
      await dispatch(
        showToast({ type: "info", message: "Item existed in the wishlist" })
      );
    }
    return list;
  }
);

export const removeItem = createAsyncThunk(
  "wishlist/removeItem",
  async (item, { dispatch, getState }) => {
    const list = [...getState().wishlistReducer.list];
    const index = list.findIndex((el) => item?.id === el.id);
    list.splice(index, 1);
    localStorage.setItem("favoritesList", JSON.stringify(list));
    await dispatch(
      showToast({
        type: "success",
        message: "Removed from wishlist",
      })
    );
    return list;
  }
);

export const removeAll = createAsyncThunk(
  "wishlist/removeAll",
  async (_, { dispatch, getState }) => {
    const list = [...getState().wishlistReducer.list];
    list.splice(0, list.length);
    localStorage.setItem("favoritesList", JSON.stringify(list));
    await dispatch(
      showToast({
        type: "success",
        message: "Wishlist empty",
      })
    );
    return list;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    removeItem: (state, action) => {
      const index = state.list.findIndex((el) => action.payload?.id === el.id);
      state.list.splice(index, 1);
      state.message.content = "Removed from wishlist";
      state.message.type = "success";
      localStorage.setItem("favoritesList", JSON.stringify(state.list));
    },
    removeAll: (state) => {
      state.list.splice(0, state.length);
      state.message.content = "Wishlist empty";
      state.message.type = "success";
      localStorage.setItem("favoritesList", JSON.stringify(state.list));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.rejected, (state) => {
        state.errorMessage = "Something wrong";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(removeItem.rejected, (state) => {
        state.errorMessage = "Something wrong";
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(removeAll.rejected, (state) => {
        state.errorMessage = "Something wrong";
      })
      .addCase(removeAll.fulfilled, (state, action) => {
        state.list = action.payload;
      })
  },
});
const { reducer: wishlistReducer } = wishlistSlice;
export default wishlistReducer;

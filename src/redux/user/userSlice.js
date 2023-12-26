import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserByIdToken } from "api";
export const fetchUserByIdToken = createAsyncThunk("user/fetchUserByIdToken", async (idToken) => {
  const userData = await getUserByIdToken(idToken);
  return userData;
});
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByIdToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByIdToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserByIdToken.rejected, (state) => {
        state.loading = false;
        state.error = "";
      });
  },
});
const { reducer: userReducer, actions } = userSlice;
export const { loginSuccess, logOut } = actions;
export default userReducer;

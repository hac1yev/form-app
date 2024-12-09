import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import loadingSlice from "./loading-slice";
import postReducer from "./postSlice";

export const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    loadingReducer: loadingSlice.reducer,
    post: postReducer,
  },
});


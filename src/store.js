import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reucer/Reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

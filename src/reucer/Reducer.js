import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

export const userReducer = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    active_user: (state) => {
      return state;
    },
    delete_user: (state) => {
      localStorage.removeItem("userInfo");
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { active_user, delete_user } = userReducer.actions;

export default userReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (_s, action) => {
      blogService.setToken(action.payload.token);
      return action.payload;
    },
    resetUser: () => {
      blogService.setToken(null);
      return initialState;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  message: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    set: (_s, action) => action.payload,
    reset: () => initialState,
  },
});

export const { set, reset } = notificationSlice.actions;

export const showNotification = (type, message, timeout) => {
  return async (dispatch) => {
    dispatch(set({ type, message }));
    setTimeout(() => dispatch(reset()), timeout);
  };
};

export default notificationSlice.reducer;

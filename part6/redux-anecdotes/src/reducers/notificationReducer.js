import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return initialState
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const showNotification = (text, timeout) => async dispatch => {
  dispatch(setNotification(text))
  setTimeout(() => dispatch(removeNotification()), timeout)
}

export default notificationSlice.reducer
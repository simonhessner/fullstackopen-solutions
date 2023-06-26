import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload
    },
    resetFilter(state, action) {
      return initialState
    }
  }
})

export const { setFilter, resetFilter } = filterSlice.actions
export default filterSlice.reducer
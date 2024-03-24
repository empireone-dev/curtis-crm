import { createSlice } from '@reduxjs/toolkit'

export const ascsSlice = createSlice({
  name: 'asc',
  initialState: {
    asc: [],
  },
  reducers: {
    setAsc: (state, action) => {
      state.asc = action.payload
    },
  },
})
export const { setAsc } = ascsSlice.actions

export default ascsSlice.reducer

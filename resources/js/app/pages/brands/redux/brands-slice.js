import { createSlice } from '@reduxjs/toolkit'

export const brandsSlice = createSlice({
  name: 'brands',
  initialState: {
    brands: []
  },
  reducers: {
    setbrands: (state, action) => {
      state.brands = action.payload
    },
  },
})
export const { setbrands } = brandsSlice.actions

export default brandsSlice.reducer

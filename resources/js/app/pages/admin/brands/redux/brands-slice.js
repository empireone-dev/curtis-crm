import { createSlice } from '@reduxjs/toolkit'

export const brandsSlice = createSlice({
  name: 'brands',
  initialState: {
    brands: []
  },
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload
    },
  },
})
export const { setBrands } = brandsSlice.actions

export default brandsSlice.reducer

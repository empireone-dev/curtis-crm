import { createSlice } from '@reduxjs/toolkit'

export const brandsSlice = createSlice({
  name: 'brands',
  initialState: {
    brands: [],
    brandsForm: {}
  },
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload
    },
    setBrandsForm: (state, action) => {
      state.brandsForm = action.payload
    },
    resetBrands: (state, action) => {
      state.brands = action.payload
    },
  },
})
export const { setBrands, setBrandsForm, resetBrands } = brandsSlice.actions

export default brandsSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const productRegistrationSlice = createSlice({
  name: 'product_registration',
  initialState: {
    products: [],
    product:{}
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setProduct: (state, action) => {
      state.product = action.payload
    },
  },
})
export const { setProducts,setProduct } = productRegistrationSlice.actions

export default productRegistrationSlice.reducer

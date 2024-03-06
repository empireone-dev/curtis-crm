import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})
export const { setIsModalOpen } = productsSlice.actions

export default productsSlice.reducer

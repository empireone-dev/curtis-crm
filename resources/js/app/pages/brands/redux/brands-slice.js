import { createSlice } from '@reduxjs/toolkit'

export const brandsSlice = createSlice({
  name: 'brands',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})
export const { setIsModalOpen } = brandsSlice.actions

export default brandsSlice.reducer

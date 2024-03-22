import { createSlice } from '@reduxjs/toolkit'

export const bupSlice = createSlice({
  name: 'bup',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})
export const { setIsModalOpen } = bupSlice.actions

export default bupSlice.reducer

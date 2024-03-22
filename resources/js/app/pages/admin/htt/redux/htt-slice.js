import { createSlice } from '@reduxjs/toolkit'

export const httSlice = createSlice({
  name: 'htt',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})
export const { setIsModalOpen } = httSlice.actions

export default httSlice.reducer

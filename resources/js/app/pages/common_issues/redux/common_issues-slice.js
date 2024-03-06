import { createSlice } from '@reduxjs/toolkit'

export const commonissuesSlice = createSlice({
  name: 'commonissues',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})
export const { setIsModalOpen } = commonissuesSlice.actions

export default commonissuesSlice.reducer

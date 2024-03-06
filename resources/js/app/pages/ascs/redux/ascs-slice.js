import { createSlice } from '@reduxjs/toolkit'

export const ascsSlice = createSlice({
  name: 'ascs',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})
export const { setIsModalOpen } = ascsSlice.actions

export default ascsSlice.reducer

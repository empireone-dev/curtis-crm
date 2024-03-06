import { createSlice } from '@reduxjs/toolkit'

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})
export const { setIsModalOpen } = ticketsSlice.actions

export default ticketsSlice.reducer

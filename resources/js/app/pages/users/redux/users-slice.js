import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})
export const { setIsModalOpen } = usersSlice.actions

export default usersSlice.reducer

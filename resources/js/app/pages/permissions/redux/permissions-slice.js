import { createSlice } from '@reduxjs/toolkit'

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})
export const { setIsModalOpen } = permissionsSlice.actions

export default permissionsSlice.reducer

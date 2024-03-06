import { createSlice } from '@reduxjs/toolkit'

export const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})
export const { setIsModalOpen } = rolesSlice.actions

export default rolesSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isModalOpen: false,
    user:{}
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})
export const { setIsModalOpen,setUser } = appSlice.actions

export default appSlice.reducer

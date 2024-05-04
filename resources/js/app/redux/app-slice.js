import { createSlice } from '@reduxjs/toolkit'

const path = window.location.hash.substring(1); // Get the hash without the first character
const hash = path.split('&')[0];
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isModalOpen: false,
    user:{},
    hash:hash
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setHash: (state, action) => {
      state.hash = action.payload
    },
  },
})
export const { 
  setIsModalOpen,
  setUser,
  setHash
 } = appSlice.actions

export default appSlice.reducer

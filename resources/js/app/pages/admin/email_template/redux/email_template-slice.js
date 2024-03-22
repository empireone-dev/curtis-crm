import { createSlice } from '@reduxjs/toolkit'

export const email_templateSlice = createSlice({
  name: 'email_template',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})
export const { setIsModalOpen } = email_templateSlice.actions

export default email_templateSlice.reducer

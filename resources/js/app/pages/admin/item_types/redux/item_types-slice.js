import { createSlice } from '@reduxjs/toolkit'

export const item_typesSlice = createSlice({
  name: 'item_types',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
})
export const { setIsModalOpen } = item_typesSlice.actions

export default item_typesSlice.reducer

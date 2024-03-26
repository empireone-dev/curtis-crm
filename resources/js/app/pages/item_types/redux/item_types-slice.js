import { createSlice } from '@reduxjs/toolkit'

export const itemTypesSlice = createSlice({
  name: 'item_types',
  initialState: {
    item_types: [] 
  },
  reducers: {
    setItemTypes: (state, action) => {
      state.item_types = action.payload 
    },
  },
})

export const { setItemTypes } = itemTypesSlice.actions 

export default itemTypesSlice.reducer 

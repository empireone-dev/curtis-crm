import { createSlice } from '@reduxjs/toolkit'

export const itemTypesSlice = createSlice({
  name: 'item_types',
  initialState: {
    item_types: [],
    item_typesForm: {}
  },
  reducers: {
    setItemTypes: (state, action) => {
      state.item_types = action.payload
    },
    setItemTypesForm: (state, action) => {
      state.item_typesForm = action.payload
    },
    resetItemTypes: (state, action) => {
      state.item_types = action.payload
    },
  },
})

export const { setItemTypes, setItemTypesForm, resetItemTypes } = itemTypesSlice.actions

export default itemTypesSlice.reducer 

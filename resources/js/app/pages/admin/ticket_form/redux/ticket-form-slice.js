import { createSlice } from '@reduxjs/toolkit'

export const ticketFormSlice = createSlice({
  name: 'ticket_form',
  initialState: {
    form: {},
    products:[]
  },
  reducers: {
    setForm: (state, action) => {
      state.form = action.payload
    },
    setProducts: (state, action) => {
      state.products = action.payload
    },
  },
})
export const { 
  setForm,
  setProducts
 } = ticketFormSlice.actions

export default ticketFormSlice.reducer

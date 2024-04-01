import { createSlice } from '@reduxjs/toolkit'

export const customerTicketsSlice = createSlice({
  name: 'customer_tickets',
  initialState: {
    tickets: []
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload
    },
  },
})
export const { setTickets } = customerTicketsSlice.actions

export default customerTicketsSlice.reducer

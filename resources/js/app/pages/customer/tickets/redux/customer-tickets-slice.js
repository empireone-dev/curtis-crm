import { createSlice } from '@reduxjs/toolkit'

export const customerTicketsSlice = createSlice({
  name: 'customer_tickets',
  initialState: {
    tickets: [],
    ticket:{},
    filesData:[],
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload
    },
    setFilesData: (state, action) => {
      state.filesData = action.payload
    },
    setTicket: (state, action) => {
      state.ticket = action.payload
    },
  },
})
export const { 
  setTickets,
  setFilesData,
  setTicket } = customerTicketsSlice.actions

export default customerTicketsSlice.reducer

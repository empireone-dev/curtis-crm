import { createSlice } from '@reduxjs/toolkit'

export const ascTicketsSlice = createSlice({
  name: 'asc_tickets',
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
  setTicket } = ascTicketsSlice.actions

export default ascTicketsSlice.reducer

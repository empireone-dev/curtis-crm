import { createSlice } from '@reduxjs/toolkit'

export const wareHouseTicketsSlice = createSlice({
  name: 'warehouse_tickets',
  initialState: {
    tickets: [],
    ticket:{},
    filesData:[],
    exports:[]
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
    setExports: (state, action) => {
      state.exports = action.payload
    },
  },
})
export const { 
  setTickets,
  setFilesData,
  setTicket,
  setExports,
 } = wareHouseTicketsSlice.actions

export default wareHouseTicketsSlice.reducer

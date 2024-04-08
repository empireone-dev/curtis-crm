import { createSlice } from '@reduxjs/toolkit'

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    ticket:{},
    page:1,
    search:{
      id:null,
      page:1
    },
    activities:[],
    notes:[]
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
    setTicket: (state, action) => {
      state.ticket = action.payload
    },
    setActivities: (state, action) => {
      state.activities = action.payload
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
  },
})
export const { setTickets,
  setPage,
  setSearch,
  setTicket,
  setActivities,
  setNotes
 } = ticketsSlice.actions

export default ticketsSlice.reducer

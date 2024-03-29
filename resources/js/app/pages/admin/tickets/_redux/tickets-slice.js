import { createSlice } from '@reduxjs/toolkit'

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    page:1,
    search:{
      id:null,
      page:1
    }
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
  },
})
export const { setTickets,setPage,setSearch } = ticketsSlice.actions

export default ticketsSlice.reducer

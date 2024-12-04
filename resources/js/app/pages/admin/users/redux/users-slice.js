import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    cases_logs: [],
    customer_details_logs: [],
    search: {
      id: null,
      page: 1,
    },
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    set_cases_log: (state, action) => {
      state.cases_logs = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCustomerDetailsLogs: (state, action) => {
      state.customer_details_logs = action.payload;
    },
  },
})
export const { setUsers, set_cases_log, setSearch,setCustomerDetailsLogs } = usersSlice.actions

export default usersSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    cases_logs:[]
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    set_cases_log: (state, action) => {
      state.cases_logs = action.payload
    },
  },
})
export const { setUsers,set_cases_log } = usersSlice.actions

export default usersSlice.reducer

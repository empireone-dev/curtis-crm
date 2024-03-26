import { createSlice } from '@reduxjs/toolkit'

export const commonIssuesSlice = createSlice({
  name: 'common_issues',
  initialState: {
    common_issues: [] 
  },
  reducers: {
    setCommonIssues: (state, action) => {
      state.common_issues = action.payload 
    },
  },
})

export const { setCommonIssues } = commonIssuesSlice.actions 

export default commonIssuesSlice.reducer 

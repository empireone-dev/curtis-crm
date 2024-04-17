import { createSlice } from '@reduxjs/toolkit'

export const commonIssuesSlice = createSlice({
  name: 'common_issues',
  initialState: {
    common_issues: [],
    common_issuesForm: {}
  },
  reducers: {
    setCommonIssues: (state, action) => {
      state.common_issues = action.payload
    },
    setCommonIssuesForm: (state, action) => {
      state.common_issuesForm = action.payload
    },
    resetCommonIssues: (state, action) => {
      state.common_issues = action.payload
    },
  },
})

export const { setCommonIssues, setCommonIssuesForm, resetCommonIssues } = commonIssuesSlice.actions

export default commonIssuesSlice.reducer 

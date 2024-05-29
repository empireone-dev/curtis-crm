import { createSlice } from '@reduxjs/toolkit'

export const emailTemplatesSlice = createSlice({
  name: 'email_templates',
  initialState: {
    email_templates: []
  },
  reducers: {
    setEmailTemplates: (state, action) => {
      state.email_templates = action.payload
    },
  },
})

export const { setEmailTemplates } = emailTemplatesSlice.actions

export default emailTemplatesSlice.reducer 

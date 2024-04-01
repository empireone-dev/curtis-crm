import { createSlice } from '@reduxjs/toolkit'

export const ticketsCreateSlice = createSlice({
  name: 'tickets_create',
  initialState: {
    form: {
      isHasEmail:'true',
      country:'Canada',
      state:'Alberta'
    }
  },
  reducers: {
    setForm: (state, action) => {
      state.form = action.payload
    },
  },
})
export const { 
    setForm,
 } = ticketsCreateSlice.actions

export default ticketsCreateSlice.reducer

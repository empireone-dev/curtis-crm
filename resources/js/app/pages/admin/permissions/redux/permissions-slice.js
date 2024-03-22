import { createSlice } from '@reduxjs/toolkit'

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    permissions: []
  },
  reducers: {
    setPermissions: (state, action) => {
      state.permissions = action.payload
    },
  },
})
export const { 
  setPermissions
 } = permissionsSlice.actions

export default permissionsSlice.reducer

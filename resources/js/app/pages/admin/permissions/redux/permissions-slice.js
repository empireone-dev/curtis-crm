import { createSlice } from '@reduxjs/toolkit'

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    permissions: [],
    permissionsForm: {}
  },
  reducers: {
    setPermissions: (state, action) => {
      state.permissions = action.payload
    },
    setPermissionsForm: (state, action) => {
      state.permissionsForm = action.payload
    },
    resetPermissions: (state, action) => {
      state.permissions = action.payload
    },
  },
})
export const {
  setPermissions,
  resetPermissions,
  setPermissionsForm
} = permissionsSlice.actions

export default permissionsSlice.reducer

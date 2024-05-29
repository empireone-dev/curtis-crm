import { createSlice } from '@reduxjs/toolkit'

export const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    rolesForm: {}
  },
  reducers: {
    setRoles: (state, action) => {
      state.roles = action.payload
    },
    setRolesForm: (state, action) => {
      state.rolesForm = action.payload
    },
    resetRoles: (state, action) => {
      state.roles = action.payload
    },
  },
})
export const { setRoles, setRolesForm, resetRoles } = rolesSlice.actions

export default rolesSlice.reducer

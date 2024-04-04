import { delete_role_service, get_role_service } from '@/app/services/role-services';
import {rolesSlice} from './roles-slice';

export function get_roles_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_role_service()).data
     dispatch(rolesSlice.actions.setRoles(result));
  };
}

export function delete_roles_thunk(id) {
  return async function (dispatch, getState) {
    const result = await delete_role_service(id)
     dispatch(rolesSlice.actions.setRoles(result.data));
  };
}
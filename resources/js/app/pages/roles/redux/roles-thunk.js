import { get_role_service } from '@/app/services/role-service';
import {rolesSlice} from './roles-slice';

export function get_roles_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_role_service()).data
     dispatch(rolesSlice.actions.setRoles(result));
  };
}
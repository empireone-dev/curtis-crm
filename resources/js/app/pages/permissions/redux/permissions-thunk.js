import { get_permission_service } from '@/app/services/permission-service';
import {permissionsSlice} from './permissions-slice';

export function get_permission_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_permission_service()).data
     dispatch(permissionsSlice.actions.setPermissions(result));
  
  };
}

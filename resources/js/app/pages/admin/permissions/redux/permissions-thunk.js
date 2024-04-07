import { delete_permission_service, get_permission_service, update_permission_service } from '@/app/services/permission-services';
import { permissionsSlice } from './permissions-slice';

export function get_permission_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_permission_service()).data
    dispatch(permissionsSlice.actions.setPermissions(result));

  };
}

export function delete_permission_thunk(id) {
  return async function (dispatch, getState) {
    const result = await delete_permission_service(id)
    dispatch(permissionsSlice.actions.setPermissions(result.data));
  };
}

export function update_permission_thunk(data) {
  return async function (dispatch, getState) {

   const result = await update_permission_service(data)
   dispatch(permissionsSlice.actions.setPermissions(result.data));
  };
}


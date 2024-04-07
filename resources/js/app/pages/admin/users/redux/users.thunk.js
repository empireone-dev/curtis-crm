import { delete_users_service, get_users_service } from '@/app/services/user-service';
import { usersSlice } from './users-slice';

export function get_users_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_users_service()).data
    dispatch(usersSlice.actions.setUsers(result));
  };
}

export function delete_users_thunk(id) {
  return async function (dispatch, getState) {
    const result = await delete_users_service(id)
    dispatch(usersSlice.actions.setUsers(result.data));
  };
}



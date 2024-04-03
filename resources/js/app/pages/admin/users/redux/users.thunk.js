import { get_users_service } from '@/app/services/user-service';
import { usersSlice } from './users-slice';

export function get_users_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_users_service()).data
    dispatch(usersSlice.actions.setUsers(result));
  };
}




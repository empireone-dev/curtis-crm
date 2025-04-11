import { delete_users_service, get_user_by_role_service, get_users_service, update_users_service } from '@/app/services/user-service';
import { usersSlice } from './users-slice';

export function get_users_thunk(role_id) {
  return async function (dispatch, getState) {
    const result = (await get_users_service(role_id)).data
    dispatch(usersSlice.actions.setUsers(result));
  };
}


export function get_user_by_role_thunk(role_id) {
  return async function (dispatch, getState) {
    const result = (await get_user_by_role_service(role_id)).data
    console.log('result',result)
    dispatch(usersSlice.actions.setUsers(result));
  };
}

export function delete_users_thunk(id) {
  return async function (dispatch, getState) {
    const result = await delete_users_service(id)
    dispatch(usersSlice.actions.setUsers(result.data));
  };
}

export function update_users_thunk(data) {
  return async function (dispatch, getState) {

   const result = await update_users_service(data)
   dispatch(usersSlice.actions.setUsers(result.data));
  };
}

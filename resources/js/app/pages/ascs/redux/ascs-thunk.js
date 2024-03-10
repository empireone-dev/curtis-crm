import {ascsSlice} from './ascs-slice';
import { get_asc_service } from '@/app/services/product-search';

export function get_asc_thunk() {
  return async function (dispatch, getState) {
    const result = await get_asc_service()
    const asc = await result.map(res => ({
      region: res[0],
      name: res[2],
      zipcode: res[6],
      email: res[8],
      phone: res[7],
      login_email: res[4],
    }))
    asc.shift();
    dispatch(ascsSlice.actions.setAsc(asc));
  };
}

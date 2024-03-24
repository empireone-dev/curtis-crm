import { get_brands_service } from '@/app/services/brand-service';
import { brandsSlice } from './brands-slice';

export function get_brands_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_brands_service()).data
    dispatch(brandsSlice.actions.setbrands(result));
  };
}


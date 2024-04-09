import { delete_brand_service, get_brands_service, update_brand_service } from '@/app/services/brand-service';
import { brandsSlice } from './brands-slice';
import { update_permission_service } from '@/app/services/permission-services';

export function get_brands_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_brands_service()).data
    dispatch(brandsSlice.actions.setBrands(result));
  };
}

export function delete_brands_thunk(id) {
  return async function (dispatch, getState) {
    const result = await delete_brand_service(id)
    dispatch(brandsSlice.actions.setBrands(result.data));
  };
}

export function update_brands_thunk(data) {
  return async function (dispatch, getState) {

   const result = await update_brand_service(data)
   dispatch(brandsSlice.actions.setBrands(result.data));
  };
}
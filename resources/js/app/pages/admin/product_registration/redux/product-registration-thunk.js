
import { get_product_registration_by_id_service, get_product_registration_service } from '@/app/services/product-registration-service';
import {productRegistrationSlice} from './product-registration-slice';

export function get_product_registration_thunk() {
  return async function (dispatch, getState) {
   const res = await get_product_registration_service()
    dispatch(productRegistrationSlice.actions.setProducts(res));
  };
}

export function get_product_registration_by_id_thunk() {
  return async function (dispatch, getState) {
   const res = await get_product_registration_by_id_service()
    dispatch(productRegistrationSlice.actions.setProduct(res));
  };
}

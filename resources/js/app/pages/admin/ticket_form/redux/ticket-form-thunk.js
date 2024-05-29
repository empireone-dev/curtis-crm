
import {ticketFormSlice} from './ticket-form-slice';
import { get_products_service } from '@/app/services/product-search';

export function get_products_thunk() {
  return async function (dispatch, getState) {
    const result = await get_products_service()
    dispatch(ticketFormSlice.actions.setProducts(result));
  };
}
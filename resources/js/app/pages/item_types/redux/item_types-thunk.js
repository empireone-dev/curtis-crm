
import { get_item_types_service } from '@/app/services/item-type-service';
import { setItemTypes } from './item_types-slice'; 

export function get_item_types_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_item_types_service()).data
    dispatch(setItemTypes(result)); 
  };
}

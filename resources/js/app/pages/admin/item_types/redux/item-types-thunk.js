import { itemTypesSlice,  setItemTypes } from "./item-types-slice";
import { delete_item_types_service, get_item_types_service, store_item_types_service, update_item_types_service } from '@/app/services/item-type-services';

export function store_item_types_thunk(data) {
  return async function (dispatch, getState) {
    const result = await store_item_types_service(data)
    dispatch(itemTypesSlice.actions.setItemTypes(result.data));
    dispatch(itemTypesSlice.actions.setItemTypesForm({}));
  };
}

export function get_item_types_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_item_types_service()).data
    dispatch(setItemTypes(result)); 
  };
}

export function delete_item_types_thunk(id) {
  return async function (dispatch, getState) {
    const result = await delete_item_types_service(id)
    dispatch(itemTypesSlice.actions.setItemTypes(result.data));
  };
}

export function update_item_types_thunk(data) {
  return async function (dispatch, getState) {

   const result = await update_item_types_service(data)
   dispatch(itemTypesSlice.actions.setItemTypes(result.data));
  };
}
import item_typesSlice from './item_types-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(item_typesSlice.actions.incrementByAmount(10));
  
  };
}

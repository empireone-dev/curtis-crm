import permissionsSlice from './permissions-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(permissionsSlice.actions.incrementByAmount(10));
  
  };
}

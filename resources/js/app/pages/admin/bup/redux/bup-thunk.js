import bupSlice from './bup-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(bupSlice.actions.incrementByAmount(10));
  
  };
}

import ascsSlice from './ascs-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(ascsSlice.actions.incrementByAmount(10));
  
  };
}

import httSlice from './htt-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(httSlice.actions.incrementByAmount(10));
  
  };
}

import userSlice from './user-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(userSlice.actions.incrementByAmount(10));
  
  };
}

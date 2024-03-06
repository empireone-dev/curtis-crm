import brandsSlice from './brands-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(brandsSlice.actions.incrementByAmount(10));
  
  };
}

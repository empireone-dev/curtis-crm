import productsSlice from './products-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(productsSlice.actions.incrementByAmount(10));
  
  };
}

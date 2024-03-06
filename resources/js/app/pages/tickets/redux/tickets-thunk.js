import ticketsSlice from './tickets-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(ticketsSlice.actions.incrementByAmount(10));
  
  };
}

import dashboardSlice from './dashboard-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(dashboardSlice.actions.incrementByAmount(10));
  
  };
}

import rolesSlice from './roles-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(rolesSlice.actions.incrementByAmount(10));
  
  };
}

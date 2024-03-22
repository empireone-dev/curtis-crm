import email_templateSlice from './email_template-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(email_templateSlice.actions.incrementByAmount(10));
  
  };
}

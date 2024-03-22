import common_issuesSlice from './common_issues-slice';

export function addCartProducts(product_id) {
  return async function (dispatch, getState) {
    dispatch(common_issuesSlice.actions.incrementByAmount(10));
  
  };
}

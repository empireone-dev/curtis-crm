import { commonIssuesSlice,  setCommonIssues } from "./common-issues-slice";
import { delete_common_issues_service, get_common_issues_service, update_common_issues_service } from '@/app/services/common-issue-services';


export function get_common_issues_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_common_issues_service()).data
    dispatch(setCommonIssues(result)); 
  };
}

export function delete_common_issues_thunk(id) {
  return async function (dispatch, getState) {
    const result = await delete_common_issues_service(id)
    dispatch(commonIssuesSlice.actions.setCommonIssues(result.data));
  };
}

export function update_common_issues_thunk(data) {
  return async function (dispatch, getState) {

   const result = await update_common_issues_service(data)
   dispatch(commonIssuesSlice.actions.setCommonIssues(result.data));
  };
}
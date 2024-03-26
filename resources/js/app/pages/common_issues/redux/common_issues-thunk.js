

import { get_common_issues_service } from '@/app/services/common-issue-services';
import { setCommonIssues } from './common_issues-slice';

export function get_common_issues_thunk() {
  return async function (dispatch, getState) {
    const result = (await get_common_issues_service()).data
    dispatch(setCommonIssues(result)); 
  };
}

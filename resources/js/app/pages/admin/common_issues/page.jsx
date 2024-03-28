import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React, { useEffect } from 'react'
import store from '@/app/store/store';
import { get_common_issues_thunk } from './redux/common-issues-thunk';
import CommonIssueTableSection from './sections/common-issues-table-section';

export default function CommonIssuesPage() {
  useEffect(() => {
    store.dispatch(get_common_issues_thunk())
  }, []);
  return (
    <AdministratorLayout>
      <CommonIssueTableSection/>
    </AdministratorLayout>
  )
}

import AdministratorLayout from '@/app/layouts/administrator-layout'
import React, { useEffect } from 'react'
import PermissionTableSection from './sections/permission-table-section'
import store from '@/app/store/store';
import { get_permission_thunk } from './redux/permissions-thunk';

export default function PermissionPage() {

  useEffect(() => {
    store.dispatch(get_permission_thunk())
  }, []);
  return (
    <AdministratorLayout>
      <PermissionTableSection />
    </AdministratorLayout>
  )
}

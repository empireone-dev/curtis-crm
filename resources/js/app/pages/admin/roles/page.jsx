import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React, { useEffect } from 'react'
import store from '@/app/store/store';
import { get_roles_thunk } from './redux/roles-thunk';
import RolesTableSection from './sections/role-table-section';

export default function RolesPage() {

  useEffect(() => {
    store.dispatch(get_roles_thunk())
  }, []);
  return (
    <AdministratorLayout>
      <RolesTableSection />
    </AdministratorLayout>
  )
}

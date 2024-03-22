import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React, { useEffect } from 'react'
import RolesTableSection from './sections/roles-table-section'
import store from '@/app/store/store';
import { get_roles_thunk } from './redux/roles-thunk';

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

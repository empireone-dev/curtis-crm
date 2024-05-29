import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React, { useEffect } from 'react'
import UsersTableSection from './sections/users-table-section'
import store from '@/app/store/store';
import { get_users_thunk } from './redux/users.thunk';

export default function UsersPage() {

  useEffect(() => {
    store.dispatch(get_users_thunk(5))
  }, []);
  return (
    <AdministratorLayout>
      <UsersTableSection />
    </AdministratorLayout>
  )
}

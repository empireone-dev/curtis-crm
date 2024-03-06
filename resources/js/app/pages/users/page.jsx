import AdministratorLayout from '@/app/layouts/administrator-layout'
import React from 'react'
import UsersTableSection from './sections/users-table-section'

export default function UsersPage() {
  return (
    <AdministratorLayout>
      <UsersTableSection />
    </AdministratorLayout>
  )
}

import AdministratorLayout from '@/app/layouts/administrator-layout'
import React from 'react'
import PermissionTableSection from './sections/permission-table-section'

export default function PermissionPage() {
  return (
    <AdministratorLayout>
      <PermissionTableSection />
    </AdministratorLayout>
  )
}

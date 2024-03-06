import AdministratorLayout from '@/app/layouts/administrator-layout'
import React from 'react'
import RolesTableSection from './sections/roles-table-section'

export default function RolesPage() {
  return (
    <AdministratorLayout>
      <RolesTableSection />
    </AdministratorLayout>
  )
}

import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React from 'react'
import ItemtypeTableSection from './sections/itemtypes-table-section'

export default function ItemTypesPage() {
  return (
    <AdministratorLayout>
      <ItemtypeTableSection/>
    </AdministratorLayout>
  )
}

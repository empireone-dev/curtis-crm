import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React from 'react'
import CommonissueTableSection from './sections/commonissues-table-section'

export default function CommonIssuesPage() {
  return (
    <AdministratorLayout>
      <CommonissueTableSection/>
    </AdministratorLayout>
  )
}

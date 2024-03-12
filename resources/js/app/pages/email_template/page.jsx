import AdministratorLayout from '@/app/layouts/administrator-layout'
import React from 'react'
import EmailtemplateTableSection from './sections/emailtemplate-table-section'

export default function EmailTemplatePage() {
  return (
    <AdministratorLayout>
      <EmailtemplateTableSection/>
    </AdministratorLayout>
  )
}

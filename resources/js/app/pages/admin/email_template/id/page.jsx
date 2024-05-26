import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React from 'react'
import EditEmailTemplateSection from './sections/edit-email-template-section'

export default function EmailTemplateEmailPage() {
  return (
    <AdministratorLayout>
        <EditEmailTemplateSection />
    </AdministratorLayout>
  )
}

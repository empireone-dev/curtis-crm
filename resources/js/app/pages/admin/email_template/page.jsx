import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React, { useEffect } from 'react'
import EmailtemplateTableSection from './sections/email-template-table-section'
import { get_email_templates_thunk } from './redux/email-template-thunk';
import store from '@/app/store/store';

export default function EmailTemplatePage() {
  useEffect(() => {
    store.dispatch(get_email_templates_thunk())
  }, []);
  return (
    <AdministratorLayout>
      <EmailtemplateTableSection/>
    </AdministratorLayout>
  )
}

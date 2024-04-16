import React, { useEffect } from 'react'
import ValidationFormSection from './sections/validation-form-section'
import store from '@/app/store/store';
import { get_email_templates_thunk } from '@/app/pages/admin/email_template/redux/email-template-thunk';

export default function TicketsPartsValidationContent() {

  useEffect(() => {
    store.dispatch(get_email_templates_thunk())
  }, []);
  return (
    <div>
      
      <ValidationFormSection />
    </div>
  )
}

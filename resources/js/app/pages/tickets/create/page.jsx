import AdministratorLayout from '@/app/layouts/administrator-layout'
import React from 'react'
import TicketFormSection from '../../ticket_form/sections/ticket-form-section'

export default function TicketCreatePage() {
  return (
    <AdministratorLayout>
    <div className='my-3'>
    <TicketFormSection />
    </div>
  </AdministratorLayout>
  )
}

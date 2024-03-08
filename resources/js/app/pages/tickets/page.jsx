import AdministratorLayout from '@/app/layouts/administrator-layout'
import React from 'react'
import TicketTableSection from './sections/tickets-table-section'

export default function TicketsPage() {
  return (
    <AdministratorLayout>
      <TicketTableSection />
    </AdministratorLayout>
  )
}

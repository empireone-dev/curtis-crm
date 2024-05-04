import AdminLayout from '@/app/admin/admin-layout'
import React from 'react'
import TicketsDetailsTabsComponent from './components/tickets-details-tabs-component'

export default function TicketDetailsPage() {
  return (
    <AdminLayout>
      <TicketsDetailsTabsComponent />
    </AdminLayout>
  )
}

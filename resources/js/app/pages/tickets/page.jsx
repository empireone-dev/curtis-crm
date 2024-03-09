import AdministratorLayout from '@/app/layouts/administrator-layout'
import React, { useEffect } from 'react'
import TicketTableSection from './_sections/tickets-table-section'
import store from '@/app/store/store';
import { get_tickets_thunk } from './_redux/tickets-thunk';
import { usePage } from '@inertiajs/react';

export default function TicketsPage() {
  const {url} = usePage()

  useEffect(() => {
    store.dispatch(get_tickets_thunk(url.split('=')[1]))
  }, [url]);
  return (
    <AdministratorLayout>
      <TicketTableSection />
    </AdministratorLayout>
  )
}

import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React, { useEffect } from 'react'
import TicketTableSection from './_sections/tickets-table-section'
import store from '@/app/store/store';
import { get_tickets_thunk } from './_redux/tickets-thunk';
import { usePage } from '@inertiajs/react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from './_redux/tickets-slice';

export default function TicketsPage() {
  
  const { search } = useSelector((state) => state.tickets)
  useEffect(() => {
    store.dispatch(get_tickets_thunk())
  }, [search.page??'']);
  
  return (
    <AdministratorLayout>
      <TicketTableSection />
    </AdministratorLayout>
  )
}

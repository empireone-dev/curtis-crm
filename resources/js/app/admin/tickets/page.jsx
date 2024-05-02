import React, { useEffect } from 'react'
import AdminLayout from '../admin-layout'
import TicketTableComponent from './components/ticket-table-component'
import { useSelector } from 'react-redux';
import store from '@/app/store/store';
import { get_tickets_thunk } from '@/app/pages/admin/tickets/_redux/tickets-thunk';

export default function TicketsPage() {

  const { search } = useSelector((state) => state.tickets)
  
  useEffect(() => {
    store.dispatch(get_tickets_thunk())
  }, [search.page??'']);
  return (
    <AdminLayout>
      <TicketTableComponent />
    </AdminLayout>
  )
}

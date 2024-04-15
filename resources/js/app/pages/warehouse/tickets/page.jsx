import WarehouseLayout from '@/app/layouts/warehouse/warehouse-layout'
import React, { useEffect } from 'react'
import WarehouseTicketsTableSection from './sections/warehouse-tickets-table-section'
import { get_tickets_by_warehouse_thunk } from './redux/warehouse-tickets-thunk';
import store from '@/app/store/store';

export default function WarehouseTicketPage({ auth }) {
  const account = auth.user
  useEffect(() => {
      const country = account.name.split(' ')[0]
      store.dispatch(get_tickets_by_warehouse_thunk(country))
  }, []);
  return (
    <div>
      <WarehouseLayout
        account={account}
      >
        <WarehouseTicketsTableSection />
      </WarehouseLayout>
    </div>
  )
}

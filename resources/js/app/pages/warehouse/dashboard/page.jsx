import WarehouseLayout from '@/app/layouts/warehouse/warehouse-layout'
import store from '@/app/store/store';
import React, { useEffect } from 'react'
import { get_tickets_by_user_id_thunk } from '../../customer/tickets/redux/customer-tickets-thunk';

export default function WarehouseDashboardPage({ auth }) {

    const account = auth.user

  
    return (
        <WarehouseLayout
            account={account}
        >
            WarehouseDashboardPage
        </WarehouseLayout>
    )
}

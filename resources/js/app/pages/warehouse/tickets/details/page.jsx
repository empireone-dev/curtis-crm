import WarehouseLayout from '@/app/layouts/warehouse/warehouse-layout'
import TicketsDetailsTabSection from '@/app/pages/admin/tickets/details/sections/tickets-details-tab-section'
import React from 'react'

export default function WareHouseDetailsPage({ auth }) {
    
    const account = auth.user
    return (
        <WarehouseLayout
            account={account}
        >
              <TicketsDetailsTabSection 
              account={account}
              />
         
        </WarehouseLayout>
    )
}
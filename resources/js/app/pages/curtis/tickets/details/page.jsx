import CustomerLayout from '@/app/layouts/customer/customer-layout'
import React from 'react'
import TicketsDetailsMoveAssignSection from '@/app/pages/admin/tickets/details/sections/tickets-details-move-assign-section,'
import TicketsDetailsTabSection from '@/app/pages/admin/tickets/details/sections/tickets-details-tab-section'

export default function CustomerDetailsPage({ auth }) {
    
    const account = auth.user
    return (
        <CustomerLayout
            account={account}
        >
             <div className='mr-3 py-6'>
                <TicketsDetailsMoveAssignSection />
                <TicketsDetailsTabSection />
            </div>
        </CustomerLayout>
    )
}

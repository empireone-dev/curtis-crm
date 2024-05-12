import CustomerLayout from '@/app/layouts/customer/customer-layout'
import React from 'react'
import TicketsDetailsFormSection from './sections/tickets-details-form-section'

export default function CustomerDetailsPage({ auth }) {
    
    const account = auth.user
    return (
        <CustomerLayout
            account={account}
        >
            <div className='my-8 flex flex-col items-center justify-center '>
               <TicketsDetailsFormSection />
            </div>
        </CustomerLayout>
    )
}

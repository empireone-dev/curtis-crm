import AdministratorLayout from '@/app/layouts/administrator-layout'
import React from 'react'
import TicketCreateFormSection from './sections/tickets-create-form-section'

export default function TicketCreatePage() {
    return (
        <AdministratorLayout>
            <div className='my-3'>
                <TicketCreateFormSection />
            </div>
        </AdministratorLayout>
    )
}

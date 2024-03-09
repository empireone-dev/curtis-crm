import AdministratorLayout from '@/app/layouts/administrator-layout'
import React from 'react'
import TicketsDetailsTabSection from './sections/tickets-details-tab-section'

export default function TicketsDetailsPage() {
    return (
        <AdministratorLayout>
            <div className='mr-3'>
                <TicketsDetailsTabSection />
            </div>
        </AdministratorLayout>
    )
}

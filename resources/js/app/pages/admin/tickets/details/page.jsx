import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React from 'react'
import TicketsDetailsTabSection from './sections/tickets-details-tab-section'
import TicketsDetailsMoveAssignSection from './sections/tickets-details-move-assign-section,'

export default function TicketsDetailsPage() {
    return (
        <AdministratorLayout>
            <div className='mr-3 py-6'>
                <TicketsDetailsMoveAssignSection />
                <TicketsDetailsTabSection />
            </div>
        </AdministratorLayout>
    )
}

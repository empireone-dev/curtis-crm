import React from 'react'
import TicketsDetailsMoveAssignSection from '@/app/pages/admin/tickets/details/sections/tickets-details-move-assign-section,'
import TicketsDetailsTabSection from '@/app/pages/admin/tickets/details/sections/tickets-details-tab-section'
import AgentLayout from '@/app/layouts/agent/agent-layout'

export default function AgentDetailsPage({ auth }) {
    
    const account = auth.user
    return (
        <AgentLayout
            account={account}
        >
             <div className='mr-3 py-6'>
                <TicketsDetailsMoveAssignSection />
                <TicketsDetailsTabSection />
            </div>
        </AgentLayout>
    )
}

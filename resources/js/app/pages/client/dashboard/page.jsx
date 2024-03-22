
import ClientLayout from '@/app/layouts/client/client-layout'
import React from 'react'
import ClientCardsSection from './sections/client-card-section'

export default function ClientDashboardPage({auth}) {
    const account = auth.user
    return (
        <ClientLayout
        account={account}
        >
            <ClientCardsSection />
        </ClientLayout>
    )
}

import React from 'react'
import ClientCardsSection from './sections/customer-card-section'
import CurtisLayout from '@/app/layouts/curtis/curtis-layout'

export default function CustomerDashboardPage({auth}) {
    const account = auth.user
    return (
        <CurtisLayout
        account={account}
        >
            <ClientCardsSection
            account={account}
            />
        </CurtisLayout>
    )
}

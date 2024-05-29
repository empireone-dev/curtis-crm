
import CustomerLayout from '@/app/layouts/customer/customer-layout'
import React from 'react'
import ClientCardsSection from './sections/customer-card-section'

export default function CustomerDashboardPage({auth}) {
    const account = auth.user
    return (
        <CustomerLayout
        account={account}
        >
            <ClientCardsSection
            account={account}
            />
        </CustomerLayout>
    )
}

import CustomerLayout from '@/app/layouts/customer/customer-layout'
import React from 'react'

export default function CustomerTicketsPage({auth}) {
 const account = auth.user
    return (
        <CustomerLayout
        account={account}
        >
            ClientTicketsPage
        </CustomerLayout>
    )
}

import ClientLayout from '@/app/layouts/client/client-layout'
import React from 'react'

export default function ClientTicketsPage({auth}) {
 const account = auth.user
    return (
        <ClientLayout
        account={account}
        >
            ClientTicketsPage
        </ClientLayout>
    )
}

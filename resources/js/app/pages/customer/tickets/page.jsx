import CustomerLayout from '@/app/layouts/customer/customer-layout'
import React from 'react'

export default function CustomerTicketsPage({auth}) {
 const account = auth.user
    return (
        <CustomerLayout
        account={account}
        >ss
            <img src="https://curtis-crm.s3.amazonaws.com/images/Hk6jbCU58aOSdGkaMX1x65tuoGnA8AIugwoOHrJV.png" />
        </CustomerLayout>
    )
}

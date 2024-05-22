import CustomerLayout from '@/app/layouts/customer/customer-layout'
import React, { useEffect } from 'react'
import CustomerTicketsTableSection from './sections/customer-tickets-table-section'
import store from '@/app/store/store';
import { get_tickets_by_email_thunk } from '../../agent/tickets/redux/customer-tickets-thunk';

export default function CustomerTicketsPage({ auth }) {
    const account = auth.user

    useEffect(() => {
     store.dispatch(get_tickets_by_email_thunk(account.email))
    }, []);
    
    return (
        <CustomerLayout
            account={account}
        >
           <div className='my-8'>
           <CustomerTicketsTableSection 
            
            />
           </div>
        </CustomerLayout>
    )
}

import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React, { useEffect, useState } from 'react'
import TicketsDetailsTabSection from './sections/tickets-details-tab-section'
import TicketsDetailsMoveAssignSection from './sections/tickets-details-move-assign-section,'
import store from '@/app/store/store';
import { get_tickets_by_ticket_id } from '@/app/services/tickets-service';
import { setTicket } from '../_redux/tickets-slice';
import { setFilesData } from '@/app/pages/customer/tickets/redux/customer-tickets-slice';
import { usePage } from '@inertiajs/react';
import { get_upload_ticket_files_thunk } from '@/app/pages/customer/tickets/redux/customer-tickets-thunk';
import { useDispatch } from 'react-redux';

export default function TicketsDetailsPage() {

    // const { url } = usePage()
    const [loading, setLoading] = useState(true)
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const res = await store.dispatch(get_upload_ticket_files_thunk(url.split('/')[url.split('/').length - 1].split('#')[0]));
    //         const ress = await get_tickets_by_ticket_id(url.split('/')[url.split('/').length - 1].split('#')[0])
    //         dispatch(setTicket(ress))
    //         dispatch(setFilesData(res))
    //         setLoading(false)
    //       } catch (error) {
    //         setLoading(false)
    //         console.error('Error fetching data:', error);
    //       }
    //     };
    //     fetchData();
    //   }, [url]);
    return (
        <AdministratorLayout>
            <div className='mr-3 py-6'>
                <TicketsDetailsMoveAssignSection />
                <TicketsDetailsTabSection 
                loading={loading}
                />
            </div>
        </AdministratorLayout>
    )
}

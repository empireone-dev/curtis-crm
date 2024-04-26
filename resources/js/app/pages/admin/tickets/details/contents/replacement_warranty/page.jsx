import React, { useEffect } from 'react'
import ContentReplacementWarrantyForm from './sections/content-replacement-warranty-form'
import store from '@/app/store/store';
import { get_internals_by_ticket_id_thunk } from '../../../_redux/tickets-thunk';

export default function ReplacementWarrantyPage() {
    useEffect(() => {
        store.dispatch(get_internals_by_ticket_id_thunk())
    }, []);
    return (
        <div>
            <ContentReplacementWarrantyForm />
        </div>
    )
}

import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React, { useEffect } from 'react'
import EditTicketFormSection from './sections/edit-ticket-form-section'
import store from '@/app/store/store';
import { useDispatch } from 'react-redux';
import { get_common_issues_thunk } from '@/app/pages/admin/common_issues/redux/common-issues-thunk';

export default function DetailsEditTicket() {

    useEffect(() => {
        store.dispatch(get_common_issues_thunk())
    }, []);
    
  return (
    <AdministratorLayout>
        <EditTicketFormSection />
    </AdministratorLayout>
  )
}

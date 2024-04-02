import AdministratorLayout from '@/app/layouts/admin/administrator-layout'
import React from 'react'
import TicketCreateFormSection from './sections/tickets-create-form-section'
import store from '@/app/store/store'
import { get_common_issues_thunk } from '../../common_issues/redux/common-issues-thunk'

export default function TicketCreatePage() {

    store.dispatch(get_common_issues_thunk())
    return (
        <AdministratorLayout>
            <div className='my-3'>
                <TicketCreateFormSection />
            </div>
        </AdministratorLayout>
    )
}

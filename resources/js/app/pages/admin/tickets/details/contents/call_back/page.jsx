import React, { useEffect } from 'react'
import CallBackFormSection from './sections/call-back-form-section'
import { get_internals_by_ticket_id_thunk } from '../../../_redux/tickets-thunk';
import store from '@/app/store/store';

export default function ContentsCallBackPage() {

  useEffect(() => {
    store.dispatch(get_internals_by_ticket_id_thunk())
}, []);
  return (
    <div>
      <CallBackFormSection />
    </div>
  )
}
 
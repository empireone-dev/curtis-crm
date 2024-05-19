import React, { useEffect } from 'react'
import InternalsAvailabilitySection from './sections/internals-availability-section'
import { get_internals_by_ticket_id_thunk } from '../../../_redux/tickets-thunk';
import store from '@/app/store/store';

export default function TicketsPartsInternalsContent() {

  useEffect(() => {
    store.dispatch(get_internals_by_ticket_id_thunk())
}, []);
  return (
    <div>
        <InternalsAvailabilitySection />
    </div>
  )
}

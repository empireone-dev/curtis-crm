import React, { useEffect } from 'react'
import ContentReplacementPartsForm from './sections/content-replacement-form'
import store from '@/app/store/store';
import { get_internals_by_ticket_id_thunk } from '../../../_redux/tickets-thunk';

export default function ContentsReplacementPartsPage() {

  useEffect(() => {
    store.dispatch(get_internals_by_ticket_id_thunk())
}, []);
  return (
    <div>
      <ContentReplacementPartsForm/>
    </div>
  )
}

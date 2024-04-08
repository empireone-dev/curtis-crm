import React, { useEffect } from 'react'
import ContentNotesCommentSection from './sections/content-notes-comment-section'
import ContentNotesTextareaSection from './sections/content-notes-textarea-section'
import store from '@/app/store/store';
import { get_notes_by_id_thunk } from '../../../_redux/tickets-thunk';
import { useSelector } from 'react-redux'
export default function TicketsDetailsContentNotes() {
  const { ticket } = useSelector((state) => state.customer_tickets);
  useEffect(() => {
    store.dispatch(get_notes_by_id_thunk())
  }, [ticket.id]);
  return (
    <div className='mx-3'>
      <ContentNotesTextareaSection />
      <ContentNotesCommentSection />
    </div>
  )
}

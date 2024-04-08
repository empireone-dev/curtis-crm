import React, { useEffect } from 'react'
import ContentNotesCommentSection from './sections/content-notes-comment-section'
import ContentNotesTextareaSection from './sections/content-notes-textarea-section'
import store from '@/app/store/store';
import { get_notes_by_id_thunk } from '../../../_redux/tickets-thunk';

export default function TicketsDetailsContentNotes() {

  useEffect(() => {
    store.dispatch(get_notes_by_id_thunk())
  }, []);
  return (
    <div className='mx-3'>
      <ContentNotesTextareaSection />
      <ContentNotesCommentSection />
    </div>
  )
}

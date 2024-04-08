import React, { useEffect } from 'react'
import ContentActivitiesTimelineSection from './sections/content-activities-timeline-section'
import store from '@/app/store/store';
import { get_activities_by_id_thunk } from '../../../_redux/tickets-thunk';
import { useSelector } from 'react-redux';

export default function TicketsDetailsContentActivities() {
  const { ticket } = useSelector((state) => state.customer_tickets);
  useEffect(() => {
    store.dispatch(get_activities_by_id_thunk())
  }, [ticket.id]);
  return (
    <div>
      <ContentActivitiesTimelineSection />
    </div>
  )
}

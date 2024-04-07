import React, { useEffect } from 'react'
import ContentActivitiesTimelineSection from './sections/content-activities-timeline-section'
import store from '@/app/store/store';
import { get_activities_by_id_thunk } from '../../../_redux/tickets-thunk';

export default function TicketsDetailsContentActivities() {
  useEffect(() => {
    store.dispatch(get_activities_by_id_thunk())
  }, []);
  return (
    <div>
      <ContentActivitiesTimelineSection />
    </div>
  )
}

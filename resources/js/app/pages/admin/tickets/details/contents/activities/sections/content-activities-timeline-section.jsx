import { UserCircleIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import React from 'react'
import { useSelector } from 'react-redux';

export default function ContentActivitiesTimelineSection() {
    const { activities } = useSelector((state) => state.tickets);

    return (
        <ol className="relative border-s border-gray-200 mx-3">
            {activities.map((res, i) => {
                // Format the timestamp of the activity
                const formattedTimestamp = moment(res.created_at).fromNow();
                
                return (
                    <li key={i} className="mb-10 ms-6">
                        <UserCircleIcon className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white" />
                        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{res.user.name}
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded ms-3">
                                {formattedTimestamp}
                            </span>
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400">Created on {moment(res.created_at).format('LLL')}</time>
                        <p className="mb-4 text-base font-normal text-gray-500">{res.message}</p>
                     </li>
                )
            })}
        </ol>
    )
}

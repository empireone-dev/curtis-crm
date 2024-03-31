import React from 'react'
import TicketsDetailsMoveAssignComponents from '../components/tickets-details-move-assign-components'
import { ArrowsRightLeftIcon, BanknotesIcon, CheckBadgeIcon, InboxStackIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'

export default function TicketsDetailsMoveAssignSection() {
  return (
    <div className='flex gap-3 mb-4'>
        <TicketsDetailsMoveAssignComponents 
        name="MOVE TO RESOURCE"
        icon={<InboxStackIcon className='h-6'/>}
        
        />
         <TicketsDetailsMoveAssignComponents 
        name="MOVE TO REPAIR"
        icon={<WrenchScrewdriverIcon className='h-6'/>}
        />
         <TicketsDetailsMoveAssignComponents 
        name="MOVE TO REFUND"
        icon={<BanknotesIcon className='h-6'/>}
        />
         <TicketsDetailsMoveAssignComponents 
        name="MOVE TO REPLACEMENT"
        icon={<ArrowsRightLeftIcon className='h-6'/>}
        />
         <TicketsDetailsMoveAssignComponents 
        name="MOVE TO VALIDATION"
        icon={<CheckBadgeIcon className='h-6'/>}
        />
    </div>
  )
}

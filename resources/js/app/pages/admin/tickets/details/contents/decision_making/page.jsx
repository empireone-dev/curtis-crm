import React from 'react'
import ReplacementSection from './sections/replacement-section'
import RefundSection from './sections/refund-section'
import RepairSection from './sections/repair-section'

export default function TicketsDecisionMakingContent() {
  return (
    <div>
      <RepairSection/>
      <div className='mt-7'>
      <RefundSection/>
      </div>
      <div className='mt-7'>
      <ReplacementSection/>
      </div>
    </div>
  )
}

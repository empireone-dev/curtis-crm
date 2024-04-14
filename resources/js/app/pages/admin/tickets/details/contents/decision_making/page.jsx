import React, { useEffect, useState } from 'react'
import ReplacementSection from './sections/replacement-section'
import RefundSection from './sections/refund-section'
import RepairSection from './sections/repair-section'
import { get_specific_item_service } from '@/app/services/product-search';
import { useDispatch, useSelector } from 'react-redux';
import { setTicket } from '../../../_redux/tickets-slice';

export default function TicketsDecisionMakingContent() {

  const { ticket } = useSelector((state) => state.tickets);
  const dispatch = useDispatch()
  async function get_specific_item() {
    const result = await get_specific_item_service(ticket)
    await dispatch(setTicket({
      ...ticket,
      product: result
    }))
  }

  useEffect(() => {
    get_specific_item()
  }, []);
  return (
    <div>
      <RepairSection />
      <div className='mt-7'>
        <RefundSection />
      </div>
      <div className='mt-7'>
        <ReplacementSection />
      </div>
    </div>
  )
}

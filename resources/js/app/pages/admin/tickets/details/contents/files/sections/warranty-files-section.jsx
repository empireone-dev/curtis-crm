import React, { useEffect } from 'react'
import CustomerTicketsBillOfSaleSection from './customer-tickets-bill-of-sale-section'
import CustomerTicketsFrontOfTheUnitSection from './customer-tickets-front-of-the-unit-section'
import CustomerTicketsRearOfTheUnitSection from './customer-tickets-rear-of-the-unit-section'
import CustomerTicketsReadableSerialSection from './customer-tickets-readable-serial-section'
import CustomerTicketsDefectIssueSection from './customer-tickets-defect-issue-section'
import CustomerTicketsClearModel from './customer-tickets-clear-model'
import CustomerTicketsPartsModel from './customer-tickets-parts-model'
import CustomerTicketsReceiptModel from './customer-tickets-receipt-model'
import CustomerTicketsSerialModel from './customer-tickets-serial-model'
import { usePage } from '@inertiajs/react'
import { useDispatch, useSelector } from 'react-redux'

export default function WarrantyFilesSection() {
    const { ticket } = useSelector((state) => state.customer_tickets)

    return (
        <>
           {
                ticket?.call_type && ticket?.call_type == "CF-Warranty Claim" ? <>
                    <CustomerTicketsBillOfSaleSection />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsFrontOfTheUnitSection />
                    {/* <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsRearOfTheUnitSection />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsReadableSerialSection />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsDefectIssueSection /> */}
                </> : <>
                    {/* <CustomerTicketsClearModel />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsPartsModel />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsReceiptModel />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsSerialModel /> */}
                </>
            }
        </>
    )
}

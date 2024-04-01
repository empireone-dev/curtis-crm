import Textarea from '@/app/layouts/components/textarea'
import React, { useState } from 'react'
import CustomerTicketsBillOfSaleSection from './customer-tickets-bill-of-sale-section'
import CustomerTicketsFrontOfTheUnitSection from './customer-tickets-front-of-the-unit-section'
import CustomerTicketsRearOfTheUnitSection from './customer-tickets-rear-of-the-unit-section'
import CustomerTicketsReadableSerialSection from './customer-tickets-readable-serial-section'
import CustomerTicketsDefectIssueSection from './customer-tickets-defect-issue-section'

export default function TicketsDetailsFormSection() {
    const [form, setForm] = useState({})


    function formHandler(value,name) {
        setForm({
            ...form,
            [name]:value
        })
    }
    return (
       <>
        
            <div className='px-5 w-full'>
            <Textarea
                name="details"
                value={form.details??''}
                label="Write a detailed explanation of the defect/issue."
                type=""
                errorMessage="Please write an explaination "
                onChange={formHandler}
            />
            </div>
            <CustomerTicketsBillOfSaleSection />
            <div class="h-px my-8 border border-blue-500 w-full" />
            <CustomerTicketsFrontOfTheUnitSection />
            <div class="h-px my-8 border border-blue-500 w-full" />
            <CustomerTicketsRearOfTheUnitSection />
            <div class="h-px my-8 border border-blue-500 w-full" />
            <CustomerTicketsReadableSerialSection />
            <div class="h-px my-8 border border-blue-500 w-full" />
            <CustomerTicketsDefectIssueSection />
       </>
    )
}

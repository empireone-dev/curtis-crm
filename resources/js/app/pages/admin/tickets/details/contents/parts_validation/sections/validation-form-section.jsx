import React, { useEffect, useState } from 'react'
import Select from '@/app/layouts/components/select'
import Input from '@/app/layouts/components/input'
import Wysiwyg from '@/app/layouts/components/wysiwyg'
import { useDispatch, useSelector } from 'react-redux'
import ValidationButtonSection from './validation-button-section'
import { setSelectedTemplate } from '../../../../_redux/tickets-slice'

export default function ValidationFormSection() {
    const [notes, setNotes] = useState('')
    const { email_templates } = useSelector((state) => state.email_templates);
    const { selectedTemplate } = useSelector((state) => state.tickets);
    const { ticket } = useSelector((state) => state.tickets)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSelectedTemplate({
            id: 1,
            validation_notes: notes,
            ticket: ticket,
            template_name: "Blank Template",
            template_text: selectedTemplate?.template_text ?? ' '
        }))
    }, [notes]);

    function formHandler(value, name) {
        const findTemplates = email_templates.find(res => res.id == value)
        dispatch(setSelectedTemplate({
            ...findTemplates,
            validation_notes: notes,
            ticket: ticket
        }))
    }

    function formHandlerWysiwyg(value) {
        dispatch(setSelectedTemplate({
            ...selectedTemplate,
            template_text: value,
        }))
    }

    // Validation Logic to check for missing required fields


    function isProceedDisabled() {
        if (!ticket?.item_number || !ticket?.serial_number || !notes) {
            return true;
        } else if (!ticket?.address && !ticket?.address_2) {
            return true;
        } else if (!ticket?.detailed_explanation_issue && !ticket?.explanation) {
            return true;
        } else {
            return false;
        }
    }

    console.log('ticket', ticket)

    return (
        <div className='flex w-full items-center justify-center'>
            <div className='max-w-7xl w-full flex flex-col gap-5'>
                <div className="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
                    <div className="bg-blue-600 px-6 py-4">
                        <h2 className="text-white font-semibold text-lg">
                            Customer Equipment Details
                        </h2>
                    </div>

                    <div className="p-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="group">
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Model Number
                                </p>
                                <p className="mt-1 text-lg font-medium text-gray-900">
                                    {ticket?.item_number ?? 'N/A'}
                                </p>
                            </div>

                            <div className="group">
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Serial Number
                                </p>
                                <p className="mt-1 text-lg font-medium text-gray-900">
                                    {/* Corrected: Assuming 'serial_number' is the correct key */}
                                    {ticket?.serial_number ?? 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                                Physical Address
                            </p>
                            <p className="mt-1 text-gray-900">
                                {ticket?.address ?? ''} {ticket?.city ?? ''}  {ticket?.state ?? ''} {ticket?.country ?? ''} {ticket?.zip_code ?? ''}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                                Mailing Address
                            </p>
                            <p className="mt-1 text-gray-900">
                                {ticket?.address_2 ?? ''} {ticket?.city_2 ?? ''}  {ticket?.state_2 ?? ''} {ticket?.country_2 ?? ''} {ticket?.zip_code_2 ?? ''}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                                Description
                            </p>
                            <div className="mt-2 rounded-lg bg-gray-50 border border-gray-200 p-4 text-gray-700">
                                {ticket?.detailed_explanation_issue ?? ''}
                                {ticket?.explanation ?? ''}

                            </div>
                        </div>

                        {isProceedDisabled() && (
                            <div className="mt-2 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
                                <strong>Note:</strong> Required fields (Notes,Model Number, Serial Number, Address, and Description) are missing. You cannot proceed with marking this ticket valid until these are provided.
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    Mark this Ticket Valid / In Valid (Close)
                </div>

                <Input
                    onChange={setNotes}
                    name='validation_notes'
                    required={true}
                    value={notes}
                    label='Item notes'
                    type='text'
                    errorMessage='Item notes is required'
                />
                <Select
                    onChange={formHandler}
                    name='email_template'
                    value=''
                    label='Email Templates'
                    errorMessage=''
                    data={email_templates.map(res => ({
                        name: res.template_name,
                        value: res.id
                    }))}
                />
                <Wysiwyg
                    label=""
                    name="wysiwyg"
                    value={selectedTemplate?.template_text ?? ' '}
                    onChange={formHandlerWysiwyg}
                />

                <div className='flex gap-4 mt-12'>
                    {/* Pass the boolean flag down to the button section */}
                    <ValidationButtonSection isProceedDisabled={isProceedDisabled()} />
                </div>
            </div>
        </div>
    )
}
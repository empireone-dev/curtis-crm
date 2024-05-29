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
            template_text: selectedTemplate.template_text??' '
        }))
    }, [notes]);

    function formHandler(value, name) {
        const findTemplates = email_templates.find(res => res.id == value)
        dispatch(setSelectedTemplate({
            ...findTemplates,
            validation_notes: notes,
            ticket:ticket
        }))
    }

    function formHandlerWysiwyg(value) {
        dispatch(setSelectedTemplate({
            ...selectedTemplate,
            template_text: value,
        }))
    }
    return (
        <div className='flex w-full items-center justify-center'>

            <div className='max-w-7xl w-full flex flex-col gap-5'>
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
                    <ValidationButtonSection />
                </div>
            </div>
        </div>

    )
}

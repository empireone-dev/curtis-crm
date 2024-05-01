import Input from '@/app/layouts/components/input'
import Select from '@/app/layouts/components/select';
import Textarea from '@/app/layouts/components/textarea'
import Wysiwyg from '@/app/layouts/components/wysiwyg';
import { availability_service } from '@/app/services/email-template-service';
import { GlobeAmericasIcon, QueueListIcon, } from '@heroicons/react/24/outline'
import { router } from '@inertiajs/react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTicket } from '../../../../_redux/tickets-slice';
import Loading from '@/app/layouts/components/loading';

export default function AvailabilitySection() {
    const [notes, setNotes] = useState('')
    const { internals, ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app);
    const { email_templates } = useSelector((state) => state.email_templates);
    const [selectedTemplate, setSelectedTemplate] = useState({})
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    function formHandler(value, name) {
        const findTemplates = email_templates.find(res => res.id == value)
        setSelectedTemplate({
            ...findTemplates,
        })
    }

    function formHandlerWysiwyg(value) {
        setSelectedTemplate({
            ...selectedTemplate,
            template_text: value,
        })
    }

    async function submitButton(value) {
        setIsLoading(true)
        const status = value == 'WILLING TO BUY' ? 'CALLBACK' :
            value == 'NOT WILLING TO BUY' || value == 'CLOSE' ? 'CLOSED' :
                value == 'PENDING' ? 'AVAILABILITY' :
                    value == 'FOR REPLACEMENT' ? 'REPLACEMENT PARTS' :
                        'CLOSED';

        const result = await availability_service({
            ...selectedTemplate,
            status: status,
            user: user,
            availability_notes: notes,
            ticket: ticket
        })
        dispatch(setTicket(result.status))

        if (value === 'WILLING TO BUY') {
            router.visit('#callback');
        } else if (value === 'NOT WILLING TO BUY' || value === 'CLOSE') {
            router.visit('#files');
        } else if (value === 'PENDING') {
            router.visit('#availability');
        } else if (value === 'FOR REPLACEMENT') {
            router.visit('#replacement_parts');
        } else {
            router.visit('#files');

        }
        setIsLoading(false)
    }
    return (
        <div>
            <h1 className='text-2xl mt-5'><b>Availability</b></h1>
            <section className="container bg-white">
                <form className="flex flex-col gap-6">
                    <div className="flex gap-3">
                        <button
                            type="button"
                            className="flex items-center rounded-md mt-3 bg-white px-2.5 py-1.5 text-sm text-blue-500 font-semibold shadow-sm ring-1 ring-inset ring-blue-500"
                        >
                            <QueueListIcon className="h-5" />
                            <span>Valid {ticket.warranty_status}</span>
                        </button>
                        <i aria-hidden="true" class="v-icon notranslate v-icon--left mdi mdi-list-status theme--light"></i>
                    </div>
                    <p>Parts Validation Notes:<Notes:div className='text-red-500'> {ticket.availability_notes}</Notes:div></p>
                    <p>Internal Notes:<Notes:div className='text-red-500'> {ticket.internal_notes}</Notes:div></p>
                    <div className="flex gap-3 w-full">
                        <table className="min-w-full divide-y divide-gray-200 ">
                            <thead className="">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left ">
                                        <button className="flex items-center gap-x-3 focus:outline-none">
                                            <span>Name</span>
                                        </button>
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left ">
                                        Part Number
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left ">
                                        Location
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left ">
                                        Cost
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left ">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 ">
                                {
                                    internals.map((res, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div>
                                                        <h2 className="font-medium text-gray-800">{res.name}</h2>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div className="inline  py-1 text-sm font-normal rounded-full">
                                                        {res.part_number}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h4 className="text-gray-700 ">{res.location}</h4>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h4 className="text-gray-700 ">{res.cost}</h4>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h4 className="text-gray-700 ">
                                                            {res.status}
                                                        </h4>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className='w-full flex flex-col gap-5'>
                        <Textarea
                            onChange={(val) => setNotes(val)}
                            label="Availability Remarks/Notes"
                            name="availability_notes"
                            // disabled={true}
                            value={notes}
                            type="text" className='w-full' />
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
                        <div className='flex gap-2 mt-10'>
                            {
                                ticket.warranty_status == 'OOW' && <>
                                    <button
                                        onClick={() => submitButton('WILLING TO BUY')}
                                        type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-200 ">
                                        OOW &gt; WILLING TO BUY
                                    </button>
                                    <button
                                        onClick={() => submitButton('NOT WILLING TO BUY')}
                                        type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 ">
                                        OOW &gt; NOT WILLING TO BUY
                                    </button>
                                </>
                            }
                            {
                                ticket.warranty_status == 'IW' && <button
                                    onClick={() => submitButton('CLOSE')}
                                    type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                    CLOSE
                                </button>
                            }

                            <button
                                onClick={() => submitButton('PENDING')}
                                type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                Not Available - On Order
                            </button>
                            {
                                ticket.warranty_status == 'IW' && <button
                                    onClick={() => submitButton('FOR REPLACEMENT')}
                                    type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                    FOR REPLACEMENT
                                </button>
                            }

                            {
                                isLoading && <div className='bg-orange-500 p-2 rounded-md text-white font-black flex gap-3 items-center justify-center'>
                                    LOADING<Loading />
                                </div>
                            }

                        </div>


                    </div>

                </form>
            </section>
        </div>
    )
}

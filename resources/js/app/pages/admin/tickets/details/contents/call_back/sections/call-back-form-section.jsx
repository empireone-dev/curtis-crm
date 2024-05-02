import Textarea from '@/app/layouts/components/textarea';
import { callback_service } from '@/app/services/email-template-service';
import { QueueListIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTicket } from '../../../../_redux/tickets-slice';
import { router } from '@inertiajs/react';
import Loading from '@/app/layouts/components/loading';

export default function CallBackFormSection() {

    const { internals, ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app);
    const [notes, setNotes] = useState('')
    const dispatch = useDispatch()
    const [isLoading1, setIsLoading1] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)


    async function buttonHandler(value) {
        if (value == 'ORDER PLACED') {
            setIsLoading1(true)
            const result = await callback_service({
                status: 'REPLACEMENT PARTS',
                user: user,
                ticket: ticket,
                callback_notes: notes
            })
            dispatch(setTicket(result.status))
            setIsLoading1(false)
            router.visit('#replacement_parts')
        } else if (value == 'CANCEL ORDER') {
            setIsLoading2(true)
            const result = await callback_service({
                status: 'CLOSED',
                user: user,
                ticket: ticket,
                callback_notes: notes
            })
            dispatch(setTicket(result.status))
            setIsLoading2(false)
            router.visit('#files')
        } else {
            alert('No Calls/Answer, Stay here.')
        }
    }
    return (
        <div>
            <h1 className='text-2xl mt-5'><b>This ticket will be closed after callback</b></h1>
            <section className="container bg-white">
                <form className="flex flex-col gap-6">
                    <div className="flex gap-3">
                        <button
                            type="button"
                            className="flex items-center rounded-md mt-3 bg-white px-2.5 py-1.5 text-sm text-blue-500 font-semibold shadow-sm ring-1 ring-inset ring-blue-500"
                        >
                            <QueueListIcon className="h-5" />
                            <span>Valid OOW</span>
                        </button>
                        <i aria-hidden="true" className="v-icon notranslate v-icon--left mdi mdi-list-status theme--light"></i>
                    </div>
                    <p>Parts Validation Notes:<Notes:div className='text-red-500'> {ticket.validation_notes}</Notes:div></p>
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
                    <div className='w-full'>
                        <h1 className=' mb-2'>Remarks/Notes:</h1>
                        <Textarea
                            // disabled={true}
                            value={notes}
                            onChange={(value) => setNotes(value)}
                            type="text" className='w-full' />
                    </div>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => buttonHandler('ORDER PLACED')}
                            type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-200 ">

                            {
                                isLoading1 ? <Loading /> : 'ORDER PLACED'
                            }
                        </button>
                        <button
                            onClick={() => buttonHandler('CANCEL ORDER')}
                            type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 ">

                            {
                                isLoading2 ? <Loading /> : 'CANCEL ORDER'
                            }
                        </button>
                        <button
                            onClick={() => buttonHandler('NO ANSWER')}
                            type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                            CALLBACK - NO ANSWER
                        </button>
                    </div>

                </form>
            </section>
        </div>
    )
}

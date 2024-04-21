import React, { useState } from 'react';
import Input from '@/app/layouts/components/input';
import { QueueListIcon, TrashIcon } from '@heroicons/react/24/outline';
import Select from '@/app/layouts/components/select';
import { useDispatch, useSelector } from 'react-redux';
import { setTicket } from '../../../../_redux/tickets-slice';
import { router } from '@inertiajs/react';
import { store_internals_service } from '../../../../../../../services/internals-service';

export default function InternalsAvailabilitySection() {

    const { ticket } = useSelector((state) => state.tickets);
    const dispatch = useDispatch()
    const [data, setData] = useState({
        internal_notes: '',
        ticket_id: ticket.id,
        parts: [{
            ticket_id: ticket.id,
            name: null,
            part_number: null,
            location: null,
            cost: null,
            status: null,
        }]
    });

    const isNotAvailable = data.parts.find(option =>
        option.status == 'Parts Not Available' || option.status == 'Not Available - On Order'
    ) !== undefined;

    async function submitInternals(e) {
        e.preventDefault()
        if (isNotAvailable) {
            const result = await store_internals_service({
                ...data,
                status: 'AVAILABILITY'
            })
            dispatch(setTicket(result.status))
            router.visit('#availability');
        } else {
            const result = await store_internals_service({
                ...data,
                status: 'REPLACEMENT'
            })
            dispatch(setTicket(result.status))
            router.visit('#replacement');
        }
    }
    function formHandler(value, fieldName, index) {
        const updatedParts = [...data.parts];
        updatedParts[index][fieldName] = value;
        setData({
            ...data,
            parts: updatedParts
        });
    }

    function addRow() {
        setData({
            ...data,
            parts: [
                ...data.parts,
                {
                    name: null,
                    part_number: null,
                    location: null,
                    cost: null,
                    status: 'Parts Available',
                }
            ]
        });
    }



    function deleteRow(index) {
        const updatedParts = [...data.parts];
        updatedParts.splice(index, 1);
        setData({
            ...data,
            parts: updatedParts
        });
    }

    return (
        <form onSubmit={submitInternals}>
            <div className='flex flex-col gap-4'>
                {
                    ticket.warranty_status == 'IW' ?
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="flex items-center rounded-md mt-3 bg-white px-2.5 py-1.5 text-sm text-green-500 font-semibold shadow-sm ring-1 ring-inset ring-green-500"
                            >
                                <QueueListIcon className="h-5" />
                                <span>IN WARRANTY</span>
                            </button>
                            <i aria-hidden="true" class="v-icon notranslate v-icon--left mdi mdi-list-status theme--light"></i>
                        </div> :
                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="flex items-center rounded-md mt-3 bg-white px-2.5 py-1.5 text-sm text-blue-500 font-semibold shadow-sm ring-1 ring-inset ring-blue-500"
                            >
                                <QueueListIcon className="h-5" />
                                <span>OUT OF WARRANTY</span>
                            </button>
                            <i aria-hidden="true" class="v-icon notranslate v-icon--left mdi mdi-list-status theme--light"></i>
                        </div>
                }

                <div className='flex justify-between'>
                    <div className='text-2xl'>
                        Availability
                    </div>

                    <button
                        onClick={addRow}
                        className='p-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white'>
                        ADD ROW
                    </button>
                </div>
                {
                    data.parts.map((part, i) => {
                        return (
                            <div key={i} className='flex gap-4'>
                                <div className='flex-1'>
                                    <Input
                                        ids={i}
                                        onChange={(value) => formHandler(value, "name", i)}
                                        name="name"
                                        span=""
                                        required={true}
                                        value={part.name ?? ''}
                                        label="Name"
                                        type="text"
                                    />
                                </div>
                                <div className='flex-1'>
                                    <Input
                                        ids={i}
                                        onChange={(value) => formHandler(value, "part_number", i)}
                                        name="part_number"
                                        span=""
                                        required={true}
                                        value={part.part_number ?? ''}
                                        label="Part Number"
                                        type="text"
                                    />
                                </div>
                                <div className='flex-1'>
                                    <Input
                                        ids={i}
                                        onChange={(value) => formHandler(value, "location", i)}
                                        name="location"
                                        span=""
                                        required={true}
                                        value={part.location ?? ''}
                                        label="Location"
                                        type="text"
                                    />
                                </div>
                                <div className='flex-1'>
                                    <Input
                                        ids={i}
                                        onChange={(value) => formHandler(value, "cost", i)}
                                        name="cost"
                                        span=""
                                        required={true}
                                        value={part.cost ?? ''}
                                        label="Cost"
                                        type="text"
                                    />
                                </div>
                                <div className='flex-1'>
                                    <Select
                                        ids={i}
                                        onChange={formHandler}
                                        name='status'
                                        required={false}
                                        value={part.status ?? null}
                                        label='status'
                                        errorMessage=''
                                        data={[
                                            {
                                                value: 'Parts Available',
                                                name: 'Parts Available'
                                            }, {
                                                value: 'Parts Not Available',
                                                name: 'Parts Not Available'
                                            }, {
                                                value: 'Not Available - On Order',
                                                name: 'Not Available - On Order'
                                            },
                                        ]}
                                    />
                                </div>
                                <button className='border border-red-500 rounded-md flex-none text-red-500 p-2.5' onClick={() => deleteRow(i)}>
                                    <TrashIcon className='h-6' />
                                </button>
                            </div>
                        )
                    })
                }

                <div>
                    <Input
                        onChange={(value) => setData({ ...data, internal_notes: value })}
                        name="internal_notes"
                        span=""
                        required={true}
                        value={data?.internal_notes ?? ''}
                        label="Internal Notes"
                        type="text"
                    />
                </div>

                {
                    isNotAvailable ? <button className='p-3 rounded-md bg-green-500 hover:bg-green-600 text-white w-96'>
                        PROCEED
                    </button> : <button className='p-3 rounded-md bg-green-500 hover:bg-green-600 text-white w-96'>
                        MOVE TO REPLACEMENT
                    </button>
                }

            </div>

        </form>
    )
}

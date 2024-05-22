import Textarea from '@/app/layouts/components/textarea'
import { patch_warranty_checkque_shipped_service } from '@/app/services/refund-service';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setTicket } from '../../../../_redux/tickets-slice';
import { router } from '@inertiajs/react';
import Loading from '@/app/layouts/components/loading';
import Input from '@/app/layouts/components/input';
import store from '@/app/store/store';
import { update_tickets_status_thunk } from '../../../../_redux/tickets-thunk';
import moment from 'moment';
import { store_decision_making_replacement_service } from '@/app/services/replacement-service';
import routing from '../../../components/routing';

export default function ContentReplacementWarrantyForm() {
    const { internals, ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app)
    const [isLoading1, setIsLoading1] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const dispatch = useDispatch()
    const [form, setForm] = useState({})

    useEffect(() => {
        setForm({
            ...ticket,
            ...ticket?.replacement,
            ship_date:moment().format('L')
            // ...ticket.receipt ?? {},
            // ...ticket.refund ?? {},
            // notes: ticket?.replacement?.notes ?? '',
            // tracking: ticket?.replacement?.tracking ?? '',
        })
    }, [ticket]);

    function formHandler(value, name) {
        setForm({
            ...form,
            [name]: value
        })
    }

    async function process_ticket_handler() {
        if (confirm('Are you sure you want to shipped the ticket?')) {
            setIsLoading1(true)
            try {
                const result = await store_decision_making_replacement_service({
                    ...form,
                    ticket_id:ticket.id,
                    account: user,
                    status: 'PROCESSED TICKET'
                })
                dispatch(setTicket(result.status))
                setIsLoading1(false)
                router.visit(routing("files"));
            } catch (error) {
                setIsLoading1(false)
            }
        }
    }
    async function not_shipped_handler() {
        if (confirm(`Are you sure you want to move in refund?`)) {
            setIsLoading2(true)
            try {
                await store.dispatch(update_tickets_status_thunk(ticket.id, 'REFUND',{
                    ...form,
                    ticket_id:ticket.id,
                    account: user,
                    status: 'NOT SHIPPED'
                }))
                setIsLoading2(false)
                router.visit(routing("refund"));
            } catch (error) {
                setIsLoading2(true)
            }
        }
    }
    return (
        <div className='bg-white h-full px-3'>
            <div className='mt-10 w-full border-b-2 border-gray-600'>
                <h1 className='mt-2'>Parts Internal Remarks/Notes:</h1>
                {ticket.validation_notes}
            </div>

            <div className='mt-5 my-4 w-full'>
                <div className='my-3 flex flex-col'>
                    Date: {form.ship_date??''}
                    <input type='date' 
                    className='w-52'
                        name='ship_date' 
                        pattern='\d{1,2}/\d{1,2}/\d{4}'
                        onChange={(e) => setForm({
                        ...form,
                        ship_date: moment(e.target.value).format('L')
                    })} />
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                    <Input
                        onChange={formHandler}
                        name='unit'
                        span=""
                        required={true}
                        value={String(form.unit ?? ' ')}
                        label="Unit"
                        type='text'
                        errorMessage='Unit is required'
                    />
                    <Input
                        onChange={formHandler}
                        name='brand'
                        span=""
                        required={true}
                        value={String(form.brand ?? ' ')}
                        label="Brand"
                        type='text'
                        errorMessage='Brand is required'
                    />
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <Input
                        onChange={formHandler}
                        name='model'
                        span=""
                        required={true}
                        value={String(form.model ?? ' ')}
                        label="model"
                        type='text'
                        errorMessage='model is required'
                    />
                    <Input
                        onChange={formHandler}
                        name='serial_number'
                        span=""
                        required={true}
                        value={String(form.serial_number ?? ' ')}
                        label="Serial"
                        type='text'
                        errorMessage='Serial is required'
                    />

                    <Input
                        onChange={formHandler}
                        name='tracking'
                        span=""
                        required={true}
                        value={String(form.tracking ?? ' ')}
                        label="Tracking"
                        type='text'
                        errorMessage='Tracking is required'
                    />
                </div>

                <div className="px-4 py-2 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0">
                    <Textarea
                        required={true}
                        onChange={formHandler}
                        name='notes'
                        value={String(form.notes ?? ' ')}
                        label='Resource Notes:'
                        type='text'
                        errorMessage='notes is required'
                    />
                </div>

                <div className='flex gap-2'>

                    <button
                        disabled={isLoading1}
                        onClick={process_ticket_handler}
                        type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 ">

                        {
                            isLoading1 ? <Loading /> : 'REPLACEMENT SHIPPED'
                        }

                    </button>
                    <button
                        onClick={not_shipped_handler}
                        type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 ">
                        {
                            isLoading2 ? <Loading /> : 'REPLACEMENT NOT SHIPPED'
                        }
                    </button>
                </div>
            </div>

        </div>
    )
}

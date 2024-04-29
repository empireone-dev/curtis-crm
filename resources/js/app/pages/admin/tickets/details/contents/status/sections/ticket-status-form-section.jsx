import Loading from '@/app/layouts/components/loading'
import Select from '@/app/layouts/components/select'
import Textarea from '@/app/layouts/components/textarea'
import store from '@/app/store/store'
import { router } from '@inertiajs/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { update_tickets_status_thunk } from '../../../../_redux/tickets-thunk'

export default function TicketStatusFormSection() {
    const [form, setForm] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const { ticket } = useSelector((state) => state.tickets)

    function formHandler(value, name) {
        setForm({
            ...form,
            [name]: value
        })
    }
    const status = [
        {
            value: 0,
            name: ''
        },
        {
            value: 1,
            name: 'Callback Sucessful - Fixed'
        },
        {
            value: 2,
            name: 'Callback Sucessful - Not Fixed'
        },
        {
            value: 3,
            name: 'No Answer - End Call'
        },
        {
            value: 4,
            name: 'No Answer - Left Voicemail'
        },
        {
            value: 5,
            name: 'Email sent'
        },
        {
            value: 6,
            name: 'Closed resolved - agent resolution'
        },
        {
            value: 7,
            name: 'Closed resolved - customer resolution'
        },
        {
            value: 8,
            name: 'Closed for warranty'
        },
        {
            value: 9,
            name: 'Closed - parts issue'
        },

    ]

    async function submit_status() {
        if (confirm('Are you sure you want to update the status?')) {
            setIsLoading(true)
            try {
                await store.dispatch(update_tickets_status_thunk(ticket.id, 'CLOSED'))
                setIsLoading(false)
                router.visit('#files');
            } catch (error) {
                setIsLoading(false)
            }
        }
    }

    return (
        <div className='flex flex-col gap-5'>
            <Select
                onChange={formHandler}
                name='status'
                value={form?.isHasEmail ?? ''}
                label='Status'
                errorMessage=''
                data={status}
            />
            <Textarea
                required={true}
                onChange={formHandler}
                name="notes"
                value={form.notes ?? " "}
                label="Notes"
                type="text"
                errorMessage="Notes is required"
            />
            <button
                onClick={submit_status}
                className='p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-52 flex items-center justify-center'>

                {
                    isLoading ? <div className='p-1'>
                        <Loading />
                    </div> : 'UPDATE STATUS'
                }

            </button>
        </div>
    )
}

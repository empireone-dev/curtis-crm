import Loading from '@/app/layouts/components/loading'
import { update_tickets_status_service } from '@/app/services/tickets-service'
import store from '@/app/store/store'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { update_tickets_status_thunk } from '../../../../_redux/tickets-thunk'
import { router } from '@inertiajs/react'
import routing from '../../../components/routing'

export default function WarehouseReceivedButton() {
    const { ticket } = useSelector((state) => state.tickets)
    const [isLoading, setIsLoading] = useState(false)
    async function received_item() {
        if (confirm('Are you sure you want to receive the item?')) {
            setIsLoading(true)
            await store.dispatch(update_tickets_status_thunk(ticket.id, ticket.decision_status,null,'warehouse'))
            setIsLoading(false)
            router.visit(routing(ticket.decision_status.toLowerCase()));
        }

    }
    return (
        <>
            {
                ticket.status == 'CLOSED' && <div
                    // onClick={received_item}
                    className='rounded-md flex items-center cursor-pointer  text-sm justify-center p-3 bg-red-500 hover:bg-red-600 text-white w-52'>
                    CLOSED
                </div>
            }
            {
                ticket.status != 'CLOSED' && <div
                    onClick={received_item}
                    className='rounded-md cursor-pointer flex items-center text-sm justify-center p-3 bg-blue-500 hover:bg-blue-600 text-white w-52'>
                    {
                        isLoading ? <div className='py-1'>
                            <Loading />
                        </div> : 'RECEIVED ITEM '
                    }
                </div>
            }
        </>

    )
}

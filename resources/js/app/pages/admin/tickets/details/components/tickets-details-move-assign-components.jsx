import store from '@/app/store/store'
import React, { useState } from 'react'
import { update_tickets_status_thunk } from '../../_redux/tickets-thunk'
import Loading from '@/app/layouts/components/loading'
import { router, usePage } from '@inertiajs/react'
import { useSelector } from 'react-redux'

export default function TicketsDetailsMoveAssignComponents({ name, icon, value, ticket, link }) {
  const [isLoading, setIsLoading] = useState(false)
  const page = usePage();
  const { user } = useSelector((state) => state.app)

  async function update_status() {
    if (confirm(`Are you sure you want to move in ${value?.toLowerCase()??'validation'}?`)) {
      setIsLoading(true)
      await store.dispatch(update_tickets_status_thunk(ticket.id, value))
      setIsLoading(false)
      if (user.role_id == 3) {
        router.visit('#files');
      } else {
        router.visit('#' + link);
      }
    }
  }
  return (
    <div className='my-3 mx-1'>
      <button
        onClick={update_status}
        className="outline outline-2 flex gap-2 hover:bg-blue-500 bg-blue-600 text-white outline-offset-2 p-2.5 outline-blue-500 hover:outline-blue-700 rounded-sm">
        {
          isLoading ? <div className='w-[185px] h-6 flex items-center justify-center'>
            <Loading />
          </div> : <>{icon} {name} </>
        }
      </button>
    </div>
  )
}

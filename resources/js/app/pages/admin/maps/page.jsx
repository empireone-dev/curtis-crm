import React, { useEffect, useState } from 'react'
import GoogleMapComponent from './sections/google_map'
import { get_user_by_role_service } from '@/app/services/user-service';
import { get_tickets_by_ticket_id } from '@/app/services/tickets-service';
import { usePage } from '@inertiajs/react';

export default function MapsPage() {
  const [asc, setAsc] = useState([])
  const [ticket, setTicket] = useState({})
  const { url } = usePage()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function get_user_role() {
      const res = await get_user_by_role_service(4)
      const ticketData = await get_tickets_by_ticket_id(url.split('/')[3])
      setTicket(ticketData)
      setAsc(res.data)
      setLoading(false)
    }
    get_user_role()
  }, []);
  

  return (
    <div>
      {
        asc.length !== 0 && !loading && <GoogleMapComponent
          ascs={asc.map((res, i) => ({
            id: res.id,
            lng: parseFloat(res.longitude),
            lat: parseFloat(res.latitude),
            name: res.name,
            ...res
          }))}
          ticket={ticket}
        />
      }

    </div>
  )
}

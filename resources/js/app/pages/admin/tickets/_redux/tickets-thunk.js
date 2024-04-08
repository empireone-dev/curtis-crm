import { get_tickets_service, update_tickets_status_service } from '@/app/services/tickets-service';
import { ticketsSlice } from './tickets-slice';
import {customerTicketsSlice} from '@/app/pages/customer/tickets/redux/customer-tickets-slice';
import { get_activities_by_id_service } from '@/app/services/activities-service';

export function get_tickets_thunk() {
  return async function (dispatch, getState) {
    const {search} = getState().tickets
    const result = await get_tickets_service(search)
    dispatch(ticketsSlice.actions.setTickets(result.data));
  };
}


export function update_tickets_status_thunk(id,status) {
  return async function (dispatch, getState) {
    const {user} = getState().app
    const result = await update_tickets_status_service(id,status,user.id)
    dispatch(customerTicketsSlice.actions.setTicket(result));
  };
}

export function get_activities_by_id_thunk() {
  return async function (dispatch, getState) {
    const {ticket} = getState().customer_tickets
    const result = await get_activities_by_id_service(ticket.id)
    console.log('waaa',ticket.id)
    dispatch(ticketsSlice.actions.setActivities(result.data));
  };
}



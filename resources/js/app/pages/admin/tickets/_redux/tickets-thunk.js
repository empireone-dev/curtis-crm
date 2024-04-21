import { get_tickets_service, update_tickets_status_service } from '@/app/services/tickets-service';
import { ticketsSlice } from './tickets-slice';
import { customerTicketsSlice } from '@/app/pages/customer/tickets/redux/customer-tickets-slice';
import { get_activities_by_id_service } from '@/app/services/activities-service';
import { add_notes_on_tickets_service, get_notes_by_id_service } from '@/app/services/add-notes-service';
import { get_internals_by_ticket_id_service } from '@/app/services/internals-service';


export function get_making_decision_thunk(data) {
  return async function (dispatch, getState) {
     dispatch(ticketsSlice.actions.setRefund(data));
     dispatch(ticketsSlice.actions.setReplacement(data));
     dispatch(ticketsSlice.actions.setRepair(data));
  };
}



export function get_internals_by_ticket_id_thunk() {
  return async function (dispatch, getState) {
    const { ticket } = getState().tickets
    const result = await get_internals_by_ticket_id_service(ticket.id)
    dispatch(ticketsSlice.actions.setInternals(result.status));
  };
}


export function get_tickets_thunk() {
  return async function (dispatch, getState) {
    const { search } = getState().tickets
    const result = await get_tickets_service(search)
    dispatch(ticketsSlice.actions.setTickets(result.data));
  };
}


export function update_tickets_status_thunk(id, status) {
  return async function (dispatch, getState) {
    const { user } = getState().app
    const result = await update_tickets_status_service(id, status, user.id)
    dispatch(customerTicketsSlice.actions.setTicket(result));
    dispatch(ticketsSlice.actions.setTicket(result));
  };
}

export function get_activities_by_id_thunk() {
  return async function (dispatch, getState) {
    const { ticket } = getState().customer_tickets
    const result = await get_activities_by_id_service(ticket.id)
    console.log('waaa', ticket.id)
    dispatch(ticketsSlice.actions.setActivities(result.data));
  };
}

export function add_notes_on_tickets_thunk(data) {
  return async function (dispatch, getState) {
    const { ticket } = getState().customer_tickets
    const { user } = getState().app
    const result = await add_notes_on_tickets_service({
      user_id: user.id,
      ticket_id: ticket.id,
      message: data
    })
    dispatch(ticketsSlice.actions.setNotes(result.data));
    return 'success';
  };
}

export function get_notes_by_id_thunk() {
  return async function (dispatch, getState) {
    const { ticket } = getState().customer_tickets
    if (ticket) {
      const result = await get_notes_by_id_service(ticket.id)
      dispatch(ticketsSlice.actions.setNotes(result.data));
    }
  };
}


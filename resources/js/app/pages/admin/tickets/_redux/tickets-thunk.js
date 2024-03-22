import { get_tickets_service } from '@/app/services/tickets-service';
import { ticketsSlice } from './tickets-slice';

export function get_tickets_thunk(query) {
  return async function (dispatch, getState) {
    const result = await get_tickets_service(query)
    dispatch(ticketsSlice.actions.setTickets(result));
  };
}

import { get_tickets_service } from '@/app/services/tickets-service';
import { ticketsSlice } from './tickets-slice';

export function get_tickets_thunk() {
  return async function (dispatch, getState) {
    const {search} = getState().tickets
    const result = await get_tickets_service(search)
    dispatch(ticketsSlice.actions.setTickets(result.data));
  };
}

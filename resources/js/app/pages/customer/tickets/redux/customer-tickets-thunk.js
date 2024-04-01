import { get_tickets_by_user_id } from "@/app/services/tickets-service";
import { customerTicketsSlice } from "./customer-tickets-slice";

export function get_tickets_by_user_id_thunk(id) {
  return async function (dispatch, getState) {
    const result = await get_tickets_by_user_id(id)
     dispatch(customerTicketsSlice.actions.setTickets(result));
  };
}
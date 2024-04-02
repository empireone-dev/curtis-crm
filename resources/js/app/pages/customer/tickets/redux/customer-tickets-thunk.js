import { get_tickets_by_user_id } from "@/app/services/tickets-service";
import { customerTicketsSlice } from "./customer-tickets-slice";
import { get_upload_picture_videos, upload_picture_videos } from "@/app/services/files-service";

export function get_tickets_by_user_id_thunk(id) {
  return async function (dispatch, getState) {
    const result = await get_tickets_by_user_id(id)
     dispatch(customerTicketsSlice.actions.setTickets(result));
  };
}

export function upload_ticket_files_thunk(data) {
  return async function (dispatch, getState) {
    const result =  await upload_picture_videos(data)
    //  dispatch(customerTicketsSlice.actions.setTickets(result));
  };
}

export function get_upload_ticket_files_thunk(ticket_id) {
  return async function (dispatch, getState) {
    const result =  await get_upload_picture_videos(ticket_id)
    return result.data
    //  dispatch(customerTicketsSlice.actions.setTickets(result));
  };
}
import { get_tickets_by_email, get_tickets_by_user_id, update_explanation_service } from "@/app/services/tickets-service";
import { customerTicketsSlice, setFilesData } from "./customer-tickets-slice";
import {
    delete_upload_picture_videos,
    get_upload_picture_videos,
    upload_picture_videos,
} from "@/app/services/files-service";
import { setTicket } from "@/app/pages/admin/tickets/_redux/tickets-slice";

export function get_tickets_by_user_id_thunk(id) {
    return async function (dispatch, getState) {
        const result = await get_tickets_by_user_id(id,window.location.search);
        dispatch(customerTicketsSlice.actions.setTickets(result));
    };
}

export function get_tickets_by_email_thunk(email) {
    return async function (dispatch, getState) {
        const result = await get_tickets_by_email(email);
        dispatch(customerTicketsSlice.actions.setTickets(result));
    };
}

export function upload_ticket_files_thunk(data,ticket_id) {
    return async function (dispatch, getState) {
        const { user } = getState().app
        const ticket = await upload_picture_videos(data);
        const result = await get_upload_picture_videos(ticket_id);
        dispatch(setTicket(ticket.status))
        dispatch(setFilesData(result.data));
        //  dispatch(customerTicketsSlice.actions.setTickets(result));
    };
}

export function get_upload_ticket_files_thunk(ticket_id) {
    return async function (dispatch, getState) {
        const result = await get_upload_picture_videos(ticket_id);
        dispatch(customerTicketsSlice.actions.setTicket(result.ticket));
        return result.data;
    };
}

export function delete_upload_ticket_files_thunk(id, ticket_id) {
    return async function (dispatch, getState) {
        await delete_upload_picture_videos(id, ticket_id);
        const result = await get_upload_picture_videos(ticket_id);
        dispatch(setFilesData(result.data));
        return result.data;
        //  dispatch(customerTicketsSlice.actions.setTickets(result));
    };
}


export function update_explanation_thunk(ticket_id,explanation) {
    return async function (dispatch, getState) {
        const res = await update_explanation_service(ticket_id,explanation)
        dispatch(customerTicketsSlice.actions.setTicket(res))
    };
}
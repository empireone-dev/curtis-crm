import { get_tickets_by_asc_service,  get_tickets_by_warehouse_service, update_explanation_service } from "@/app/services/tickets-service";
import { ascTicketsSlice, setFilesData } from "./asc-tickets-slice";
import {
    delete_upload_picture_videos,
    get_upload_picture_videos,
    upload_picture_videos,
} from "@/app/services/files-service";

// export function get_tickets_by_warehouse_thunk(country) {
//     return async function (dispatch, getState) {
//         const result = await get_tickets_by_warehouse_service(country);
//         dispatch(ascTicketsSlice.actions.setTickets(result));
//     };
// }

export function get_tickets_by_asc_thunk(id,search) {
    return async function (dispatch, getState) {
        const result = await get_tickets_by_asc_service(id,search);
        dispatch(ascTicketsSlice.actions.setTickets(result));
    };
}

// export function upload_ticket_files_thunk(data,ticket_id) {
//     return async function (dispatch, getState) {
//         await upload_picture_videos(data);
//         const result = await get_upload_picture_videos(ticket_id);
//         dispatch(setFilesData(result.data));
//         //  dispatch(ascTicketsSlice.actions.setTickets(result));
//     };
// }

// export function get_upload_ticket_files_thunk(ticket_id) {
//     return async function (dispatch, getState) {
//         const result = await get_upload_picture_videos(ticket_id);
//         dispatch(ascTicketsSlice.actions.setTicket(result.ticket));
//         return result.data;
//     };
// }

// export function delete_upload_ticket_files_thunk(id, ticket_id) {
//     return async function (dispatch, getState) {
//         await delete_upload_picture_videos(id, ticket_id);
//         const result = await get_upload_picture_videos(ticket_id);
//         dispatch(setFilesData(result.data));
//         return result.data;
//         //  dispatch(ascTicketsSlice.actions.setTickets(result));
//     };
// }


// export function update_explanation_thunk(ticket_id,explanation) {
//     return async function (dispatch, getState) {
//         const res = await update_explanation_service(ticket_id,explanation)
//         dispatch(ascTicketsSlice.actions.setTicket(res))
//     };
// }
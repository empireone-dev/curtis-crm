import { store_tickets_service } from "@/app/services/tickets-service";
import { ticketsCreateSlice } from "./tickets-create-slice";


export function tickets_create_thunk() {
    return async function (dispatch, getState) {
        const form = getState().tickets_create.form
         const response = await store_tickets_service(form)
         dispatch(ticketsCreateSlice.actions.setForm({}));
        return response;
    };
}

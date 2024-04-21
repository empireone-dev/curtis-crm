import { useEffect } from "react";
import AvailabilitySection from "./sections/availability-section";
import store from "@/app/store/store";
import { get_internals_by_ticket_id_thunk } from "../../../_redux/tickets-thunk";
import { get_email_templates_thunk } from "@/app/pages/admin/email_template/redux/email-template-thunk";

export default function TicketsAvailabilityContent() {

    useEffect(() => {
        store.dispatch(get_internals_by_ticket_id_thunk())
        store.dispatch(get_email_templates_thunk())
    }, []);
return (
    <>
    <AvailabilitySection/>
    </>
)
}
import { parts_initial, warranty_initial } from "@/app/json/initial-templates";
import Loading from "@/app/layouts/components/loading";
import {  resend_email_templete_service } from "@/app/services/tickets-service";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ResendInitialEmail() {
    const [loading, setLoading] = useState(false);
    const { ticket } = useSelector((state) => state.tickets);

    const warranty = warranty_initial(ticket);
    const parts = parts_initial(ticket);
    async function resend_email(params) {
        setLoading(true);
        try {
            await resend_email_templete_service({
                ticket_id: ticket.id,
                call_type: ticket.call_type,
                body: ticket.call_type == "Parts" ? parts : warranty,
                subject: ticket.ticket_id,
                recipient: ticket.email,
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <button
            disabled={loading}
            onClick={resend_email}
            className="bg-purple-500 p-2 text-white  hover:bg-purple-600 flex items-center justify-center w-64"
        >
            {loading ? (
                <Loading />
            ) : (
                <div className="p-1 w-full flex items-center justify-center">
                    RESEND INITIAL EMAIL
                </div>
            )}
        </button>
    );
}

import Loading from "@/app/layouts/components/loading";
import { get_upload_ticket_files_thunk } from "@/app/pages/customer/tickets/redux/customer-tickets-thunk";
import {
    escalated_service,
    get_tickets_by_ticket_id,
} from "@/app/services/tickets-service";
import store from "@/app/store/store";
import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTicket } from "../../../../_redux/tickets-slice";
import { setFilesData } from "@/app/pages/customer/tickets/redux/customer-tickets-slice";

export default function EscalatedSection({ data }) {
    const [loading, setLoading] = useState(false);
    const [notif, setNotif] = useState(false);
    const dispatch = useDispatch();
    const { url } = usePage();
    useEffect(() => {
        if (notif) {
            setTimeout(() => {
                setNotif(false);
            }, [2000]);
        }
    }, [notif]);

    async function escalated_button(params) {
        setLoading(true);
        try {
            await escalated_service(data);
            setLoading(false);
            setNotif(true);
            const ticketId = url
                .split("/")
                [url.split("/").length - 2].split("#")[0];
            const res = await store.dispatch(
                get_upload_ticket_files_thunk(ticketId)
            );
            const ress = await get_tickets_by_ticket_id(ticketId);
            dispatch(setTicket(ress));
            dispatch(setFilesData(res));
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <div>
            <button
                onClick={escalated_button}
                className={`${
                    data.isEscalated
                        ? "bg-green-800 p-2 text-white  hover:bg-green-900"
                        : " bg-red-800 p-2 text-white  hover:bg-red-900"
                } flex items-center justify-center w-64`}
            >
                {loading ? (
                    <div className="py-2">
                        <Loading />
                    </div>
                ) : (
                    <div className="p-1 w-full flex items-center justify-center">
                        {notif ? (
                            <div className="text-white uppercase text-xs py-1">
                                The casefile has been escalated.
                            </div>
                        ) : (
                            "ESCALATE" + (data.isEscalated ? "D" : "")
                        )}
                    </div>
                )}
            </button>
        </div>
    );
}

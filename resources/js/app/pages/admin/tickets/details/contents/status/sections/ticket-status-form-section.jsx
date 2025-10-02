import Loading from "@/app/layouts/components/loading";
import Select from "@/app/layouts/components/select";
import Textarea from "@/app/layouts/components/textarea";
import store from "@/app/store/store";
import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_tickets_status_thunk } from "../../../../_redux/tickets-thunk";
import routing from "../../../components/routing";
import { forward_ticket_service } from "@/app/services/tickets-service";
import { setTicket } from "../../../../_redux/tickets-slice";

export default function TicketStatusFormSection() {
    const [form, setForm] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    function formHandler(value, name) {
        setForm({
            ...form,
            [name]: value,
        });
    }
    const status = [
        {
            value: 'Callback Sucessful - Fixed',
            name: "Callback Sucessful - Fixed",
        },
        {
            value: 'Callback Sucessful - Not Fixed',
            name: "Callback Sucessful - Not Fixed",
        },
        {
            value: 'No Answer - End Call',
            name: "No Answer - End Call",
        },
        {
            value: 'No Answer - Left Voicemail',
            name: "No Answer - Left Voicemail",
        },
        {
            value: 'Email sent',
            name: "Email sent",
        },
        {
            value: 'Closed resolved - agent resolution',
            name: "Closed resolved - agent resolution",
        },
        {
            value: 'Closed resolved - customer resolution',
            name: "Closed resolved - customer resolution",
        },
        {
            value: 'Closed for warranty',
            name: "Closed for warranty",
        },
        {
            value: 'Closed - parts issue',
            name: "Closed - parts issue",
        },
    ];
    async function submit_status() {
        if (confirm("Are you sure you want to close the ticket?")) {
            setIsLoading(true);
            try {
                await store.dispatch(
                    update_tickets_status_thunk(ticket.id, "CLOSED",form)
                );
                setIsLoading(false);
                router.visit(routing("files"));
            } catch (error) {
                setIsLoading(false);
            }
        }
    }

    async function forward_ticket(data) {
        try {
            const res = await forward_ticket_service({
                ...form,
                ...ticket,
                user_id: user.id,
                where_to_move: data,
            });
            dispatch(setTicket(res.result));
            router.visit(routing("files"));
        } catch (error) {}
    }

    return (
        <div className="flex flex-col gap-5">
            <Select
                onChange={formHandler}
                name="reason"
                value={form?.isHasEmail ?? ""}
                label="Reason"
                errorMessage=""
                data={status}
            />
            <Textarea
                required={true}
                onChange={formHandler}
                name="notes"
                value={form.notes ?? " "}
                label="Notes"
                type="text"
                errorMessage="Notes is required"
            />
            {/* <button
                onClick={submit_status}
                className='p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-52 flex items-center justify-center'>

                {
                    isLoading ? <div className='p-1'>
                        <Loading />
                    </div> : 'UPDATE STATUS'
                }
            </button> */}
            <div className="flex gap-5">
                <button
                    onClick={() => forward_ticket("WARRANTY VALIDATION")}
                    className="p-3 bg-green-500 uppercase hover:bg-green-600 text-white rounded-md w-64 flex items-center justify-center"
                >
                    Forwarded to Warranty
                </button>
                <button
                    onClick={() => forward_ticket("PARTS VALIDATION")}
                    className="p-3 bg-blue-500 uppercase hover:bg-blue-600 text-white rounded-md w-64 flex items-center justify-center"
                >
                    Forwarded to Parts
                </button>
                <button
                    onClick={() => submit_status("PARTS VALIDATION")}
                    className="p-3 bg-red-500 uppercase hover:bg-red-600 text-white rounded-md w-64 flex items-center justify-center"
                >
                    CLOSE TICKET
                </button>
            </div>
        </div>
    );
}

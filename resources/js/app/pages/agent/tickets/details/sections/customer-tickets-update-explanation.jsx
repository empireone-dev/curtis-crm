import React, { useState } from "react";
import Textarea from "@/app/layouts/components/textarea";
import { usePage } from "@inertiajs/react";
import store from "@/app/store/store";
import { update_explanation_thunk } from "../../redux/customer-tickets-thunk";
import { useDispatch, useSelector } from "react-redux";
import { setTicket } from "@/app/pages/admin/tickets/_redux/tickets-slice";
import { Button, message } from "antd";
// import { setTicket } from '@/app/pages/admin/tickets/_redux/tickets-slice'

export default function CustomerTicketsUpdateExplanation() {
    const [messageApi, contextHolder] = message.useMessage();
    const { ticket } = useSelector((state) => state.tickets);
    const [ticketData, setTicketData] = useState({});
    const { url } = usePage();
    const ticket_id = window.location.pathname.split("/")[4];
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    function formHandler(value, name) {
        setTicketData({
            ...ticketData,
            [name]: value,
        });
    }

    async function submitExplanation(e) {
        e.preventDefault();
        setIsLoading(true);
        await store.dispatch(
            update_explanation_thunk(ticket_id, ticketData?.explanation ?? "")
        );
        setIsLoading(false);
        setTicketData({});
        dispatch(
            setTicket({
                ...ticket,
                explanation: ticketData.explanation,
            })
        );
        messageApi.open({
            type: "success",
            content: "Updated Successfully",
        });
    }

    return (
        <form onSubmit={submitExplanation} className="px-5 w-full">
            {contextHolder}
            <Textarea
                name="explanation"
                value={ticketData.explanation ?? " "}
                label="Write a detailed explanation of the defect/issue."
                type=""
                errorMessage="Please write an explanation "
                onChange={formHandler}
            />

            <button className="bg-blue-500 hover:bg-blue-500 p-3 rounded-md text-white my-5">
                {isLoading ? "Loading..." : "Save"}
            </button>
        </form>
    );
}

import { cases_service } from "@/app/services/tickets-service";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setTickets } from "@/app/pages/customer/tickets/redux/customer-tickets-slice";

export default function RemoveCasesSection({ data }) {
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const url = window.location.pathname + window.location.search;
    const getQueryParam = (url, paramName) => {
        const searchParams = new URLSearchParams(url.split("?")[1]);
        return searchParams.get(paramName);
    };

    const page = getQueryParam(url, "page");
    const cases = getQueryParam(url, "search");
    const account_id = window.location.pathname.split("/")[3];
    const handleRemove = async () => {
        if (
            window.confirm(
                "Are you sure you want to remove this ticket from unread emails?"
            )
        ) {
            setLoading(true);
            await axios.post("/api/remove_unread_email", {
                ticket_id: data.ticket_id,
            });
            const res = await cases_service(
                window.location.search,
                cases,
                account_id
            );
            dispatch(setTickets(res));
            setLoading(false);
            await Swal.fire({
                icon: "success",
                title: "Done!",
                showConfirmButton: false,
                timer: 1500,
                text: "Tickets have been removed successfully.",
            });
        }
    };

    return (
        <div>
            <button
                className="text-white bg-red-500 px-5 py-1.5 rounded-md"
                onClick={handleRemove}
                disabled={loading}
            >
                {loading ? <span>Loading...</span> : "Remove"}
            </button>
        </div>
    );
}

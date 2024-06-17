import React, { useState } from "react";
import Textarea from "@/app/layouts/components/textarea";
import { usePage } from "@inertiajs/react";
import store from "@/app/store/store";
import { update_explanation_thunk } from "../../redux/customer-tickets-thunk";
import { useDispatch, useSelector } from "react-redux";
import { setTicket } from "../../redux/customer-tickets-slice";

export default function CustomerTicketsUpdateExplanation({ isTranslate }) {
    const { ticket } = useSelector((state) => state.customer_tickets);
    const { url } = usePage();
    const ticket_id = url.split("/")[3];
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    function formHandler(value, name) {
        dispatch(
            setTicket({
                ...ticket,
                [name]: value,
            })
        );
    }

    async function submitExplanation(e) {
        e.preventDefault();
        setIsLoading(true);
        await store.dispatch(
            update_explanation_thunk(ticket_id, ticket?.explanation ?? "")
        );
        setIsLoading(false);
    }

    function defect_notes() {
        if (ticket.call_type == "Parts") {
            return true;
        } else if (ticket.call_type == "CF-Warranty Claim") {
            return false;
        }
    }
    return (
        <form onSubmit={submitExplanation} className="px-5 w-full">
            {defect_notes() == false && (
                <Textarea
                    name="explanation"
                    value={ticket.explanation ?? " "}
                    label={
                        !isTranslate
                            ? "Rédigez une explication détaillée du défaut/problème."
                            : "Write a detailed explanation of the defect/issue."
                    }
                    type=""
                    errorMessage="Please write an explanation "
                    onChange={formHandler}
                />
            )}

            {defect_notes() == true && (
                <Textarea
                    name="explanation"
                    value={ticket.explanation ?? " "}
                    label={
                        !isTranslate
                            ? "Description de la ou des pièces que vous recherchez.."
                            : "Description of the part/s that you’re looking for."
                    }
                    type=""
                    errorMessage="Please write an explanation "
                    onChange={formHandler}
                />
            )}

            <button className="bg-blue-500 hover:bg-blue-500 p-3 rounded-md text-white my-5">
                {isLoading ? "Loading..." : "Save"}
            </button>
        </form>
    );
}

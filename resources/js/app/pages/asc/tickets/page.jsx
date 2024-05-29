import ASCLayout from "@/app/layouts/asc/asc-layout";
import React, { useEffect } from "react";
import ASCTicketsTableSection from "./sections/asc-tickets-table-section";
import store from "@/app/store/store";
import { get_tickets_by_asc_thunk } from "./redux/asc-tickets-thunk";

export default function ASCTicketsPage({ auth }) {
    const account = auth.user;
    const search = window.location.search.split("=")[1];
    useEffect(() => {
        async function get_asc_tickets(params) {
            const id = account.id;
            store.dispatch(get_tickets_by_asc_thunk(id, search));
        }
        get_asc_tickets();
    }, []);
    return (
        <ASCLayout account={account}>
            <div className="my-8">
                <ASCTicketsTableSection />
            </div>
        </ASCLayout>
    );
}

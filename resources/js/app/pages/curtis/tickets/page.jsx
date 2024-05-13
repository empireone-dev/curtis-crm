import CustomerLayout from "@/app/layouts/customer/customer-layout";
import React, { useEffect } from "react";
import CustomerTicketsTableSection from "./sections/customer-tickets-table-section";
import store from "@/app/store/store";
import { useSelector } from "react-redux";
import { get_tickets_thunk } from "../../admin/tickets/_redux/tickets-thunk";

export default function CustomerTicketsPage({ auth }) {
    const account = auth.user;
    const { search } = useSelector((state) => state.tickets);
    useEffect(() => {
        store.dispatch(get_tickets_thunk(window.location.search));
    }, [search.page ?? ""]);

    return (
        <CustomerLayout account={account}>
            <div className="my-8">
                <CustomerTicketsTableSection />
            </div>
        </CustomerLayout>
    );
}

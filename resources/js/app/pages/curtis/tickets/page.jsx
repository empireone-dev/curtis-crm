import CurtisLayout from "@/app/layouts/curtis/curtis-layout";
import React, { useEffect } from "react";
import CustomerTicketsTableSection from "./sections/customer-tickets-table-section";
import store from "@/app/store/store";
import { useSelector } from "react-redux";
import { get_tickets_thunk } from "../../admin/tickets/_redux/tickets-thunk";
import TicketFilterSection from "../../admin/tickets/_sections/ticket-filter-section";
import { get_products_thunk } from "../../admin/ticket_form/redux/ticket-form-thunk";
import TicketsExportFileSection from "../../admin/tickets/_sections/tickets-export-file-section";
import TicketsImportFileSection from "../../admin/tickets/_sections/tickets-import-file-section";
import TicketsSearchSection from "../../admin/tickets/_sections/tickets-search-section";

export default function CustomerTicketsPage({ auth }) {
    const account = auth.user;
    const { search } = useSelector((state) => state.tickets);
    useEffect(() => {
        if (window.location.hash == "") {
            store.dispatch(get_tickets_thunk(window.location.search));
        } else {
            store.dispatch(
                get_tickets_thunk("?search=" + window.location.hash.slice(1))
            );
        }
    }, [search.page ?? ""]);

    useEffect(() => {
        store.dispatch(get_products_thunk());
    }, []);
    return (
        <CurtisLayout account={account}>
            <div className="my-8">
                <div className="flex px-2 w-full items-center justify-between">
                    <TicketsImportFileSection />
                    <TicketsExportFileSection />
                </div>
                <div className="my-3 flex gap-3">
                    <TicketsSearchSection />
                    <TicketFilterSection />
                </div>
                <CustomerTicketsTableSection />
            </div>
        </CurtisLayout>
    );
}

import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import React, { useEffect } from "react";
import TicketTableSection from "./_sections/tickets-table-section";
import store from "@/app/store/store";
import { get_tickets_thunk } from "./_redux/tickets-thunk";
import { router, usePage } from "@inertiajs/react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "./_redux/tickets-slice";
import TicketsSearchSection from "./_sections/tickets-search-section";
import TicketsExportFileSection from "./_sections/tickets-export-file-section";
import TicketFilterSection from "./_sections/ticket-filter-section";
import { get_products_thunk } from "../ticket_form/redux/ticket-form-thunk";

export default function TicketsPage() {
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
        <AdministratorLayout>
            <div className="py-12">
                <div className="px-5 flex items-start justify-between gap-4">
                    <button
                        onClick={() =>
                            router.visit("/administrator/tickets/create")
                        }
                        className="p-2 bg-green-500 text-white hover:bg-green-600 rounded-md"
                    >
                        CREATE TICKET
                    </button>
                    <TicketsExportFileSection />
                </div>
                <div className="m-3 flex items-center justify-between gap-3 ">
                    <TicketsSearchSection />
                    <TicketFilterSection />
                </div>
                <div className="px-3">
                    <TicketTableSection />
                </div>
            </div>
        </AdministratorLayout>
    );
}

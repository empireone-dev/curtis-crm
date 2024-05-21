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

export default function TicketsPage() {
    const { search } = useSelector((state) => state.tickets);
    useEffect(() => {
        const result = store.dispatch(get_tickets_thunk(window.location.search));
    }, [search.page ?? ""]);

    return (
        <AdministratorLayout>
            <div className="py-12">
                <div className="px-5 flex items-start justify-start">
                    <button
                        onClick={() =>
                            router.visit("/administrator/tickets/create")
                        }
                        className="p-3 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
                    >
                        CREATE TICKET
                    </button>
                </div>
                <div className="m-3 flex items-center justify-between gap-3 ">
                    <TicketsSearchSection />
                    <TicketsExportFileSection />
                </div>
                <div className="px-3">
                    <TicketTableSection />
                </div>
            </div>
        </AdministratorLayout>
    );
}

import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import React, { useEffect, useState } from "react";
import TicketTableSection from "./_sections/tickets-table-section";
import store from "@/app/store/store";
import { get_tickets_thunk } from "./_redux/tickets-thunk";
import { useSelector } from "react-redux";
import TicketsSearchSection from "./_sections/tickets-search-section";
import TicketsExportFileSection from "./_sections/tickets-export-file-section";
import TicketFilterSection from "./_sections/ticket-filter-section";
import { get_products_thunk } from "../ticket_form/redux/ticket-form-thunk";

export default function TicketsPage() {
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function get_data(params) {
            setLoading(true)
            await store.dispatch(get_products_thunk());
            await store.dispatch(get_tickets_thunk(window.location.search));
            setLoading(false)
        }
        get_data()
    }, [window.location.search]);

    return (
        <AdministratorLayout>
            <div className="py-3">
                <div className="px-3 flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                        <button
                            onClick={() =>
                                // router.visit("/administrator/tickets/create")
                                window.location.href = '/administrator/tickets/create'
                            }
                            className="p-2 bg-green-500 text-white hover:bg-green-600 rounded-md"
                        >
                            CREATE TICKET
                        </button>
                        {/* <ExportProcessTicket /> */}
                    </div>
                    <TicketsExportFileSection  isLoading={loading}/>
                </div>
                <div className="m-3 flex items-center justify-between gap-3 ">
                    <TicketsSearchSection />
                    <TicketFilterSection />
                </div>
                <TicketTableSection loading={loading} />
            </div>
        </AdministratorLayout>
    );
}

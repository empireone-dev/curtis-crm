import React, { useEffect } from "react";
import WarehouseLayout from "@/app/layouts/warehouse/warehouse-layout";
import WarehouseTicketsTableSection from "./sections/warehouse-tickets-table-section";
import { get_tickets_by_warehouse_thunk } from "./redux/warehouse-tickets-thunk";
import store from "@/app/store/store";
import TicketsExportFileSection from "../../admin/tickets/_sections/tickets-export-file-section";
import WarehouseExportTickets from "./sections/warehouse-export-tickets";

export default function WarehouseDashboardPage({ auth }) {
    const account = auth.user;
    useEffect(() => {
        async function get_warehouse_tickets(params) {
            store.dispatch(get_tickets_by_warehouse_thunk(account.country));
        }
        get_warehouse_tickets();
    }, []);
    return (
        <WarehouseLayout account={account}>
            <div className="my-8">
                <div className="p-3">
                {/* <TicketsExportFileSection /> */}
                <WarehouseExportTickets 
                account={account}
                />
                </div>
                <WarehouseTicketsTableSection />
            </div>
        </WarehouseLayout>
    );
}

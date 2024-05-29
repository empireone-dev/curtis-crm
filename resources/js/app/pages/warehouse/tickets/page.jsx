import React, { useEffect } from "react";
import WarehouseLayout from "@/app/layouts/warehouse/warehouse-layout";
import WarehouseTicketsTableSection from "./sections/warehouse-tickets-table-section";
import { get_tickets_by_warehouse_thunk } from "./redux/warehouse-tickets-thunk";
import store from "@/app/store/store";

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
                <WarehouseTicketsTableSection />
            </div>
        </WarehouseLayout>
    );
}

import React from "react";
import WarehouseLayout from "@/app/layouts/warehouse/warehouse-layout";
import WarehouseCardsSection from "./sections/warehouse-card-section";

export default function WarehouseDashboardPage({ auth }) {
    const account = auth.user;
    return (
        <WarehouseLayout account={account}>
            <div className="my-8">
                <WarehouseCardsSection account={account} />
            </div>
        </WarehouseLayout>
    );
}

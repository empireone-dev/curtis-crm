import WarehouseLayout from "@/app/layouts/warehouse/warehouse-layout";
import TicketsDetailsMoveAssignSection from "@/app/pages/admin/tickets/details/sections/tickets-details-move-assign-section,";
import TicketsDetailsTabSection from "@/app/pages/admin/tickets/details/sections/tickets-details-tab-section";
import React from "react";

export default function WarehouseTicketDetailsPage({ auth }) {
    const account = auth.user;
    return (
        <WarehouseLayout account={account}>
            <div className="mr-3 py-6">
                <TicketsDetailsMoveAssignSection />
                <TicketsDetailsTabSection />
            </div>
        </WarehouseLayout>
    );
}

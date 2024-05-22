import React from "react";
import TicketStatusFormSection from "./sections/ticket-status-form-section";
import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import TicketsDetailsLayout from "../ticket-content-layout";
import WarehouseLayout from "@/app/layouts/warehouse/warehouse-layout";
import ASCLayout from "@/app/layouts/asc/asc-layout";
import AgentLayout from "@/app/layouts/agent/agent-layout";
import CurtisLayout from "@/app/layouts/curtis/curtis-layout";

export default function TicketsDetailsContentStatus({auth}) {
    
    const account = auth.user.user_role;
    const MainLayout =
    account == 1
        ? AdministratorLayout
        : account == 3
        ? WarehouseLayout
        : account == 4
        ? ASCLayout
        : account == 5
        ? AgentLayout
        : CurtisLayout;
    return (
        <MainLayout
        account={auth.user}
        >
            <TicketsDetailsLayout>
                <TicketStatusFormSection />
            </TicketsDetailsLayout>
        </MainLayout>
    );
}

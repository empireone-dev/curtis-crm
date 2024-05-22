import React, { useEffect } from "react";
import InternalsAvailabilitySection from "./sections/internals-availability-section";
import { get_internals_by_ticket_id_thunk } from "../../../_redux/tickets-thunk";
import store from "@/app/store/store";
import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import TicketsDetailsLayout from "../ticket-content-layout";
import WarehouseLayout from "@/app/layouts/warehouse/warehouse-layout";
import ASCLayout from "@/app/layouts/asc/asc-layout";
import AgentLayout from "@/app/layouts/agent/agent-layout";
import CurtisLayout from "@/app/layouts/curtis/curtis-layout";

export default function TicketsPartsInternalsContent({auth}) {
    useEffect(() => {
        store.dispatch(get_internals_by_ticket_id_thunk());
    }, []);

    const account = auth.user.role_id;
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
                <InternalsAvailabilitySection />
            </TicketsDetailsLayout>
        </MainLayout>
    );
}

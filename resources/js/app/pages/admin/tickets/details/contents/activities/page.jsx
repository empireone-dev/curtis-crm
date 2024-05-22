import React, { useEffect } from "react";
import ContentActivitiesTimelineSection from "./sections/content-activities-timeline-section";
import store from "@/app/store/store";
import { get_activities_by_id_thunk } from "../../../_redux/tickets-thunk";
import { useSelector } from "react-redux";
import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import TicketsDetailsLayout from "../ticket-content-layout";
import WarehouseLayout from "@/app/layouts/warehouse/warehouse-layout";
import ASCLayout from "@/app/layouts/asc/asc-layout";
import AgentLayout from "@/app/layouts/agent/agent-layout";
import CurtisLayout from "@/app/layouts/curtis/curtis-layout";

export default function TicketsDetailsContentActivities({ auth }) {
    const { ticket } = useSelector((state) => state.customer_tickets);
    useEffect(() => {
        store.dispatch(get_activities_by_id_thunk());
    }, [ticket.id]);

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
        <MainLayout account={auth.user}>
            <TicketsDetailsLayout>
                <ContentActivitiesTimelineSection />
            </TicketsDetailsLayout>
        </MainLayout>
    );
}

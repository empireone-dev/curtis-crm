import React, { useEffect } from "react";
import ContentNotesCommentSection from "./sections/content-notes-comment-section";
import ContentNotesTextareaSection from "./sections/content-notes-textarea-section";
import store from "@/app/store/store";
import { get_notes_by_id_thunk } from "../../../_redux/tickets-thunk";
import { useSelector } from "react-redux";
import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import TicketsDetailsLayout from "../ticket-content-layout";
import WarehouseLayout from "@/app/layouts/warehouse/warehouse-layout";
import ASCLayout from "@/app/layouts/asc/asc-layout";
import AgentLayout from "@/app/layouts/agent/agent-layout";
import CurtisLayout from "@/app/layouts/curtis/curtis-layout";
import CasesLogSection from "./sections/cases-log-section";
export default function TicketsDetailsContentNotes({ auth }) {
    const { ticket } = useSelector((state) => state.customer_tickets);
    useEffect(() => {
        store.dispatch(get_notes_by_id_thunk());
    }, [ticket.id]);

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
        <MainLayout account={auth.user}>
            <TicketsDetailsLayout>
                <ContentNotesTextareaSection />
                <div className="flex w-full gap-3">
                    <div className="flex-1 border-r-2 ">
                        <ContentNotesCommentSection />
                    </div>
                    <div  className="flex-1">
                        
                    <CasesLogSection />
                    </div>
                </div>
            </TicketsDetailsLayout>
        </MainLayout>
    );
}

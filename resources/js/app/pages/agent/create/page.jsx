import React, { useEffect } from "react";
import TicketCreateFormSection from "./sections/tickets-create-form-section";
import store from "@/app/store/store";
import AgentLayout from "@/app/layouts/agent/agent-layout";
import { get_common_issues_thunk } from "../../admin/common_issues/redux/common-issues-thunk";

export default function AgentTicketCreatePage({ auth }) {
    const account = auth.user;
    useEffect(() => {
        store.dispatch(get_common_issues_thunk());
    }, []);
    return (
        <AgentLayout account={account}>
            <div className="my-3">
                <TicketCreateFormSection />
            </div>
        </AgentLayout>
    );
}

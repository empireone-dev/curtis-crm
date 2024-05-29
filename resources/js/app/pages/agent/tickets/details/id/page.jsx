import React, { useEffect } from "react";
import EditTicketFormSection from "./sections/edit-ticket-form-section";
import store from "@/app/store/store";
import { useDispatch } from "react-redux";
import { get_common_issues_thunk } from "@/app/pages/admin/common_issues/redux/common-issues-thunk";
import AgentLayout from "@/app/layouts/agent/agent-layout";

export default function DetailsEditTicket({ auth }) {
  
    const account = auth.user;
    useEffect(() => {
        store.dispatch(get_common_issues_thunk());
    }, []);

    return (
        <AgentLayout account={account}>
            <EditTicketFormSection />
        </AgentLayout>
    );
}

import React from "react";
import AgentDirectEmailsTableSection from "./sections/agent-direct-emails-table-section";
import AgentLayout from "@/app/layouts/agent/agent-layout";

export default function AgentDirectEmailsPage({ auth }) {
    const account = auth.user;
    const direct_email_id= window.location.pathname.split('/')[4]
    return (
        <AgentLayout account={account}>
            <div className="text-3xl mt-12 font-extrabold mx-3">
            Direct Emails Page
            </div>
            <AgentDirectEmailsTableSection account={{
                ...account,
                id:direct_email_id
            }}/>
        </AgentLayout>
    );
}

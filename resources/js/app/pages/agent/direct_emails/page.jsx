import AgentLayout from "@/app/layouts/agent/agent-layout";
import React from "react";
import AgentDirectEmailsTableSection from "./sections/agent-direct-emails-table-section";

export default function AgentDirectEmailsPage({ auth }) {
    const account = auth.user;

    return (
        <AgentLayout account={account}>
            <div className="text-3xl mt-12 font-extrabold mx-3">
            Direct Emails Page
            </div>
            <AgentDirectEmailsTableSection account={account}/>
        </AgentLayout>
    );
}

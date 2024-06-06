import AgentLayout from "@/app/layouts/agent/agent-layout";
import React from "react";
import AgentDirectEmailsTableSection from "./sections/agent-direct-emails-table-section";

export default function AgentDirectEmailsPage({ auth }) {
    const account = auth.user;

    return (
        <AgentLayout account={account}>
            <AgentDirectEmailsTableSection />
        </AgentLayout>
    );
}

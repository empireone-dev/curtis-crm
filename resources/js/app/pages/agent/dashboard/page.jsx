import AgentLayout from "@/app/layouts/agent/agent-layout";
import React from "react";
import AgentCardsSection from "./sections/agent-card-section";

export default function AgentPage({ auth }) {
    const account = auth.user;
    return (
        <AgentLayout account={account}>
            <AgentCardsSection account={account} />
        </AgentLayout>
    );
}

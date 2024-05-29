import ASCLayout from "@/app/layouts/asc/asc-layout";
import TicketsDetailsTabSection from "@/app/pages/admin/tickets/details/sections/tickets-details-tab-section";
import React from "react";

export default function ASCDetailsPage({ auth }) {
    const account = auth.user;
    return (
        <ASCLayout account={account}>
            <TicketsDetailsTabSection account={account} />
        </ASCLayout>
    );
}

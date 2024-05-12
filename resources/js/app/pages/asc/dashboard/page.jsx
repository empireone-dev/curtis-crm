import ASCLayout from "@/app/layouts/asc/asc-layout";
import React, { useEffect } from "react";
import ASCCardsSection from "./sections/asc-card-section";
import { asc_dashboard_service } from "@/app/services/dashboard-service";

export default function Pages({ auth }) {
    const account = auth.user;

    return (
        <ASCLayout account={account}>
            <ASCCardsSection account={account} />
        </ASCLayout>
    );
}

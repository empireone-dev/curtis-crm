import ASCLayout from "@/app/layouts/asc/asc-layout";
import TicketsDetailsTabSection from "@/app/pages/admin/tickets/details/sections/tickets-details-tab-section";
import React from "react";
import StepperSection from "./sections/stepper-section";

export default function ASCDetailsPage({ auth }) {
    const account = auth.user;
    return (
        <ASCLayout account={account}>
            <div className="my-5">
                <StepperSection />
            </div>
        </ASCLayout>
    );
}

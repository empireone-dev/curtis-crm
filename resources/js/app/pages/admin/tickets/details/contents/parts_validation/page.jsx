import React, { useEffect } from "react";
import ValidationFormSection from "./sections/validation-form-section";
import store from "@/app/store/store";
import { get_email_templates_thunk } from "@/app/pages/admin/email_template/redux/email-template-thunk";
import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import TicketsDetailsLayout from "../ticket-content-layout";
import WarehouseLayout from "@/app/layouts/warehouse/warehouse-layout";
import ASCLayout from "@/app/layouts/asc/asc-layout";
import AgentLayout from "@/app/layouts/agent/agent-layout";
import CurtisLayout from "@/app/layouts/curtis/curtis-layout";

export default function TicketsPartsValidationContent({auth}) {
    useEffect(() => {
        store.dispatch(get_email_templates_thunk());
    }, []);
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
        <MainLayout 
        account={auth.user}
        >
            <TicketsDetailsLayout>
                <ValidationFormSection />
            </TicketsDetailsLayout>
        </MainLayout>
    );
}

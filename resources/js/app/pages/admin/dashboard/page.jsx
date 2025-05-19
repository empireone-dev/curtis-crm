import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import React, { useEffect, useState } from "react";
import DashboardCardsSection from "./sections/dashboard-cards-section";
import ExportByTheWarehouse from "./sections/export-by-the-warehouse";

export default function DashboardPage() {
   
    return (
        <AdministratorLayout>
            <ExportByTheWarehouse />
            <DashboardCardsSection />
        </AdministratorLayout>
    );
}

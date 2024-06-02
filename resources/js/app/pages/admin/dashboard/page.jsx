import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import React, { useEffect, useState } from "react";
import DashboardCardsSection from "./sections/dashboard-cards-section";

export default function DashboardPage() {
   
    return (
        <AdministratorLayout>
            <DashboardCardsSection />
        </AdministratorLayout>
    );
}

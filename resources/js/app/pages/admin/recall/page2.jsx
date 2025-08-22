import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import React, { useEffect } from "react";
import StatsTable from "./sections/stats-table";
import store from "@/app/store/store";
import { get_recall_stats_thunk } from "../tickets/_redux/tickets-thunk";

export default function Page2() {
    useEffect(() => {
        store.dispatch(get_recall_stats_thunk());
    }, []);
    return (
        <AdministratorLayout>
            <StatsTable />
        </AdministratorLayout>
    );
}

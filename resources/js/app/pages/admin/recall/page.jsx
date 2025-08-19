import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import store from "@/app/store/store";
import React, { useEffect } from "react";
import { get_recall_thunk } from "../tickets/_redux/tickets-thunk";
import DirectEmailTable from "./sections/direct-email-table";

export default function Page() {
    useEffect(() => {
        store.dispatch(get_recall_thunk());
    }, []);

    return (
        <AdministratorLayout>
            <DirectEmailTable />
        </AdministratorLayout>
    );
}

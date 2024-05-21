import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import React, { useEffect } from "react";
import UserTicketTableSection from "./sections/user-ticket-table-section";
import store from "@/app/store/store";
import { get_tickets_by_user_id_thunk } from "@/app/pages/customer/tickets/redux/customer-tickets-thunk";
import { get_users_thunk } from "../redux/users.thunk";

export default function UserTicketsPage() {
    const account_id = window.location.pathname.split("/")[3];
    useEffect(() => {
        store.dispatch(get_tickets_by_user_id_thunk(account_id));
        store.dispatch(get_users_thunk(5))
    }, []);

    return (
        <AdministratorLayout>
            <div className="m-5 mx-6">
                <div className="text-2xl font-bold text-gray-700">
                  User Tickets
                </div>
                <UserTicketTableSection />
            </div>
        </AdministratorLayout>
    );
}

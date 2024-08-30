import React, { useEffect } from "react";
import CustomerTicketsTableSection from "./sections/customer-tickets-table-section";
import store from "@/app/store/store";
import { get_tickets_by_user_id_thunk } from "./redux/customer-tickets-thunk";
import AgentLayout from "@/app/layouts/agent/agent-layout";
import { router } from "@inertiajs/react";
import { get_tickets_thunk } from "../../admin/tickets/_redux/tickets-thunk";
import CSRTicketsTableSection from "./sections/csr-ticket-table";

export default function AgentTicketsPage({ auth }) {
    const account = auth.user;

    useEffect(() => {
        if (account.agent_type == 'CSR') {
            if (window.location.hash == "") {
                store.dispatch(get_tickets_thunk(window.location.search));
            } else {
                store.dispatch(
                    get_tickets_thunk("?search=" + window.location.hash.slice(1))
                );
            }
        }else{
            store.dispatch(get_tickets_by_user_id_thunk(account.id));
        }
    }, []);

    return (
        <AgentLayout account={account}>
            <div className="my-8">
                <div className="px-5 flex items-start justify-start">
                    <button
                        onClick={() =>
                            // router.visit("/agent/tickets/create")
                            window.location.href='/agent/tickets/create'
                        }
                        className="p-3 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
                    >
                        CREATE TICKET
                    </button>
                </div>
               
            </div>
            {account.agent_type !== 'CSR' &&  <CustomerTicketsTableSection />}
        </AgentLayout>
    );
}

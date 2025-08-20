import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import React, { useEffect, useState } from "react";
import AgentCustomerDetailsSection from "./sections/customer-details-section";
import AgentCaseLogsSection from "./sections/case-logs-section";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { router } from "@inertiajs/react";
import AgentLogCaseSection from "./sections/log-case-section";
import TransferDirectEmails from "./sections/transfer-direct-email";
import { get_caseslog_by_ticket_id_direct_email_service } from "@/app/services/cases-log-service";
import { useDispatch } from "react-redux";
import store from "@/app/store/store";
import { get_recall_by_id_thunk } from "../../tickets/_redux/tickets-thunk";

export default function Page({ auth }) {
    const searchParams = new URLSearchParams(window.location.search);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const email = searchParams.get("email");
    const account = auth.user;

    useEffect(() => {
        async function fetch_data(params) {
            await store.dispatch(get_recall_by_id_thunk());
            // const ress = await get_tickets_by_ticket_id(window.location.pathname.split('/')[3]);
            // const res = await get_caseslog_by_ticket_id_direct_email_service(
            //     window.location.pathname.split("/")[5]
            // );
            // dispatch(set_cases_log(res.data));
        }
        fetch_data();
    }, []);

    return (
        <AdministratorLayout>
            {!loading ? (
                <div className="p-3">Please wait...</div>
            ) : (
                <div className="p-10 bg-gray-100 min-h-screen">
                    <div className="container mx-auto">
                        <div className="bg-white rounded-lg shadow-lg p-2 md:p-4">
                            <div className="text-3xl font-bold">Recalls</div>
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
                                <div className="md:col-span-2">
                                    <AgentCustomerDetailsSection
                                        email={email}
                                    />
                                    <AgentCaseLogsSection />
                                </div>
                                <div className="border-l p-2 md:pl-4 overflow-auto">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() =>
                                                router.visit(
                                                    "/administrator/recall"
                                                )
                                            }
                                            className="bg-gray-300 hover:bg-gray-400 items-center justify-center font-bold w-full py-2 px-4 rounded"
                                        >
                                            <ArrowLeftOutlined className="mr-2" />
                                            Previous
                                        </button>
                                    </div>
                                    <AgentLogCaseSection
                                        account={account}
                                        account2={auth.user}
                                        recall_id={
                                            window.location.pathname.split(
                                                "/"
                                            )[3]
                                        }
                                    />
                                    {/* <TransferDirectEmails /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdministratorLayout>
    );
}

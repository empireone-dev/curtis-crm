import { create_caseslog_service } from "@/app/services/cases-log-service";
import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_cases_log } from "@/app/pages/admin/users/redux/users-slice";
import {
    get_direct_email_by_id_service,
    get_direct_email_by_id_service2,
} from "@/app/services/direct-email-service";
import { create_recall_service } from "@/app/services/tickets-service";
import store from "@/app/store/store";
import { get_recall_by_id_thunk } from "../../../tickets/_redux/tickets-thunk";

export default function AgentLogCaseSection({ recall_id, account, account2 }) {
    const [data, setData] = useState({});
    const [messageApi, contextHolder] = message.useMessage();
    const { cases_logs } = useSelector((state) => state.users);

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    async function submit_case_log(params) {
        setLoading(true);
        const res = await create_recall_service({
            ...data,
            recall_id: recall_id,
            user_id: account2.id,
            log_from: "recalls",
        });
        await store.dispatch(get_recall_by_id_thunk());

        messageApi.open({
            type: "success",
            content: "Submitted Successfully",
        });
        setData({});
        setLoading(false);
    }
    return (
        <div>
            {contextHolder}
            <div class="text-gray-600 mb-4 mt-3">
                <p class="font-medium text-lg">Log Case</p>

                <div class="mt-2">
                    <label>Remarks</label>
                    <textarea
                        onChange={(e) =>
                            setData({
                                ...data,
                                remarks: e.target.value,
                            })
                        }
                        class="h-20 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={data?.remarks ?? ""}
                    ></textarea>
                </div>
                <div class="md:col-span-5 mt-2">
                    <label>Case Type</label>
                    <select
                        id="countries"
                        onChange={(e) =>
                            setData({
                                ...data,
                                case_type: e.target.value,
                            })
                        }
                        class="bg-gray-50 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                        <option selected disabled>
                            Select
                        </option>
                        <option value="regular">Regular</option>
                        <option value="escalated">Escalated</option>
                    </select>
                </div>
                <div class="md:col-span-5 mt-4">
                    <label>Case Status</label>
                    <select
                        onChange={(e) =>
                            setData({
                                ...data,
                                case_status: e.target.value,
                            })
                        }
                        id="countries"
                        class="bg-gray-50 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                        <option selected disabled>
                            Select
                        </option>

                        <option value="Sent Recall Link">
                            Sent Recall Link
                        </option>
                        <option
                            value="Safety Issue
"
                        >
                            Safety Issue
                        </option>
                        <option
                            value="Not Included in the Recall
"
                        >
                            Not Included in the Recall
                        </option>
                        <option
                            value="Already Disposed of the Unit
"
                        >
                            Already Disposed of the Unit
                        </option>
                        <option
                            value="Provided Receipt in the Email
"
                        >
                            Provided Receipt in the Email
                        </option>
                        <option
                            value="⁠Escalated to Internal Team
"
                        >
                            ⁠Escalated to Internal Team
                        </option>
                        <option value="⁠Asking for Update - Has Existing Registration">
                            ⁠Asking for Update - Has Existing Registration
                        </option>
                    </select>
                </div>
                {/* <button
                onClick={submit_case_log}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full mt-3">
                   Submit
                </button> */}
                <Button
                    disabled={data.isHide == "true"}
                    onClick={submit_case_log}
                    loading={loading}
                    type="primary"
                    className="my-3 w-full"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}

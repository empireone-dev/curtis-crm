import { create_caseslog_service } from "@/app/services/cases-log-service";
import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_cases_log } from "@/app/pages/admin/users/redux/users-slice";
import {
    get_direct_email_by_id_service,
    get_direct_email_by_id_service2,
} from "@/app/services/direct-email-service";

export default function AgentLogCaseSection({ ticket_id, account, account2 }) {
    const [data, setData] = useState({});
    const [messageApi, contextHolder] = message.useMessage();
    const { cases_logs } = useSelector((state) => state.users);

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    async function submit_case_log(params) {
        setLoading(true);
        const res = await create_caseslog_service({
            ...data,
            ticket_id: ticket_id,
            user_id: account2.id,
            log_from: "direct_emails",
        });
        const ress = await get_direct_email_by_id_service2();
        setData({
            isHide: ress.result.isHide,
        });
        dispatch(set_cases_log(res.data));
        messageApi.open({
            type: "success",
            content: "Submitted Successfully",
        });
        setLoading(false);
    }
    useEffect(() => {
        async function getData(params) {
            const res = await get_direct_email_by_id_service2();
            setData({
                ...data,
                isHide: res.result.isHide,
            });
        }
        getData();
    }, []);
    console.log("account", account);
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
                        {account?.agent_type == "Warranty" && (
                            <>
                                <option value="Done for Destroy">
                                    Done for Destroy
                                </option>
                                <option value="Unit Received / Ice Maker Delivered">
                                    Unit Received / Ice Maker Delivered
                                </option>
                                <option value="Complete and Validated">
                                    Complete and Validated
                                </option>
                                <option value="Decision Making">
                                    Decision Making
                                </option>
                                <option value="Sent Lacking Info">
                                    Sent Lacking Info
                                </option>
                                <option value="Referred to the Store">
                                    Referred to the Store
                                </option>
                                <option value="Escalated">Escalated</option>
                                <option value="Sent a Reply">
                                    Sent a Reply
                                </option>
                                <option value="Created a Ticket (Direct Email)">
                                    Created a Ticket (Direct Email)
                                </option>
                                <option value="Sent Lacking for Destroy">
                                    Sent Lacking for Destroy
                                </option>
                                <option value="Close - OOW">Close - OOW</option>
                                <option value="Close - Physical Damage">
                                    Close - Physical Damage
                                </option>
                                <option value="Close- Resolved">
                                    Close- Resolved
                                </option>
                                <option value="Close - Customer Not Interested">
                                    Close - Customer Not Interested
                                </option>
                                <option value="Close - Customer disposed of the Unit">
                                    Close - Customer disposed of the Unit
                                </option>
                                <option value="Close - Non-curtis">
                                    Close - Non-curtis
                                </option>
                                <option value="Close - Not a Valid Retailer">
                                    Close - Not a Valid Retailer
                                </option>
                                <option value="Close - Used / Resold">
                                    Close - Used / Resold
                                </option>
                                <option value="Close - Returned to the Store">
                                    Close - Returned to the Store
                                </option>
                                <option value="Close- Not a Warranty Issue">
                                    Close- Not a Warranty Issue
                                </option>
                                <option value="Close - Has Existing Ticket">
                                    Close - Has Existing Ticket
                                </option>
                            </>
                        )}

                        {account?.agent_type == "Parts" && (
                            <>
                                <option value="Parts Available">
                                    Parts Available
                                </option>
                                <option value="Parts Not Available">
                                    Parts Not Available
                                </option>
                                <option value="Part in Order">
                                    Part in Order
                                </option>
                                <option value="Referred to Store">
                                    Referred to Store
                                </option>
                                <option value="Sent a Reply / Email">
                                    Sent a Reply / Email
                                </option>
                                <option value="Willing to Purchase">
                                    Willing to Purchase
                                </option>
                                <option value="Follow Up">Follow Up</option>
                                <option value="Shipping Damage">
                                    Shipping Damage
                                </option>
                                <option value="Sent Survey">Sent Survey</option>
                                <option value="Forwarded to Warranty">
                                    Forwarded to Warranty
                                </option>
                                <option value="Forwarded to Tech">
                                    Forwarded to Tech
                                </option>
                                <option value="Shipping Info (IW)">
                                    Shipping Info (IW)
                                </option>
                                <option value="Shipping Info (OOW)">
                                    Shipping Info (OOW)
                                </option>
                                <option value="Escalated Case">
                                    Escalated Case
                                </option>
                                <option value="Lacking Info">
                                    Lacking Info
                                </option>
                                <option value="Checking Availability">
                                    Checking Availability
                                </option>
                                <option value="Connected Call / Voicemail">
                                    Connected Call / Voicemail
                                </option>
                                <option value="Close - Customer Not Interested">
                                    Close - Customer Not Interested
                                </option>
                                <option value="Close - No Response (14 days)">
                                    Close - No Response (14 days)
                                </option>
                                <option value="Close - Not Willing to Buy">
                                    Close - Not Willing to Buy
                                </option>
                                <option value="Close - Parts Not Availble">
                                    Close - Parts Not Availble
                                </option>
                                <option value="Close - Resolved">
                                    Close - Resolved
                                </option>
                                <option value="Close - Has Existing Ticket">
                                    Close - Has Existing Ticket
                                </option>
                                <option value="Pending">Pending</option>
                            </>
                        )}
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

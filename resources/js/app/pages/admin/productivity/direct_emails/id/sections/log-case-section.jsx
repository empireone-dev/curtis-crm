import { create_caseslog_service } from "@/app/services/cases-log-service";
import { Button,message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_cases_log } from "@/app/pages/admin/users/redux/users-slice";
import { get_direct_email_by_id_service, get_direct_email_by_id_service2 } from "@/app/services/direct-email-service";

export default function AgentLogCaseSection({ ticket_id, account,account2 }) {
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
      const ress=await get_direct_email_by_id_service2()
        setData({
            isHide:ress.result.isHide
        });
        dispatch(set_cases_log(res.data));
        messageApi.open({
            type: "success",
            content: "Submitted Successfully",
        });
        setLoading(false);
    }
    useEffect(()=>{
        async function getData(params) {
                const res=await get_direct_email_by_id_service2()
                setData({
                    ...data,
                    isHide:res.result.isHide
                })
        }
        getData()
    },[])
    console.log('account',account)
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
                                <option value="Pending-Incomplete Details">
                                    Pending-Incomplete Details
                                </option>
                                <option value="Pending-Completed and Validated">
                                    Pending-Completed and Validated
                                </option>
                                <option value="Pending-Warranty Decision-Refund">
                                    Pending-Warranty Decision-Refund
                                </option>
                                <option value="Pending-Warranty Decision-Replacement">
                                    Pending-Warranty Decision-Replacement
                                </option>
                                <option value="Pending-Warranty Decision-Repair">
                                    Pending-Warranty Decision-Repair
                                </option>
                                <option value="Pending-Case Follow-up">
                                    Pending-Case Follow-up
                                </option>
                                <option value="Pending-Undelivered Email / Bounced Back Email">
                                    Pending-Undelivered Email / Bounced Back
                                    Email
                                </option>
                                <option value="Pending-Proactive Follow-up">
                                    Pending-Proactive Follow-up
                                </option>
                                <option value="Case Closed-Warranty Denied">
                                    Case Closed-Warranty Denied
                                </option>
                                <option value="Case Closed-Refer to Parts">
                                    Case Closed-Refer to Parts
                                </option>
                                <option value="Case Endorsed to TCH">
                                    Case Endorsed to TCH
                                </option>
                                <option value="Case Survey Sent">
                                    Case Survey Sent
                                </option>
                                <option value="Case Closed-No Survey">
                                    Case Closed-No Survey
                                </option>
                            </>
                        )}
                        
                        {account?.agent_type == "Parts" && (
                            <>
                                <option value="Pending - Incomplete Information">
                                    Pending - Incomplete Information
                                </option>
                                <option value="Pending - Part in Order">
                                    Pending - Part in Order
                                </option>
                                <option value="Pending - Case Follow Up">
                                    Pending - Case Follow Up
                                </option>
                                <option value="Pending - Shipping Info (IW)">
                                    Pending - Shipping Info (IW)
                                </option>
                                <option value="Pending - Shipping Info (OOW)">
                                    Pending - Shipping Info (OOW)
                                </option>
                                <option value="Pending - Escalated Case">
                                    Pending - Escalated Case
                                </option>
                                <option value="Responded - Parts Available">
                                    Responded - Parts Available
                                </option>
                                <option value="Responded - Parts Not Available">
                                    Responded - Parts Not Available
                                </option>
                                <option value="Responded - Sent Email">
                                    Responded - Sent Email
                                </option>
                                <option value="Referred to Store">
                                    Referred to Store
                                </option>
                                <option value="Payment Method">
                                    Payment Method
                                </option>
                                <option value="Checking Availability">
                                    Checking Availability
                                </option>
                                <option value="Case Closed - Shipping Damage">
                                    Case Closed - Shipping Damage
                                </option>
                                <option value="Case Closed - Forwarded to Warranty">
                                    Case Closed - Forwarded to Warranty
                                </option>
                                <option value="Case Closed - Forwarded to Tech">
                                    Case Closed - Forwarded to Tech
                                </option>
                                <option value="Case Closed - Customer Not Interested">
                                    Case Closed - Customer Not Interested
                                </option>
                                <option value="Case Closed - No Response (14 days)">
                                    Case Closed - No Response (14 days)
                                </option>
                                <option value="Case Closed - Not Willing to Buy">
                                    Case Closed - Not Willing to Buy
                                </option>
                                <option value="Case Closed - Parts Not Available">
                                    Case Closed - Parts Not Available
                                </option>
                                <option value="Case Closed - Has Existing Ticket">
                                    Case Closed - Has Existing Ticket
                                </option>
                                <option value="Case Closed - Resolved">
                                    Case Closed - Resolved
                                </option>
                                <option value="Case Closed - Survey Sent">
                                    Case Closed - Survey Sent
                                </option>
                                <option value="Case Closed - No Survey">
                                    Case Closed - No Survey
                                </option>
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
                    disabled={data.isHide == 'true'}
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

import { create_caseslog_service } from "@/app/services/cases-log-service";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { set_cases_log } from "@/app/pages/admin/users/redux/users-slice";
import { Button, message} from "antd";
export default function LogCaseSection({ datas, account }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState({
        isEscalate: "true",
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    async function submit_case_log(params) {
        setLoading(true);
        const res = await create_caseslog_service({
            ...data,
            ticket_id: datas.id,
            user_id: account.id,
            log_from: "handled",
        });
        setData({
            isEscalate: "true",
        });
        messageApi.open({
            type: "success",
            content: "Submitted Successfully",
        });
        dispatch(set_cases_log(res.data));
        setTimeout(()=>{
            setLoading(false);
        },1000)
    }
    return (
        <div>
            {contextHolder}
            <div class="text-gray-600 mb-4 mt-3">
                <p class="font-medium text-lg">Log Case</p>
                <div className="flex flex-1 gap-4 mt-1">
                    <p>Is this case a possible escalation?</p>
                    <div className="flex flex-1 justify-end gap-4">
                        <div class="flex items-center">
                            <input
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        isEscalate: e.target.value,
                                    })
                                }
                                checked
                                id="default-radio-1"
                                type="radio"
                                value="true"
                                name="default-radio"
                                class="w-4 h-4 text-black-600 bg-gray-100 border-gray-300 focus:ring-black-500   focus:ring-2"
                            />
                            <label
                                for="default-radio-1"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Yes
                            </label>
                        </div>
                        <div class="flex items-center">
                            <input
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        isEscalate: e.target.value,
                                    })
                                }
                                id="default-radio-2"
                                type="radio"
                                value="false"
                                name="default-radio"
                                class="w-4 h-4 text-black-600 bg-gray-100 border-gray-300 focus:ring-black-500 focus:ring-2"
                            />
                            <label
                                for="default-radio-2"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                No
                            </label>
                        </div>
                    </div>
                </div>

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
                        {datas.call_type == "CF-Warranty Claim" && (
                            <>
                                <option selected disabled>
                                    Select
                                </option>
                                <option value="Done for Destroy" >
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
                        {datas.call_type == "Parts" && (
                              <>
                                <option selected disabled>
                                    Select
                                </option>
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
                                <option
                                    value="Case Closed - Shipping Damage
"
                                >
                                    Case Closed - Shipping Damage
                                </option>
                                <option
                                    value=" Case Closed - Forwarded to Warranty

"
                                >
                                    Case Closed - Forwarded to Warranty
                                </option>
                                <option
                                    value="Case Closed - Forwarded to Tech
"
                                >
                                    Case Closed - Forwarded to Tech
                                </option>
                                <option
                                    value=" Case Closed - Customer Not Interested
"
                                >
                                    Case Closed - Customer Not Interested
                                </option>
                                <option
                                    value="Case Closed - No Response (14 days)
"
                                >
                                    Case Closed - No Response (14 days)
                                </option>
                                <option
                                    value="Case Closed - Not Willing to Buy
"
                                >
                                    Case Closed - Not Willing to Buy
                                </option>
                                <option
                                    value="Case Closed - Parts Not Available
"
                                >
                                    Case Closed - Parts Not Available
                                </option>
                                <option
                                    value="Case Closed - Has Existing Ticket
"
                                >
                                    Case Closed - Has Existing Ticket
                                </option>
                                <option
                                    value="Case Closed - Resolved 
"
                                >
                                    Case Closed - Resolved
                                </option>
                                <option
                                    value="Case Closed - Survey Sent
"
                                >
                                    Case Closed - Survey Sent
                                </option>
                                <option value="Case Closed - No Survey">
                                    Case Closed - No Survey
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
                    disabled={datas.is_reply == null?true:false}
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

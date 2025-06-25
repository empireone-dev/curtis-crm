import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

export default function CasesLogSection() {
    const { notes } = useSelector((state) => state.tickets);
    console.log('notesnotes',notes?.cases_logs)
    return (
        <div>
            <div className="text-2xl font-bold">Cases Logs</div>
            <div className="flex gap-5">
                <div className="flex-1">
                    <div class="text-gray-600 mb-2">
                        <p class="font-medium text-lg">Case Logs</p>
                    </div>
                    {notes?.cases_logs?.map((res, i) => {
                        return (
                            <div className="my-3">
                                <p>{res?.user?.name}</p>
                                <p>
                                    Logged the case as {res?.case_status}
                                    <br />
                                    On {moment(res?.created_at).format("LLL")}
                                </p>
                                <p>Remarks: {res?.remarks}</p>
                            </div>
                        );
                    })}
                </div>
                {/* <div className="flex-1">
                    <div class="text-gray-600 mb-2">
                        <p class="font-medium text-lg">Transfer Logs</p>
                    </div>
                    {notes?.cases_logs?.map((res, i) => {
                        return (
                            <div className="my-3">
                                {res?.transfer_from?.name} Transferred{" "}
                                {res?.ticket_id} to {res?.transfer_to?.name} on{" "}
                                {moment(res?.created_at).format("LLLL")}
                              
                            </div>
                        );
                    })}
                </div> */}
            </div>
        </div>
    );
}

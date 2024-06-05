import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

export default function CaseLogsSection() {
    const { cases_logs } = useSelector((state) => state.users);
    return (
        <div>
            <div class="text-gray-600 mb-2">
                <p class="font-medium text-lg">Case Logs</p>
            </div>
            {cases_logs.map((res, i) => {
                return (
                    <div className="my-3">
                        <p>{res.user.name}</p>
                        <p>
                            Logged the case as {res.case_status}<br />
                            On {moment(res.created_at).format('LLL')}
                        </p>
                        <p>Remarks: {res.remarks}</p>
                    </div>
                );
            })}
        </div>
    );
}

import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { Button, Dropdown, Space } from "antd";

export default function TicketSortSection() {
    const queryParams = new URLSearchParams(window.location.search);
    const callType = queryParams.get("call_type");
    const model = queryParams.get("model");
    const start = queryParams.get("start");
    const end = queryParams.get("end");
    const status = queryParams.get("status");
    const fullname = queryParams.get("fullname");
    const checked = queryParams.get("checked");
    const ticket_id = queryParams.get("ticket_id");

    const [data, setData] = useState({
        call_type: callType ?? null,
        start: start == "null" ? null : start ?? null,
        end: end == "null" ? null : start ?? null,
        model: model?.split(",") ?? null,
        status: status ?? null,
        fullname: fullname ?? null,
        checked: checked ?? null,
        ticket_id: ticket_id ?? null,
    });
    function sort_data1(value) {
        router.visit(
            window.location.pathname +
                "?page=1&" +
                "start=" +
                data.start +
                "&end=" +
                data.end +
                "&call_type=" +
                data.call_type +
                "&model=" +
                data.model +
                "&status=" +
                data.status +
                value 
        );
    }
    function sort_data2(value) {
        router.visit(
            window.location.pathname +
                "?page=1&" +
                "start=" +
                data.start +
                "&end=" +
                data.end +
                "&call_type=" +
                data.call_type +
                "&model=" +
                data.model +
                "&status=" +
                data.status +
                value
        );
    }
    function sort_data3(value) {
        router.visit(
            window.location.pathname +
                "?page=1&" +
                "start=" +
                data.start +
                "&end=" +
                data.end +
                "&call_type=" +
                data.call_type +
                "&model=" +
                data.model +
                "&status=" +
                data.status +
                value 
        );
    }

    const items = [
        {
            key: "1",
            label: (
                <button
                    onClick={() => sort_data1(`&checked=asc`)}
                    rel="noopener noreferrer"
                >
                   CHECKED
                </button>
            ),
        },
        {
            key: "2",
            label: (
                <button
                    onClick={() => sort_data1(`&checked=desc`)}
                    rel="noopener noreferrer"
                >
                    UNCHECK
                </button>
            ),
        },
        {
            key: "3",
            label: (
                <button
                    onClick={() => sort_data2(`&ticket_id=asc`)}
                    rel="noopener noreferrer"
                >
                    ASC TICKET ID
                </button>
            ),
        },
        {
            key: "4",
            label: (
                <button
                    onClick={() => sort_data2(`&ticket_id=desc`)}
                    rel="noopener noreferrer"
                >
                    DESC TICKET ID
                </button>
            ),
        },
        {
            key: "5",
            label: (
                <button
                    onClick={() => sort_data3(`&fullname=asc`)}
                    rel="noopener noreferrer"
                >
                    ASC FULLNAME
                </button>
            ),
        },
        {
            key: "6",
            label: (
                <button
                    onClick={() => sort_data3(`&fullname=desc`)}
                    rel="noopener noreferrer"
                >
                    DESC FULLNAME
                </button>
            ),
        },
    ];
    return (
        // <div className="flex px-3 gap-4">
        //     <button
        //         onClick={() =>
        //             sort_data1(
        //                 `&checked=${data.checked == "asc" ? "desc" : "asc"}`
        //             )
        //         }
        //         className="bg-blue-600 hover:bg-blue-700 p-1.5 px-2 rounded-md text-white"
        //     >
        //         ASC CHECKED
        //     </button>
        //     <button
        //         onClick={() =>
        //             sort_data2(
        //                 `&ticket_id=${data.ticket_id == "asc" ? "desc" : "asc"}`
        //             )
        //         }
        //         className="bg-blue-600 hover:bg-blue-700 p-1.5 px-2 rounded-md text-white"
        //     >
        //         ASC TICKET ID
        //     </button>
        //     <button
        //         onClick={() =>
        //             sort_data3(
        //                 `&fullname=${data.fullname == "asc" ? "desc" : "asc"}`
        //             )
        //         }
        //         className="bg-blue-600 hover:bg-blue-700 p-1.5 px-2 rounded-md text-white"
        //     >
        //         ASC FULLNAME
        //     </button>
        // </div>
        <>
            <Dropdown menu={{ items }} placement="bottomLeft">
                <Button>Sort Data</Button>
            </Dropdown>
        </>
    );
}

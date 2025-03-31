import React, { useEffect, useRef, useState } from "react";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Space, Tag, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDownTrayIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import TicketsSelectedExportSection from "./tickets-selected-export-section";
import store from "@/app/store/store";
import Table from "@/app/_components/table";
import TicketSortSection from "./ticket-sort-section";
import ShowAttachmentSection from "./show-attachment-section";

export default function TicketTableSection() {
    const { tickets, selectedRowKeys } = useSelector((state) => state.tickets);
    const queryParams = new URLSearchParams(window.location.search);
    const date_status = queryParams.get("date_status");

    const data = tickets?.data?.map((res) => {
        let filterDate = "";
        if (date_status == "Date Created") {
            filterDate = moment(res.created_at).format("LL");
        } else if (date_status == "Validation Date") {
            filterDate = moment(res?.validate?.created_at).format("LL");
        } else if (date_status == "Last Updated") {
            const combinedLogs = [...res?.agent_notes, ...res?.cases_logs];
            const latestCreatedAt = combinedLogs.reduce((latest, log) => {
                return moment(log.created_at).isAfter(moment(latest))
                    ? log.created_at
                    : latest;
            }, combinedLogs[0]?.created_at);

            filterDate = moment(latestCreatedAt).format("LL");
        } else {
            filterDate = moment(res.created_at).format("LL");
        }
        return {
            ...res,
            key: res.id,
            ticket_id: (() => {
                function route_link(data) {
                    if (data.call_type == "TS-Tech Support") {
                        return (
                            <Link
                                className="underline"
                                href={
                                    "/administrator/tickets/details/" +
                                    res.id +
                                    "/status"
                                }
                            >
                                <div className="flex gap-3">
                                    {res.pr && (
                                        <CheckBadgeIcon className="h-6 text-green-600" />
                                    )}
                                    {res.isExported && (
                                        <ArrowDownTrayIcon className="h-6 text-blue-600" />
                                    )}
                                    {res.ticket_id
                                        ? res.ticket_id
                                        : "Show More"}
                                </div>
                            </Link>
                        );
                    } else {
                        return (
                            <Link
                                className="underline"
                                href={
                                    "/administrator/tickets/details/" +
                                    res.id +
                                    "/files"
                                }
                            >
                                <div className="flex gap-3">
                                    {res.pr && (
                                        <CheckBadgeIcon className="h-6 text-green-600" />
                                    )}
                                    {res.isExported && (
                                        <ArrowDownTrayIcon className="h-6 text-blue-600" />
                                    )}
                                    {res.ticket_id
                                        ? res.ticket_id
                                        : "Show More"}
                                </div>
                            </Link>
                        );
                    }
                }
                return (
                    <Tooltip placement="topLeft" title="View Ticket Details">
                        {route_link(res)}
                    </Tooltip>
                );
            })(),
            fullname: (
                <div>
                    {res.fname} {res.lname}
                </div>
            ),
            issue: <Tag color={"blue"}>{res.issue}</Tag>,
            status: (() => {
                const color =
                    res.status === "CLOSED"
                        ? "red"
                        : res.status === "PARTS VALIDATION" ||
                          res.status === "WARRANTY VALIDATION" ||
                          res.status === "TECH VALIDATION" ||
                          res.status == null
                        ? "orange"
                        : "green";

                return (
                    <div className="flex gap-2">
                       {(res.status == "REPAIR SUCCESS" ||
                            res.status == "REPAIR UNSUCCESSFUL") && res.repair_information && (
                            <ShowAttachmentSection data={res} />
                        )}
                        <Tag color={color}>
                            {res.status === "PARTS VALIDATION" ||
                            res.status === "WARRANTY VALIDATION" ||
                            res.status === "TECH VALIDATION" ||
                            res.status == null
                                ? "OPEN"
                                : res.status}
                        </Tag>
                     
                        {res.is_reply && (
                            <Tag color="purple">
                                Customer has responded on{" "}
                                {moment(res.email_date).format("LL")}
                            </Tag>
                        )}
                    </div>
                );
            })(), // Call the function immediately to return the JSX
            isUploading: (() => {
                const color = res.isUploading == "true" ? "green" : "red";

                return (
                    <>
                        <Tag color={color} key={res.id}>
                            {res.isUploading == "true" ? "UPLOADED" : "PENDING"}
                        </Tag>
                    </>
                );
            })(),
            created_at: <div>{filterDate}</div>,
        };
    });

    const columns = [
        {
            title: "Ticket ID",
            dataIndex: "ticket_id",
            key: "ticket_id",
            isSort: true,
        },
        {
            title: "Fullname",
            dataIndex: "fullname",
            key: "fullname",
            isSort: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            isSort: false,
        },
        {
            title: "Resolution",
            dataIndex: "call_type",
            key: "call_type",
            isSort: false,
        },
        {
            title: "Issue",
            dataIndex: "issue",
            key: "issue",
            isSort: false,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            isSort: false,
        },

        {
            title: "IsUpload",
            dataIndex: "isUploading",
            key: "isUploading",
            isSort: false,
        },
        {
            title: date_status ?? "Created At",
            dataIndex: "created_at",
            key: "created_at",
            isSort: false,
        },
    ];

    const url = window.location.pathname + window.location.search;

    const getQueryParam = (url, paramName) => {
        const searchParams = new URLSearchParams(url.split("?")[1]);
        return searchParams.get(paramName);
    };

    const page = getQueryParam(url, "page");
    const currentPage = page ? parseInt(page, 10) : 1; // Ensure currentPage is a number

    const onChangePaginate = (page) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", page);
        const newUrl = window.location.pathname + "?" + searchParams.toString();
        router.visit(newUrl);
    };

    const isStatus = getQueryParam(url, "status");
    console.log("isStatus", isStatus);
    return (
        <>
            {isStatus && (
                <TicketsSelectedExportSection selected={selectedRowKeys} />
            )}
            {data && (
                <>
                    {/* <div className="py-3">
                        <TicketSortSection />
                    </div> */}
                    <Table
                        isStatus={isStatus}
                        columns={columns}
                        data={data}
                        dataChecked={selectedRowKeys}
                        isCheckbox={true}
                    />
                    <div className="py-4 bg-white w-full flex items-center justify-end">
                        <Pagination
                            onChange={onChangePaginate}
                            defaultCurrent={currentPage}
                            total={tickets.total}
                            showSizeChanger={false}
                        />
                    </div>
                </>
            )}
        </>
    );
}

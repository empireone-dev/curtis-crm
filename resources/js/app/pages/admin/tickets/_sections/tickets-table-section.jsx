import React, { useMemo } from "react";
import { Pagination, Table, Tag, Tooltip } from "antd";
import { Link, router } from "@inertiajs/react";
import { useSelector } from "react-redux";
import moment from "moment";
import { ArrowDownTrayIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import TicketsSelectedExportSection from "./tickets-selected-export-section";
import ShowAttachmentSection from "./show-attachment-section";

// --- Helper Functions (Defined outside component to prevent recreation on re-render) ---

const getStatusColor = (status) => {
    if (status === "CLOSED") return "red";
    if (["PARTS VALIDATION", "WARRANTY VALIDATION", "TECH VALIDATION", null].includes(status)) return "orange";
    return "green";
};

const getDisplayStatus = (status) => {
    if (["PARTS VALIDATION", "WARRANTY VALIDATION", "TECH VALIDATION", null].includes(status)) return "OPEN";
    return status;
};

const getFilterDate = (record, dateStatus) => {
    if (dateStatus === "Validation Date") {
        return moment(record?.validate?.created_at).format("LL");
    }
    if (dateStatus === "Last Updated") {
        const combinedLogs = [...(record?.agent_notes || []), ...(record?.cases_logs || [])];
        if (!combinedLogs.length) return moment(record.created_at).format("LL");

        const latestCreatedAt = combinedLogs.reduce((latest, log) => {
            return moment(log.created_at).isAfter(moment(latest)) ? log.created_at : latest;
        }, combinedLogs[0]?.created_at);

        return moment(latestCreatedAt).format("LL");
    }
    return moment(record.created_at).format("LL");
};

export default function TicketTableSection({ loading }) {
    const { tickets, selectedRowKeys } = useSelector((state) => state.tickets);

    // Safely parse URL params once
    const queryParams = useMemo(() => new URLSearchParams(typeof window !== "undefined" ? window.location.search : ""), []);
    const date_status = queryParams.get("date_status");
    const isStatus = queryParams.get("status");

    // 1. Prepare raw data (Only append the required 'key')
    const dataSource = useMemo(() => {
        return tickets?.data?.map((res) => ({
            ...res,
            key: res.id,
        })) || [];
    }, [tickets]);
    console.log('datassssssss',tickets)

    // 2. Define columns with rendering logic built-in
    const columns = useMemo(() => [
        {
            title: "Ticket ID",
            dataIndex: "ticket_id",
            key: "ticket_id",
            sorter: true,
            render: (ticketId, record) => {
                const path = record.status === "CLOSED" ? "activities" : "status";
                const href = record.call_type === "TS-Tech Support"
                    ? `/administrator/tickets/details/${record.id}/${path}`
                    : `/administrator/tickets/details/${record.id}/files`;

                return (
                    <Tooltip placement="topLeft" title="View Ticket Details">
                        <Link className="underline" href={href}>
                            <div className="flex gap-3 items-center">
                                {record.pr && <CheckBadgeIcon className="h-6 text-green-600" />}
                                {record.isExported && <ArrowDownTrayIcon className="h-6 text-blue-600" />}
                                {ticketId || "Show More"}
                            </div>
                        </Link>
                    </Tooltip>
                );
            }
        },
        {
            title: "Fullname",
            key: "fullname",
            sorter: true,
            render: (_, record) => <div>{record.fname} {record.lname}</div>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Resolution",
            dataIndex: "call_type",
            key: "call_type",
        },
        {
            title: "Issue",
            dataIndex: "issue",
            key: "issue",
            render: (issue) => <Tag color="blue">{issue}</Tag>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status, record) => (
                <div className="flex gap-2">
                    {["REPAIR SUCCESS", "REPAIR UNSUCCESSFUL"].includes(status) && record.repair_information && (
                        <ShowAttachmentSection data={record} />
                    )}
                    <Tag color={getStatusColor(status)}>
                        {getDisplayStatus(status)}
                    </Tag>
                    {record.is_reply && (
                        <Tag color="purple">
                            Customer has responded on {moment(record.email_date).format("LL")}
                        </Tag>
                    )}
                </div>
            ),
        },
        {
            title: "IsUpload",
            dataIndex: "isUploading",
            key: "isUploading",
            render: (isUploading) => (
                <Tag color={isUploading === "true" ? "green" : "red"}>
                    {isUploading === "true" ? "UPLOADED" : "PENDING"}
                </Tag>
            ),
        },
        {
            title: date_status || "Created At",
            key: "created_at",
            render: (_, record) => <div>{getFilterDate(record, date_status)}</div>,
        },
    ], [date_status]);

    const currentPage = Number(queryParams.get("page"));

    const onChangePaginate = (page) => {
        // route().params grabs all current URL filters (status, call_type, etc.)
        // We spread them into a new object and overwrite/add the 'page' variable
        router.get(window.location.pathname, {
            ...route().params,
            page: page
        });
    };
    return (
        <>
            {isStatus && <TicketsSelectedExportSection selected={selectedRowKeys} />}

            <Table
                loading={loading}
                columns={columns}
                dataSource={dataSource} // Use standard Antd dataSource prop
                rowSelection={{
                    selectedRowKeys,
                    // Note: onChange handler needed here if you want Antd native row selection to work and sync to Redux
                }}
                pagination={false} // Disable Antd's built-in pagination if you use a custom external one
            />

            <div className="py-4 bg-white w-full flex items-center justify-end">
                <div className="py-4 bg-white w-full flex items-center justify-end">
                    <Pagination
                        current={currentPage}
                        total={tickets?.total || 0} // Safely access total from Redux
                        pageSize={tickets?.per_page || 10} // Adjust this if your backend returns a different per-page limit
                        onChange={onChangePaginate}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </>
    );
}
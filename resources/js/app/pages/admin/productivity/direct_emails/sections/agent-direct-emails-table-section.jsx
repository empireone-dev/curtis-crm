import React, { useEffect, useRef, useState } from "react";
import {
    ExclamationCircleFilled,
    FolderOpenFilled,
    SearchOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import { direct_emails_service } from "@/app/services/tickets-service";
import moment from "moment-timezone";
import { router } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AgentDirectEmailsTableSection({ account }) {
    const { users } = useSelector((state) => state.users);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [dataTable, setDataTable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    // Row selection and action states
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [deleting, setDeleting] = useState(false);

    const fetch_data = async () => {
        setLoading(true);
        try {
            const res = await direct_emails_service(
                account.id,
                window.location.search ?? "page=1"
            );
            setDataTable(res.result);
            setTotal(res.ticket_count);
        } catch (error) {
            console.error("Error fetching direct emails:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch_data();
    }, []);

    // Handle Selection Change
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // Remove single direct email
    const handleRemoveSingle = async (id) => {
        if (
            window.confirm("Are you sure you want to remove this direct email?")
        ) {
            setDeleting(true);
            try {
                await axios.post("/api/remove_unread_email", {
                    ticket_ids: [id],
                });
                await fetch_data();
                setSelectedRowKeys((prev) => prev.filter((key) => key !== id));

                Swal.fire({
                    icon: "success",
                    title: "Removed!",
                    text: "Direct email removed successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error("Error deleting item:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to remove direct email.",
                });
            } finally {
                setDeleting(false);
            }
        }
    };

    // Bulk Delete selected direct emails
    const handleDeleteSelected = async () => {
        if (
            window.confirm(
                `Are you sure you want to remove ${selectedRowKeys.length} direct email(s)?`
            )
        ) {
            setDeleting(true);
            try {
                await axios.post("/api/remove_direct_email", {
                    ticket_ids: selectedRowKeys,
                });
                await fetch_data();
                setSelectedRowKeys([]);

                Swal.fire({
                    icon: "success",
                    title: "Done!",
                    text: "Selected direct emails removed successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error("Error deleting selected items:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to remove selected items.",
                });
            } finally {
                setDeleting(false);
            }
        }
    };

    const newDataTable = Object.entries(dataTable).map((res) => ({
        ...res[1],
    }));

    const data = newDataTable.map((res, i) => ({
        key: res.id ?? i,
        email: res.email,
        date: res.email_date,
        time_span: res.email_date,
        due_date: moment(res.due_date).format("LLL"),
        link: res.threadId,
        id: res.id,
        assigned: res?.user?.name ?? "N/A",
    }));

    const columns = [
        {
            title: "Assigned to",
            dataIndex: "assigned",
            key: "assigned",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Time Span",
            dataIndex: "time_span",
            key: "time_span",
            width: "20%",
            render: (_, record) => (
                <>{moment(record?.time_span).fromNow()}</>
            ),
        },
        {
            title: "Added On",
            dataIndex: "date",
            key: "date",
            render: (_, record) => (
                <>
                    {moment(record.due_date)
                        .subtract(24, "hours")
                        .tz("America/New_York")
                        .format("LLL")}
                </>
            ),
        },
        {
            title: "Due Date",
            dataIndex: "due_date",
            key: "due_date",
            render: (_, record) => record.due_date,
        },
        {
            title: "Action",
            dataIndex: "overdue_direct_emails",
            key: "overdue_direct_emails",
            render: (_, record) => {
                const str = record?.email;
                const emailRegex =
                    /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
                const match = str?.match(emailRegex);
                const email = match ? match[1] : null;

                return (
                    <a
                        target="_blank"
                        href={`${window.location.pathname}/${record?.id}?email=${email ?? ""}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-sm px-3"
                    >
                        VIEW
                    </a>
                );
            },
        },
    ];

    return (
        <div>
            <div className="p-3 rounded-md space-y-4">
                {/* Bulk Action Header */}
                <div className="flex justify-between items-center">
                    <Button
                        type="primary"
                        danger
                        onClick={handleDeleteSelected}
                        loading={deleting}
                        disabled={selectedRowKeys.length === 0 || deleting}
                        className="w-52"
                    >
                        {selectedRowKeys.length} DELETE DIRECT EMAIL
                    </Button>
                </div>

                <Table
                    rowKey="id"
                    rowSelection={rowSelection}
                    loading={loading}
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </div>
    );
}
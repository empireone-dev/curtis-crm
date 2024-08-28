import React, { useRef, useState } from "react";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { useSelector } from "react-redux";

export default function TicketTableSection() {
    const { tickets } = useSelector((state) => state.tickets);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    // const datas = {
    //     ...tickets,
    //     ...tickets.map(res => res.id),
    // }
    // console.log('datas', datas)
    const data = tickets?.data?.map((res, i) => ({
        ...res,
        key: res.id,
    }));
    // console.log('ticket.map(res => res.id)',tickets.map(res => res.id))
    const columns = [
        {
            title: "Ticket ID",
            dataIndex: "ticket_id",
            key: "ticket_id",
            // ...getColumnSearchProps("ticket_id"),
        },
        {
            title: "Fullname",
            dataIndex: "fullname",
            key: "fullname",
            // ...getColumnSearchProps("fullname"),
            render: (_, record, i) => {
                return (
                    <div color={"red"} key={i}>
                        {record.fname} {record.lname}
                    </div>
                );
            },
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            // ...getColumnSearchProps("email"),
        },
        {
            title: "Resolution",
            dataIndex: "call_type",
            key: "call_type",
            // ...getColumnSearchProps("call_type"),
        },
        {
            title: "Issue",
            dataIndex: "issue",
            key: "issue",
            // ...getColumnSearchProps("issue"),
            render: (_, record, i) => {
                return (
                    <Tag color={"blue"} key={i}>
                      {record.issue}
                    </Tag>
                );
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            // ...getColumnSearchProps("status"),
            render: (_, record, i) => {
                const color =
                    record.status == "CLOSED"
                        ? "red"
                        : record.status == "PARTS VALIDATION" ||
                          record.status == "WARRANTY VALIDATION" ||
                          record.status == "TECH VALIDATION" ||
                          record.status == null
                        ? "orange"
                        : "green";
                return (
                    <>
                        <Tag color={color} key={i}>
                            {record.status == "PARTS VALIDATION" ||
                            record.status == "WARRANTY VALIDATION" ||
                            record.status == "TECH VALIDATION" ||
                            record.status == null
                                ? "OPEN"
                                : record.status}
                        </Tag>
                        {record.cases_status == 'handled' && <Tag color="purple">Customer has responded on {moment(record.email_date).format('LLL')}</Tag>}
                    </>
                );
            },
        },

        {
            title: "IsUpload",
            dataIndex: "isUploading",
            key: "isUploading",
            // ...getColumnSearchProps("isUploading"),
            render: (_, record, i) => {
                const color = record.isUploading == "true" ? "green" : "red";
                return (
                    <>
                        <Tag color={color} key={i}>
                            {record.isUploading == "true"
                                ? "UPLOADED"
                                : "PENDING"}
                        </Tag>
                    </>
                );
            },
        },
        {
            title: "Created At",
            dataIndex: "status",
            key: "status",
            render: (_, record, i) => {
                return <div>{moment(record.created_at).format("LLL")}</div>;
            },
        },
        {
            title: "action",
            dataIndex: "action",
            render: (_, record) => {
                function route_link(data) {
                    if (data.call_type == "TS-Tech Support") {
                        return (
                            <Link
                                href={
                                    "/administrator/tickets/details/" +
                                    record.id +
                                    "/status"
                                }
                            >
                                <EyeOutlined className="text-lg text-blue-500" />
                            </Link>
                        );
                    } else {
                        return (
                            <Link
                                href={
                                    "/administrator/tickets/details/" +
                                    record.id +
                                    "/files"
                                }
                            >
                                <EyeOutlined className="text-lg text-blue-500" />
                            </Link>
                        );
                    }
                }
                return (
                    <Tooltip placement="topLeft" title="View Ticket Details">
                        {route_link(record)}
                    </Tooltip>
                );
            },
        },
    ];


    const url = window.location.pathname + window.location.search;

    const getQueryParam = (url, paramName) => {
        const searchParams = new URLSearchParams(url.split("?")[1]);
        return searchParams.get(paramName);
    };

    const page = getQueryParam(url, "page");
    const currentPage = page ? parseInt(page, 10) : 1; // Ensure currentPage is a number

    const paginationConfig = {
        current: currentPage,
        pageSize: pageSize,
        total: tickets?.last_page * pageSize, // Replace tickets with your actual data source
        onChange: (currentPage, pageSize) => {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("page", currentPage);
            const newUrl =
                window.location.pathname + "?" + searchParams.toString();

            // Example of what to do with the new URL (replace with your logic)
            console.log("Navigating to:", newUrl);
            router.visit(newUrl)
            // Example of setting state with currentPage and pageSize
            setCurrent(currentPage);
            setPageSize(pageSize);

            // Example of navigation using router (replace with your logic)
            // router.visit(newUrl);
        },
    };
    return (
        <Table
            columns={columns}
            pagination={paginationConfig}
            dataSource={data}
        />
    );
}

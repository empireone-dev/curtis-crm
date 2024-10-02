import React, { useRef, useState } from "react";
import {
    ExclamationCircleFilled,
    FolderOpenFilled,
    SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import ProductivitySearchSection from "./productivity-search-section";
import ProductivityDateSection from "./productivity-date-section";
import { useSelector } from "react-redux";
import { Link } from "@inertiajs/react";
import ProductivityDirectEmailSection from "./productivity-direct-email-section";

export default function ProductivityTableSection() {
    const { users } = useSelector((state) => state.users);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
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

    const data = users
        .map((res, i) =>
            res.agent_type === "Warranty" || res.agent_type === "Parts"
                ? {
                      id: res.id,
                      agent: res.name,
                      position: res.agent_type,
                      overdue_cases: res.overdue_cases,
                      cases_due_today: res.cases_due_today,
                      overdue_direct_emails: res.overdue_direct_emails,
                      direct_emails_due_today: res.direct_emails_due_today,
                      handled_cases: res.handled_cases,
                      handled_direct_emails: res.handled_direct_emails,
                      total:
                          parseInt(res.handled_cases) +
                          parseInt(res.handled_direct_emails),
                  }
                : null
        )
        .filter((item) => item !== null);

    const columns = [
        {
            title: "Agent",
            dataIndex: "agent",
            key: "agent",
            // ...getColumnSearchProps('app_id'),
        },
        // {
        //     title: "Position",
        //     dataIndex: "position",
        //     key: "position",
        //     // ...getColumnSearchProps('app_id'),
        // },
        {
            title: "Overdue Cases",
            dataIndex: "overdue_cases",
            key: "overdue_cases",
            // ...getColumnSearchProps('app_name'),
            render: (_, record, i) => {
                return (
                    <Link
                        href={`/administrator/productivity/${record.id}?page=1&search=over_due`}
                        className="underline"
                        key={i}
                    >
                        {record.overdue_cases}
                    </Link>
                );
            },
        },
        {
            title: "Cases Due Today",
            dataIndex: "cases_due_today",
            key: "cases_due_today",
            render: (_, record, i) => {
                return (
                    <Link
                        href={`/administrator/productivity/${record.id}?page=1&search=due_today`}
                        className="underline"
                        key={i}
                    >
                        {record.cases_due_today}
                    </Link>
                );
            },
        },
        {
            title: "Overdue Direct Emails",
            dataIndex: "overdue_direct_emails",
            key: "overdue_direct_emails",
            // ...getColumnSearchProps('app_name'),
            render: (_, record, i) => {
                return (
                    <Link
                        href={`/administrator/productivity/direct_emails/${record.id}?page=1&search=over_due`}
                        className="underline"
                        key={i}
                    >
                        {record.overdue_direct_emails}
                    </Link>
                );
            },
        },

        {
            title: "Direct Emails Due Today",
            dataIndex: "direct_emails_due_today",
            key: "direct_emails_due_today",
            // ...getColumnSearchProps('app_name'),
            render: (_, record, i) => {
                return (
                    <Link
                        href={`/administrator/productivity/direct_emails/${record.id}?page=1&search=due_today`}
                        className="underline"
                        key={i}
                    >
                        {record.direct_emails_due_today}
                    </Link>
                );
            },
        },
        {
            title: "Handled Cases",
            dataIndex: "handled_cases",
            key: "handled_cases",
            // ...getColumnSearchProps('app_name'),
        },
        {
            title: "Handled Direct Emails",
            dataIndex: "handled_direct_emails",
            key: "handled_direct_emails",
            // ...getColumnSearchProps('app_name'),
        },

        {
            title: "Total",
            dataIndex: "total",
            key: "total",
        },
    ];

    return (
        <div>
            <div className="p-3 rounded-md">
                <div className="flex gap-5">
                    <ProductivityDateSection />
                    <ProductivitySearchSection />
                    <ProductivityDirectEmailSection />
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
}

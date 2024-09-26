import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, Tag } from "antd";
import { cases_service } from "@/app/services/tickets-service";
import { setTickets } from "../tickets/redux/customer-tickets-slice";
import AgentLayout from "@/app/layouts/agent/agent-layout";
import AgentOpenCasesListSection from "./sections/agent-open-cases-list-section";
import Skeleton from "@/app/layouts/components/skeleton";
import AgentOpenCasesPaginationSection from "./sections/agent-open-cases-pagination-section";
import { router } from "@inertiajs/react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";

export default function AgentOpenCasesEMail({ auth }) {
    const { tickets } = useSelector((state) => state.customer_tickets);
    const [loading, setLoading] = useState(true);
    const account = auth.user;
    const dispatch = useDispatch();
    const cases = window.location.pathname.split("/")[2];

    useEffect(() => {
        async function fetch_date(params) {
            const res = await cases_service(
                window.location.search,
                cases,
                account.id
            );
            dispatch(setTickets(res));
            setLoading(false);
        }
        fetch_date();
    }, []);

    function addDaysSkippingWeekends(date) {
        let dueDate = moment(date);
        let dayOfWeek = dueDate.day();

        if (dayOfWeek === 4) {
            // Thursday (4), add 4 days to make it Monday (1)
            dueDate = dueDate.add(4, "days");
        } else if (dayOfWeek === 5) {
            // Friday (5), add 4 days to make it Tuesday (2)
            dueDate = dueDate.add(4, "days");
        } else if (dayOfWeek === 6) {
            // Saturday (6), add 3 days to make it Tuesday (2)
            dueDate = dueDate.add(3, "days");
        } else if (dayOfWeek === 0) {
            // Sunday (0), add 2 days to make it Tuesday (2)
            dueDate = dueDate.add(2, "days");
        } else {
            dueDate = dueDate.add(2, "days");
        }
        return dueDate.format("LL");
    }
    

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
    const columns = [
        {
            title: "Added On",
            dataIndex: "email_date",
            key: "email_date",
            width: "30%",
            // ...getColumnSearchProps("date"),
            render: (_, record, i) => {
                return <>{moment(record.email_date).format("LL")}</>;
            },
        },
        {
            title: "Due On",
            dataIndex: "email_date",
            key: "email_date",
            width: "20%",
            ...getColumnSearchProps("email_date"),
            render: (_, record, i) =>
                addDaysSkippingWeekends(moment(record.email_date)),
        },
        {
            title: "Case File",
            dataIndex: "ticket_id",
            key: "ticket_id",
            ...getColumnSearchProps("ticket_id"),
            render: (_, record, i) => {
                return record.ticket_id;
            },
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
        },
        {
            title: "Is Reply",
            dataIndex: "is_reply",
            key: "is_reply",
            // ...getColumnSearchProps("is_reply"),
            render: (_, record, i) => {
                if (record.is_reply) {
                    return <Tag color="red">Email Reply</Tag>;
                } else {
                    <Tag color="red">red</Tag>
                }
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            // ...getColumnSearchProps("action"),
            render: (_, record, i) => (
                <button
                    onClick={() =>
                        window.open(
                            `/agent/customer_details/${`${record.ticket_id}`}`,
                            "_blank"
                        )
                    }
                    className="text-white bg-green-500 px-5 py-1.5 rounded-md"
                >
                    VIEW
                </button>
            ),
        },
    ];
    return (
        <AgentLayout account={account}>
            <div className="p-3 flex gap-5 flex-col justify-between w-full h-full">
                {loading ? (
                    <div>
                        <Skeleton />
                    </div>
                ) : (
                    <div>
                        <Table
                            pagination={true}
                            columns={columns}
                            // dataSource={
                            //     Object.entries(tickets.result).map((res) => ({
                            //         ...res[1],
                            //     })) ?? []
                            // }
                            dataSource={Object.entries(tickets.result).map(res=>res[1]).sort((a, b) => new Date(a.email_date) - new Date(b.email_date)) ?? []}
                        />
                    </div>
                )}
                <div className="flex items-center justify-end">
                    {/* <AgentOpenCasesPaginationSection /> */}
                </div>
            </div>
        </AgentLayout>
    );
}

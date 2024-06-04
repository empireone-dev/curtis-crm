import {
    EyeDropperIcon,
    PencilIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import UserEditSection from "./user-edit-section";
import UserDeleteSection from "./user-delete-section";
import UserViewSection from "./user-view-section";
import { Button, Input, Space, Table, Tag, Tooltip } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "@inertiajs/react";

export default function UsersTableSection() {
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

    const data = users.map((res, i) => ({
        ...res,
        key: res.id,
    }));
    // console.log('ticket.map(res => res.id)',tickets.map(res => res.id))
    const columns = [
        {
            title: "Employee ID",
            dataIndex: "emp_id",
            key: "emp_id",
            ...getColumnSearchProps("emp_id"),
        },
        {
            title: "Fullname",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
            render: (_, record, i) => {
                return (
                    <div color={"red"} key={i}>
                        {record.name}
                    </div>
                );
            },
        },
        // {
        //     title: "Handled Cases",
        //     dataIndex: "email",
        //     key: "email",
        //     ...getColumnSearchProps("email"),
        // },
        // {
        //     title: "Handled Direct Emails",
        //     dataIndex: "agent_type",
        //     key: "agent_type",
        //     // ...getColumnSearchProps("agent_type"),
        //     render: (_, record, i) => {
        //         console.log("record", record);
        //         return (
        //             <Tag color={"blue"} key={i}>
        //                 {record.agent_type ?? ""}
        //             </Tag>
        //         );
        //     },
        // },
        // {
        //     title: "Remaining Open Cases",
        //     dataIndex: "agent_type",
        //     key: "agent_type",
        //     // ...getColumnSearchProps("agent_type"),
        //     render: (_, record, i) => {
        //         console.log("record", record);
        //         return (
        //             <Tag color={"blue"} key={i}>
        //                 {record.agent_type ?? ""}
        //             </Tag>
        //         );
        //     },
        // },
        {
            title: "Handled Cases",
            dataIndex: "agent_type",
            key: "agent_type",
            // ...getColumnSearchProps("agent_type"),
            render: (_, record, i) => {
                console.log("record", record);
                return (
                    <Tooltip placement="topLeft" title="View Ticket Cases">
                        <button
                            className="text-blue-500 underline"
                            onClick={() =>
                                (window.location.href =
                                    "/administrator/users/" +
                                    record.id +
                                    "/cases/open_cases?page=1")
                            }
                        >
                            Visit Cases
                        </button>
                    </Tooltip>
                );
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            ...getColumnSearchProps("status"),
            render: (_, record, i) => {
                const color = "green";
                return (
                    <>
                        <Tag color={color} key={i}>
                            ACTIVE
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
                return (
                    <Tooltip placement="topLeft" title="View Ticket Details">
                        <Link href={"/administrator/users/" + record.id}>
                            <EyeOutlined className="text-lg text-blue-500" />
                        </Link>
                    </Tooltip>
                );
            },
        },
    ];
    return (
        <section className="px-4 py-12 mx-auto bg-white">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800">
                            Users Table
                        </h2>
                    </div>
                </div>

                <div className="flex items-center mt-4 gap-x-3">
                    <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600  ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <span>Create User</span>
                    </button>
                </div>
            </div>
            <div className="mt-6 md:flex md:items-center md:justify-between my-3">
                <div className="relative flex items-center mt-4 md:mt-0">
                    <span className="absolute">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 mx-3 text-gray-400 "
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </span>

                    <input
                        type="text"
                        placeholder="Search"
                        className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5    focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
            </div>
            <Table columns={columns} dataSource={data} />
        </section>
    );
}

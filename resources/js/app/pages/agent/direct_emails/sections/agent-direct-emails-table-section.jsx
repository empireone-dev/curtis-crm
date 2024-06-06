import React, { useEffect, useRef, useState } from "react";
import {
    ExclamationCircleFilled,
    FolderOpenFilled,
    SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
// import ProductivitySearchSection from './productivity-search-section';
// import ProductivityDateSection from './productivity-date-section';
import { useSelector } from "react-redux";
import { direct_emails_service } from "@/app/services/tickets-service";

export default function AgentDirectEmailsTableSection() {
    const { users } = useSelector((state) => state.users);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [dataTable, setDataTable] = useState([]);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    useEffect(() => {
        async function fetch_data() {
            const res = await direct_emails_service();
            setDataTable(res);
        }
        fetch_data();
    }, []);

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

    // const data = [
    //     {
    //         key: '1',
    //         overdue_cases: 32,
    //         overdue_direct_emails: 32,
    //         cases_due_today: 32,
    //         direct_emails_due_today: 32,
    //         handled_cases: 32,
    //         handled_direct_emails: 'John Brown',
    //         total: '8',
    //         agent: '24',
    //     },

    // ];

    // const data = dataTable?.result?.map((res,i)=>({
    //     email:res?.email[0]?.from,
    //     position:res.agent_type,
    //     handled_cases:res.handled_count
    // }))
    const emailRegex = /<?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>?/g;

    
    const extractedEmails = dataTable?.result?.map((res, i) => ({
        email:res.emails[0].from.match(emailRegex)
    })).filter(email => email !== null);
    const data = extractedEmails;
    console.log("extractedEmails", extractedEmails);
    const columns = [
        {
            title: "Added On",
            dataIndex: "agent",
            key: "agent",
            // ...getColumnSearchProps('app_id'),
        },
        {
            title: "Due On",
            dataIndex: "position",
            key: "position",
            // ...getColumnSearchProps('app_id'),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            // ...getColumnSearchProps('app_name'),
        },
        {
            title: "Action",
            dataIndex: "overdue_direct_emails",
            key: "overdue_direct_emails",
            // ...getColumnSearchProps('app_name'),
        },
    ];

    return (
        <div>
            <div className="p-3 rounded-md">
                <div className="flex">
                    {/* <ProductivityDateSection/>
                <ProductivitySearchSection/> */}
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
}

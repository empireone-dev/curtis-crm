import React, { useRef, useState } from "react";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { useSelector } from "react-redux";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function ProductRegistrationTableSection() {
    const { products } = useSelector((state) => state.product_registration);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        // confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
        router.visit(
            `/agent/product_registration?${dataIndex}=` + selectedKeys
        );
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
                    onChange={(e) => {
                        console.log('dataIndex',e.target.value)
                        if (dataIndex == "phone") {
                            if (e.target.value?.replace(/\D/g, '').length <= 10) {
                                setSelectedKeys(
                                    e.target.value ? [e.target.value?.replace(/\D/g, '').replace(
                                        /(\d{3})(\d{3})(\d{4})/,
                                        "($1) $2-$3"
                                    )] : []
                                );
                            }
                        } else if (dataIndex != "phone") {
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            );
                        }
                    }}
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
    //     ...products,
    //     ...products.map(res => res.id),
    // }
    // console.log('datas', datas)
    const data = products?.data?.map((res, i) => ({
        ...res,
        key: res.id,
    }));
    // console.log('ticket.map(res => res.id)',products.map(res => res.id))
    const columns = [
        {
            title: "Product ID",
            dataIndex: "id",
            key: "id",
            // ...getColumnSearchProps("ticket_id"),
        },
        {
            title: "First Name",
            dataIndex: "fname",
            key: "fname",
            ...getColumnSearchProps("fname"),
        },
        {
            title: "Last Name",
            dataIndex: "lname",
            key: "lname",
            ...getColumnSearchProps("lname"),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            ...getColumnSearchProps("phone"),
        },
        {
            title: "Serial #",
            dataIndex: "serial",
            key: "serial",
            ...getColumnSearchProps("serial"),
            render: (_, record, i) => {
                return (
                    <div className="flex gap-1" key={i}>
                        {record.ticket && (
                            <CheckBadgeIcon className="h-6  text-green-600" />
                        )}
                        {record.serial}
                    </div>
                );
            },
        },
        {
            title: "Model",
            dataIndex: "model",
            key: "model",
            ...getColumnSearchProps("model"),
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                function route_link(data) {
                    return (
                        <Link
                            href={
                                "/agent/product_registration/" +
                                record.id
                            }
                        >
                            <EyeOutlined className="text-lg text-blue-500" />
                        </Link>
                    );
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
        total: products?.last_page * pageSize, // Replace products with your actual data source
        onChange: (currentPage, pageSize) => {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("page", currentPage);
            const newUrl =
                window.location.pathname + "?" + searchParams.toString();

            // Example of what to do with the new URL (replace with your logic)
            console.log("Navigating to:", newUrl);
            router.visit(newUrl);
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

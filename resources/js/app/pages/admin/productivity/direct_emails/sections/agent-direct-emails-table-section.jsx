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
import moment from "moment";
import { router } from "@inertiajs/react";

export default function AgentDirectEmailsTableSection({ account }) {
    const { users } = useSelector((state) => state.users);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [dataTable, setDataTable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
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
            const res = await direct_emails_service(
                account.id,
                window.location.search ?? "page=1"
            );
            setDataTable(res.result);
            setTotal(res.ticket_count);
            setLoading(false);
        }
        fetch_data();
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
    const newDataTable = Object.entries(dataTable).map((res) => ({
        ...res[1],
    }));
    const data = newDataTable.map((res, i) => ({
        key: i,
        email: res.email,
        date: moment(res.true_email_date).format("LLL"),
        due_date:moment(res.email_date).format("LLL"),
        link: res.threadId,
        id: res.id,
        assigned: res?.user?.name ?? "N/A",
    }));
    console.log("datadata", data);
    const columns = [
        {
            title: "Assigned to",
            dataIndex: "assigned",
            key: "assigned",
            // ...getColumnSearchProps('app_name'),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            // ...getColumnSearchProps('app_name'),
        },
        {
            title: "Date Completed",
            dataIndex: "date",
            key: "date",
            // ...getColumnSearchProps('app_name'),
        },
        {
            title: "Due Date",
            dataIndex: "due_date",
            key: "due_date",
            render: (_, record) => {
                return record.due_date;
            },
        },
        // {
        //     title: "Email Link",
        //     dataIndex: "link",
        //     key: "link",
        //     render: (_, record) => (
        //         <a href={'https://mail.google.com/mail/u/0/#inbox/'+record?.link} target="_blank">
        //             {'https://mail.google.com/mail/u/0/#inbox/'+record?.link}
        //         </a>
        //     )
        // },
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
                        href={`${window.location.pathname}/${
                            record?.id
                        }?email= ${email ?? ""}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-sm px-3"
                    >
                        VIEW
                    </a>
                );
            },
        },
    ];
    // const paginationConfig = {
    //     showSizeChanger: false,
    //     current: parseInt(window.location.search.split("=")[1] ?? 1),
    //     pageSize: pageSize,
    //     total: total,
    //     onChange: (page, pageSize) => {
    //         router.visit(window.location.pathname + `?page=${page}`);
    //     },
    // };
    return (
        <div>
            <div className="p-3 rounded-md">
                <div className="flex">
                    {/* <ProductivityDateSection/>
                <ProductivitySearchSection/> */}
                </div>
                <Table
                    loading={loading}
                    // pagination={paginationConfig}
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </div>
    );
}

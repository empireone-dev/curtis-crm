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

export default function DirectEmailTable({ account }) {
    const { recalls } = useSelector((state) => state.tickets);
    const [dataTable, setDataTable] = useState([]);
    const [loading, setLoading] = useState(false);
   
    
    const newDataTable = Object.entries(recalls).map((res) => ({
        ...res[1],
    }));
    const data = newDataTable.map((res, i) => ({
        key: i,
        email: res.email,
        date: moment(res.email_date).format("LLL"),
        due_date: moment(res.due_date).format("LLL"),
        link: res.threadId,
        id: res.id,
        assigned: res?.user?.name ?? "N/A",
    }));
    console.log("datadata", recalls);
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

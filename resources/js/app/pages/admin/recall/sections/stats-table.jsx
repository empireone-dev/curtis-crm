import { router } from "@inertiajs/react";
import { Table } from "antd";
import React, { use } from "react";
import { useSelector } from "react-redux";

export default function StatsTable() {
    const { recallStats } = useSelector((state) => state.tickets);
    console.log("recallStats", recallStats);

    const columns = [
        {
            title: "Overdue direct emails",
            dataIndex: "over_due",
            key: "over_due",
            render: (_, record, i) => {
                return (
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() =>
                            router.visit(`/administrator/recall?cases=over_due`)
                        }
                    >
                        {record.over_due}
                    </button>
                );
            },
        },
        {
            title: "Due Cases Today",
            dataIndex: "due_today",
            key: "due_today",
            render: (_, record, i) => {
                return (
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() =>
                            router.visit(
                                `/administrator/recall?cases=due_today`
                            )
                        }
                    >
                        {record.due_today}
                    </button>
                );
            },
        },
        {
            title: "Upcoming Cases",
            dataIndex: "upcoming_cases",
            key: "upcoming_cases",
            render: (_, record, i) => {
                return (
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() =>
                            router.visit(
                                `/administrator/recall?cases=upcoming_cases`
                            )
                        }
                    >
                        {record.upcoming_cases}
                    </button>
                );
            },
        },
        {
            title: "Handled Cases",
            dataIndex: "handled_cases",
            key: "handled_cases",
            render: (_, record, i) => {
                return record.handled_cases;
            },
        },
    ];

    return (
        <div>
            <Table dataSource={[recallStats]} columns={columns} />
        </div>
    );
}

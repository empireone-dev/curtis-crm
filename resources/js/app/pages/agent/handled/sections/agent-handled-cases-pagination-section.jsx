import React from "react";
import { Pagination } from "antd";
import { router } from "@inertiajs/react";
import { useSelector } from "react-redux";

export default function AgentHandledCasesPaginationSection() {
    const { tickets } = useSelector((state) => state.customer_tickets);
    function next_page(value) {
        router.visit(window.location.pathname + "?page=" + value);
    }
    return (
        <div>
            <Pagination
                defaultCurrent={window.location.search.substring(1)}
                onChange={next_page}
                showSizeChanger={false}
                total={tickets.count}
            />
        </div>
    );
}

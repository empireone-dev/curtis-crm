import React from "react";
import { Pagination } from "antd";
import { router } from "@inertiajs/react";
import { useSelector } from "react-redux";

export default function AgentOpenCasesPaginationSection() {
    const { tickets } = useSelector((state) => state.customer_tickets);

    const url = window.location.pathname + window.location.search;

    const getQueryParam = (url, paramName) => {
        const searchParams = new URLSearchParams(url.split("?")[1]);
        return searchParams.get(paramName);
    };

    const page = getQueryParam(url, "page");
    const currentPage = page ? parseInt(page, 10) : 1;

    function next_page(currentPage, pageSize) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", currentPage);
        const newUrl = window.location.pathname + "?" + searchParams.toString();
        router.visit(newUrl);
    }
    return (
        <div>
            <Pagination
                onChange={next_page}
                defaultCurrent={currentPage}
                showSizeChanger={false}
                total={tickets?.ticket_count ?? 0}
            />
        </div>
    );
}

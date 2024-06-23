import React, { useState } from "react";
import { DatePicker, Space, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { search_tickets_service } from "@/app/services/tickets-service";
import moment from "moment";
import { setTickets } from "../_redux/tickets-slice";
import store from "@/app/store/store";
import { router } from "@inertiajs/react";
import dayjs from "dayjs";

export default function TicketFilterSection() {
    const { RangePicker } = DatePicker;
    const { products } = useSelector((state) => state.ticket_form);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(window.location.search);
    const callType = queryParams.get("call_type");
    const model = queryParams.get("model");
    const start = queryParams.get("start");
    const end = queryParams.get("end");
    const status = queryParams.get("status");

    const [data, setData] = useState({
        call_type: callType ?? null,
        start: start ?? moment().subtract(30, 'days').format("YYYY-MM-DD"),
        end: end ?? moment().format("YYYY-MM-DD"),
        model: model?.split(",") ?? null,
        status: status ?? null,
    });

    const handleChangeData = (value) => {
        const start = value[0].format("YYYY-MM-DD");
        const end = value[1].format("YYYY-MM-DD");
        setData({
            ...data,
            start: start,
            end: end,
        });
    };

    function handleChangeModel(value) {
        setData({
            ...data,
            model: value,
        });
    }
    function handleChange(value) {
        setData({
            ...data,
            call_type: value,
        });
    }
    function handleStatusChange(value) {
        setData({
            ...data,
            status: value,
        });
    }

    const options = [
        {
            value: "CF-Warranty Claim",
        },
        {
            value: "Parts",
        },
        {
            value: "TS-Tech Support",
        },
        {
            value: "General Inquiry",
        },
        {
            value: "Others",
        },
    ];

    const statusData = [
        {
            value: "CLOSED",
        },
        {
            value: "WARRANTY VALIDATION",
        },
        {
            value: "PARTS VALIDATION",
        },
        {
            value: "US WAREHOUSE",
        },
        {
            value: "CA WAREHOUSE",
        },
        {
            value: "REPAIR",
        },
        {
            value: "AVAILABILITY",
        },
        {
            value: "INTERNALS",
        },
        {
            value: "CALLBACK",
        },
        {
            value: "REFUND",
        },
        {
            value: "REPLACEMENT",
        },
        {
            value: "REPLACEMENT PARTS",
        },
        {
            value: "TECH VALIDATION",
        },
        {
            value: "WEB FORM",
        },
        {
            value: "AGENT FORM",
        },
    ];

    const newProducts = products?.slice(2).map((res) => ({
        value: res[1],
    }));
    async function search_tickets() {
        setLoading(true);
        try {
            router.visit(
                window.location.pathname +
                    "?page=1&" +
                    "&start=" +
                    data.start +
                    "&end=" +
                    data.end +
                    "&call_type=" +
                    data.call_type +
                    "&model=" +
                    data.model +
                    "&status=" +
                    data.status
            );
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    const dateFormat = "YYYY/MM/DD";
    return (
        <div className="flex gap-4 w-full">
            <div className="w-full">
                <RangePicker
                    defaultValue={[
                        dayjs(data.start, dateFormat),
                        dayjs(data.end, dateFormat),
                    ]}
                    onChange={handleChangeData}
                    size="large"
                />
            </div>

            <div className="w-full">
                <Select
                    maxTagCount="responsive"
                    mode="multiple"
                    allowClear={true}
                    size="large"
                    style={{
                        width: "100%",
                    }}
                    showSearch
                    placeholder="Select Model #"
                    defaultValue={
                        data.model == "null" || data.model == "undefined"
                            ? null
                            : data.model
                    }
                    onChange={handleChangeModel}
                    options={newProducts.sort((a, b) => a.length - b.length)}
                    optionRender={(option) => (
                        <Space>
                            <span role="img" aria-label={option.value}>
                                {option.value}
                            </span>
                        </Space>
                    )}
                />
            </div>
            <div className="w-full">
                <Select
                    allowClear={true}
                    size="large"
                    style={{
                        width: "100%",
                    }}
                    defaultValue={
                        data.call_type == "null" ||
                        data.call_type == "undefined"
                            ? null
                            : data.call_type
                    }
                    placeholder="Based On"
                    onChange={handleChange}
                    options={options}
                    optionRender={(option) => (
                        <Space>
                            <span role="img" aria-label={option.value}>
                                {option.value}
                            </span>
                        </Space>
                    )}
                />
            </div>

            <div className="w-full">
                <Select
                    allowClear={true}
                    size="large"
                    style={{
                        width: "100%",
                    }}
                    defaultValue={
                        data.status == "null" || data.status == "undefined"
                            ? null
                            : data.status
                    }
                    placeholder="Status"
                    onChange={handleStatusChange}
                    options={statusData}
                    optionRender={(option) => (
                        <Space>
                            <span role="img" aria-label={option.value}>
                                {option.value}
                            </span>
                        </Space>
                    )}
                />
            </div>

            <div className="w-full flex gap-3">
                <Button
                    loading={loading}
                    onClick={search_tickets}
                    type="primary"
                    size="large"
                    icon={<SearchOutlined />}
                >
                    Search
                </Button>
                <Button
                    loading={loading}
                    onClick={() =>
                        router.visit(window.location.pathname + "?page=1")
                    }
                    type="primary"
                    danger
                    size="large"
                    icon={<DeleteOutlined />}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}

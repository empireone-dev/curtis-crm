import React, { useState, useMemo } from "react";
import { DatePicker, Select, Button } from "antd";
import { useSelector } from "react-redux";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { router } from "@inertiajs/react";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const DATE_FORMAT = "YYYY-MM-DD";

// 1. Move static options outside the component to prevent recreation on every render
const CALL_TYPE_OPTIONS = [
    { label: "CF-Warranty Claim", value: "CF-Warranty Claim" },
    { label: "Parts", value: "Parts" },
    { label: "TS-Tech Support", value: "TS-Tech Support" },
    { label: "General Inquiry", value: "General Inquiry" },
    { label: "Others", value: "Others" },
];

const STATUS_OPTIONS = [
    "CLOSED", "WARRANTY VALIDATION", "PARTS VALIDATION", "US WAREHOUSE",
    "CA WAREHOUSE", "REPAIR", "AVAILABILITY", "INTERNALS", "CALLBACK",
    "REFUND", "REPLACEMENT", "REPLACEMENT PARTS", "TECH VALIDATION",
    "WEB FORM", "AGENT FORM", "PROCESSED TICKET", "PARTS PROCESSED TICKET",
    "SAFETY ISSUE PROCESSED TICKET"

].map(status => ({ label: status, value: status }));

const DATE_STATUS_OPTIONS = ['Validation Date', 'Last Updated', 'Date Created']
    .map(status => ({ label: status, value: status }));

export default function TicketFilterSection() {
    const { products } = useSelector((state) => state.ticket_form);
    const [loading, setLoading] = useState(false);

    // 2. Safely parse URL params & clean up string "null" checks
    const queryParams = useMemo(() => new URLSearchParams(typeof window !== 'undefined' ? window.location.search : ''), []);

    const parseParam = (param) => {
        const val = queryParams.get(param);
        return (val === "null" || val === "undefined" || !val) ? null : val;
    };

    const [data, setData] = useState({
        call_type: parseParam("call_type"),
        start: parseParam("start"),
        end: parseParam("end"),
        model: parseParam("model")?.split(",") ?? null,
        status: parseParam("status"),
        date_status: parseParam("date_status")?.split(",") ?? null, // Assuming multiple based on Select mode
    });

    // 3. Memoize computed product options
    const modelOptions = useMemo(() => {
        if (!products) return [];
        return products.slice(2)
            .map((res) => ({ label: res[1], value: res[1] }));
    }, [products]);

    // 4. Create a single reusable change handler for all Selects
    const handleSelectChange = (field) => (value) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    const handleDateRangeChange = (dates) => {
        setData((prev) => ({
            ...prev,
            start: dates ? dates[0].format(DATE_FORMAT) : null,
            end: dates ? dates[1].format(DATE_FORMAT) : null,
        }));
    };

    const search_tickets = () => {
        setLoading(true);

        // 5. Let Inertia handle URL serialization instead of manual string concatenation
        const payload = { page: 1 };
        Object.entries(data).forEach(([key, val]) => {
            if (val) payload[key] = Array.isArray(val) ? val.join(",") : val;
        });

        router.get(window.location.pathname, payload, {
            preserveState: true,
            onFinish: () => setLoading(false),
        });
    };

    const reset_filters = () => {
        router.get(window.location.pathname, { page: 1 });
    };

    return (
        <div className="flex gap-4 w-full">
            <div className="w-full">
                <Select
                    maxTagCount="responsive"
                    allowClear
                    size="large"
                    className="w-full"
                    placeholder="Select Status"
                    value={data.date_status || undefined}
                    onChange={handleSelectChange("date_status")}
                    options={DATE_STATUS_OPTIONS}
                />
            </div>
            <div className="w-full">
                <RangePicker
                    className="w-full"
                    // Use 'value' instead of 'defaultValue' to make it fully controlled
                    value={data.start && data.end ? [dayjs(data.start, DATE_FORMAT), dayjs(data.end, DATE_FORMAT)] : undefined}
                    onChange={handleDateRangeChange}
                    size="large"
                />
            </div>
            <div className="w-full">
                <Select
                    mode="multiple"
                    maxTagCount="responsive"
                    allowClear
                    showSearch
                    size="large"
                    className="w-full"
                    placeholder="Select Model #"
                    value={data.model || undefined}
                    onChange={handleSelectChange("model")}
                    options={modelOptions}
                />
            </div>
            <div className="w-full">
                <Select
                    allowClear
                    size="large"
                    className="w-full"
                    placeholder="Based On"
                    value={data.call_type || undefined}
                    onChange={handleSelectChange("call_type")}
                    options={CALL_TYPE_OPTIONS}
                />
            </div>
            <div className="w-full">
                <Select
                    allowClear
                    size="large"
                    className="w-full"
                    placeholder="Status"
                    value={data.status || undefined}
                    onChange={handleSelectChange("status")}
                    options={STATUS_OPTIONS}
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
                    onClick={reset_filters}
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
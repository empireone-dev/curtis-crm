import React, { useState } from "react";
import { DatePicker, Space, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { router } from "@inertiajs/react";
import dayjs from "dayjs";

export default function ProductivityDateSection() {
    const { RangePicker } = DatePicker;
    const { products } = useSelector((state) => state.ticket_form);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(window.location.search);
    const start = queryParams.get("start");
    const end = queryParams.get("end");

    const [data, setData] = useState({
        start: start ?? moment().format("YYYY-MM-DD"),
        end: end ?? moment().format("YYYY-MM-DD"),
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
                    data.end 
            );
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    const dateFormat = "YYYY/MM/DD";
    return (
        <div className="flex gap-4 w-full mb-4">
            
            <div className="w-full pl-2">
            <p>Filter by date:</p>
                <RangePicker
                    defaultValue={[
                        dayjs(data.start, dateFormat),
                        dayjs(data.end, dateFormat),
                    ]}
                    onChange={handleChangeData}
                    size="large"
                    className="rounded-md"
                />
            </div>
        </div>
    );
}

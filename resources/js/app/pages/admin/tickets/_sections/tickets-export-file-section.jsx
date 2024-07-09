import store from "@/app/store/store";
import React, { useEffect, useState } from "react";
import { get_tickets_thunk } from "../_redux/tickets-thunk";
import * as XLSX from "xlsx";
import axios from "axios";
import { Button } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
    create_verify_tickets_service,
    get_tickets_service,
    verify_tickets_service,
} from "@/app/services/tickets-service";

export default function TicketsExportFileSection() {
    const [loading, setLoading] = useState(false);
    const { tickets } = useSelector((state) => state.tickets);

    async function fetchTickets(page) {
        try {
            const { data } = await get_tickets_service(window.location.search);
            return data;
        } catch (error) {}
    }

    async function export_ticket() {
        setLoading(true);
        try {
            const res = await store.dispatch(
                get_tickets_thunk(window.location.search)
            );
            const exist = await verify_tickets_service(window.location.search);

            async function export_files() {
                const allTickets = exist.data;
                setLoading(false);
                const newData = allTickets.map((res) => [
                    res.address ?? "",
                    res.asc_id ?? "",
                    res.availability_notes ?? "",
                    res.brand ?? "",
                    res.call_type ?? "",
                    res.callback_notes ?? "",
                    res.city ?? "",
                    res.class ?? "",
                    res.country ?? "",
                    res.created_at ?? "",
                    res.created_from ?? "",
                    res.decision_making_id ?? "",
                    res.decision_status ?? "",
                    res.email ?? "",
                    res.explanation ?? "",
                    res.fname ?? "",
                    res.id ?? "",
                    res.internal_notes ?? "",
                    res.isUploading ?? "",
                    res.issue ?? "",
                    res.item_number ?? "",
                    res.lname ?? "",
                    res.phone ?? "",
                    res.purchase_date ?? "",
                    res.reason_to_close ?? "",
                    res.remarks ?? "",
                    res.serial_number ?? "",
                    res.state ?? "",
                    res.status ?? "",
                    res.ticket_id ?? "",
                    res.unit ?? "",
                    res.updated_at ?? "",
                    res.user_id ?? "",
                    res.validation_notes ?? "",
                    res.warranty_status ?? "",
                    res.zip_code ?? "",
                ]);

                const data = [
                    [
                        "Address",
                        "ASC",
                        "Availability Notes",
                        "Brand",
                        "Call Type",
                        "Callback Notes",
                        "City",
                        "Class",
                        "Country",
                        "Created At",
                        "Created From",
                        "Decision Making ID",
                        "Decision Status",
                        "Email",
                        "Explanation",
                        "Fname",
                        "ID",
                        "Internal Notes",
                        "Is Uploading",
                        "Issue",
                        "Model",
                        "Lname",
                        "Phone",
                        "Purchase Date",
                        "Reason To Close",
                        "Remarks",
                        "Serial Number",
                        "State",
                        "Status",
                        "Ticket ID",
                        "Unit",
                        "Updated At",
                        "User ID",
                        "Validation Notes",
                        "Warranty Status",
                        "Zip Code",
                    ],
                    ...newData,
                ];
                const ws = XLSX.utils.aoa_to_sheet(data);

                // Define the style for the header row
                const headerStyle = {
                    font: { bold: true, color: { rgb: "FFFFFF" } }, // White font color
                    fill: { fgColor: { rgb: "2F75B5" } }, // Blue background color
                };

                // Apply the style to each cell in the first row (header row)
                for (let col = 0; col < data[0].length; col++) {
                    const cell = XLSX.utils.encode_cell({ r: 0, c: col });
                    if (!ws[cell]) ws[cell] = {}; // Ensure the cell object exists
                    ws[cell].s = headerStyle;
                }

                // Calculate the column widths
                const colWidths = data[0].map((_, colIndex) => {
                    return Math.max(
                        ...data.map((row) => {
                            const value = row[colIndex]
                                ? row[colIndex].toString()
                                : "";
                            return value.length;
                        })
                    );
                });

                ws["!cols"] = colWidths.map((width) => ({ wch: width + 2 })); // Adding a little extra padding

                const wb = XLSX.utils.book_new();

                XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

                XLSX.writeFile(wb, new Date().getTime() + ".xlsx");
            }
            if (exist.result == "unexist") {
                export_files();
                create_verify_tickets_service(window.location.search);
            } else {
                if (
                    window.confirm(
                        "The File is already downloaded. Press ok to continue to download"
                    )
                ) {
                    export_files();
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            }
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <Button
            loading={loading}
            onClick={export_ticket}
            type="primary"
            size="large"
            icon={<FileDoneOutlined />}
        >
            Export File
        </Button>
    );
}

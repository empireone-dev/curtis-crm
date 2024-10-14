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
import moment from "moment";

export default function TicketsExportFileSection() {
    const [loading, setLoading] = useState(false);
    const { tickets } = useSelector((state) => state.tickets);
    const queryParams = new URLSearchParams(window.location.search);
    const searchQuery = queryParams.get("search");

    async function fetchTickets(page) {
        try {
            const { data } = await get_tickets_service(window.location.search);
            return data;
        } catch (error) {}
    }
    const formatPhone = (phone) => {
        if (!phone) return "N/A";
        const cleaned = phone.replace(/[^\d]/g, "");
        if (cleaned.length !== 10) return "N/A";
        const formatted = cleaned.replace(
            /(\d{3})(\d{3})(\d{4})/,
            "($1) $2-$3"
        );
        return formatted;
    };
    
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
                console.log('allTickets',allTickets)
                let newData = [];
                let data = [];
                if (searchQuery == "RESOURCE") {
                    newData = allTickets.map((res) => [
                        moment(res?.receipt?.updated_at).format("L"),
                        res.ticket_id,
                        res.validator?.name ?? "N/A",
                    ]);
                    newData.sort((a, b) => new Date(a[0]) - new Date(b[0]));
                    data = [
                        ["Validated Date", "Ticket Number", "Agent Name"],
                        ...newData,
                    ];
                } else {
                    newData = allTickets.map((res) => {
                        const combinedLogs = [...res?.agent_notes, ...res?.cases_logs];
                        // console.log('combinedLogs',combinedLogs)
                        const latestCreatedAt = combinedLogs.reduce((latest, log) => {
                            return moment(log.created_at).isAfter(moment(latest)) ? log.created_at : latest;
                        }, combinedLogs[0]?.created_at);
                        
                        return [
                            moment(res.created_at).format("L"),//0
                            moment(latestCreatedAt).format("L"),//1
                            res.ticket_id ?? "N/A",//2
                            res.fname ?? "N/A",//3
                            res.lname ?? "N/A",//4
                            formatPhone(res.phone),//5
                            res.email ?? "N/A",//6  
                            res.serial_number ?? "N/A",//7
                            res.item_number ?? "N/A",//8
                            res.unit ?? "N/A",//9
                            res.class ?? "N/A",// //10
                            res.brand ?? "N/A",//11
                            res.call_type ?? "N/A",//12
                            res.purchase_date ?? "N/A",//13
                            res.zip_code ?? "N/A",//14
                            res.country ?? "N/A",//15
                            res.state ?? "N/A",//16
                            res.city ?? "N/A",//17
                            res.address ?? "N/A",//18
                            res.issue ?? "N/A",//19
                            res.status ?? "N/A",// //20
                            res.reason_to_close ?? "N/A",//21
                            res.receipt?.discount ?? "N/A",//22
                            res.decision_making?.after_discount ?? "N/A",//23
                            res.receipt?.retailers_price ?? "N/A",//24
                            res.decision_making?.cost_of_unit ?? "0",// //price cost 25
                            res.decision_making?.shipping_cost ?? "0",// //ship cost 26
                            res.replacement?.ship_date ?? "N/A",//27
                            res.replacement?.tracking ?? "N/A",//28
                            res.refund?.ship_date ?? "N/A",//29
                            res.refund?.cheque_no ?? "N/A",// //30
                            res.refund?.cheque_amount ?? "N/A",// 31
                            (res.country == "CA" ? "CAD" : "USD") ?? "N/A",// 32
                            res.receipt?.store ?? "N/A",//33
                            "No",//
                            (res.isUploading == "true" ? "YES" : "NO") ?? "NO",//
                            res.status ?? "N/A",//
                            res?.validate?.created_at?moment(res?.validate?.created_at).format("L"): 'N/A',// //7
                        ]
                    });

                    data = [
                        [
                            "Date Created",
                            "Date Last Updated",
                            "Ticket #",
                            "First Name",
                            "Last Name",
                            "Phone",
                            "Email",
                            "Serial #",
                            "Model #",
                            "Unit",
                            "Item Class", //10
                            "Brand",
                            "Resolution",
                            "Purchase Date",
                            "Zipcode",
                            "Country",
                            "State",
                            "City",
                            "Address",
                            "Issue",
                            "Ticket Status", //10
                            "Reason",
                            "Discount",
                            "Price After Discount",
                            "Purchase Price",
                            "Cost Price",
                            "Shipping Cost",
                            "Replacement Ship Date",
                            "Tracking #",
                            "Cheque Ship Date",
                            "Cheque #", //10
                            "Cheque Amount",
                            "Cheque Currency",
                            "Retail Store",
                            "From Parts",
                            "Is Downloaded",
                            "Warranty Decision",
                            "Validation Date",
                        ],
                        ...newData,
                    ];
                }
                console.log('export_data',data)
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

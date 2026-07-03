import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import { export_ticket_files } from "@/app/services/tickets-service";
import moment from "moment";

// 1. Extracted helper to avoid recreation on every render
const formatPhone = (phone) => {
    if (!phone) return "N/A";
    const cleaned = phone.replace(/[^\d]/g, "");
    if (cleaned.length !== 10) return "N/A";
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
};

// 2. Extracted headers to keep the component body clean
const STANDARD_HEADERS = [
    "Date Created", "Date Last Updated",  "Created From", "Ticket #", "First Name", "Last Name",
    "Phone", "Email", "Serial #", "Model #", "Unit", "Item Class", "Brand",
    "Resolution", "Purchase Date", "Zipcode", "Country", "State", "City",
    "Address", "Issue", "Ticket Status", "Reason", "Discount",
    "Price After Discount", "Purchase Price", "Cost Price", "Shipping Cost",
    "Replacement Ship Date", "Tracking #", "Cheque Ship Date", "Cheque #",
    "Cheque Amount", "Cheque Currency", "Retail Store", "From Parts",
    "Is Downloaded", "Warranty Decision", "Validation Date", "Date Processed",
    "Date of Ticket Creation", "Date of Customer's First Email", "Date For Warranty Validation", "Date For Decision Making",
    "Date For Resolution (Moved to Refund / Replacement)",
    "Date for Refund Mailed / Replacement Shipped", "Average Time for Customer to Respond (per ticket)",
    "Average Time for Curtis to Respond to Customer (per ticket)"
];

const RESOURCE_HEADERS = ["Validated Date", "Ticket Number", "Agent Name"];


const calculateAverageInterval = (responses) => {
    if (!responses || responses.length < 2) return "Not enough data to calculate an interval.";

    // 1. Extract and convert dates to milliseconds
    const timestamps = responses
        .map(res => new Date(res.created_at).getTime())
        .sort((a, b) => a - b);
    const totalDifferenceMs = timestamps[timestamps.length - 1] - timestamps[0];
    const averageMs = totalDifferenceMs / (timestamps.length - 1);
    const days = Math.floor(averageMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((averageMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((averageMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days, ${hours} hours, and ${minutes} minutes`;
};

export default function TicketsExportFileSection({ isLoading }) {
    const [loading, setLoading] = useState(false);



    // Safely check for window to avoid Next.js SSR hydration errors
    const queryParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const searchQuery = queryParams.get("search");
    const statusQuery = queryParams.get("status");

    const export_ticket = async () => {
        setLoading(true);
        try {
            // 3. Consolidated API call and data extraction
            const { data: allTickets } = await export_ticket_files(window.location.search);

            if (!allTickets || allTickets.length === 0) {
                console.warn("No data available to export.");
                return;
            }

            let exportData = [];
            console.log('allTickets', allTickets)
            if (searchQuery === "RESOURCE") {
                const newData = allTickets.map((res) => [
                    moment(res?.receipt?.updated_at).format("L"),
                    res.ticket_id,
                    res.validator?.name ?? "N/A",
                ]).sort((a, b) => new Date(a[0]) - new Date(b[0]));

                exportData = [RESOURCE_HEADERS, ...newData];
            } else {
                const newData = allTickets.map((res) => {
                    // Safe fallback for arrays
                    const combinedLogs = [...(res?.agent_notes || []), ...(res?.cases_logs || [])];

                    // Native string comparison is blazing fast for ISO dates
                    // const dateLastUpdated = combinedLogs.reduce((latest, log) =>
                    //     log.created_at > latest ? log.created_at : latest
                    //     , combinedLogs[0]?.created_at || null);

                    // Pre-calculate conditional date
                    console.log('resresres', res?.activity)
                    const dateProcessed = res?.decision_status === "REPLACEMENT"
                        ? res?.replacement_shipped?.created_at
                        : res?.decision_status === "REFUND"
                            ? res?.refund_shipped?.created_at
                            : null;
                    const warrantyActivity = res.activities?.find(a => a.type === "WARRANTY VALIDATION");
                    const decisionMaking = res.activities?.find(a => a.type === "DECISION MAKING");
                    const assign_to = res.activities?.find(a => a.type == "ASSIGNED TO")
                    const refundMaking = res.activities?.find(a => a.type === "REFUND SHIPPED");
                    const replacementMaking = res.activities?.find(a => a.type === "REPLACEMENT SHIPPED");

                    const warranty_validation_date = warrantyActivity?.created_at
                        ? moment(warrantyActivity.created_at).format('LL')
                        : '';
                    const decision_making_date = decisionMaking?.created_at
                        ? moment(decisionMaking.created_at).format('LL')
                        : '';
                    const refund_date = refundMaking?.created_at
                        ? moment(refundMaking.created_at).format('LL')
                        : '';
                    const replacement_date = replacementMaking?.created_at
                        ? moment(replacementMaking.created_at).format('LL')
                        : '';
                    let resolution_date = '';

                    if (assign_to?.message) {
                        try {
                            const parsedMessage = JSON.parse(assign_to.message);
                            const createdAt = parsedMessage?.created_at;
                            if (createdAt) {
                                resolution_date = moment(createdAt).format('LL');
                            }
                        } catch (error) {
                            console.warn("Could not parse message JSON for export:", assign_to.message);
                        }
                    }
                    const refund_mailed = refund_date ?? replacement_date
                    const curtis_response_average = calculateAverageInterval([
                        { created_at: res.created_at },
                        ...combinedLogs
                    ]);
                    console.log('warrantyActivity1', refund_date)
                    console.log('warrantyActivity2', replacement_date)
                    return [
                        res.created_at ? moment(res.created_at).format("L") : "N/A",
                        moment(res.latest_updated).format("L") || "N/A",
                        res.created_from ?? "N/A",
                        res.ticket_id ?? "N/A",
                        res.fname ?? "N/A",
                        res.lname ?? "N/A",
                        formatPhone(res.phone),
                        res.email ?? "N/A",
                        res.serial_number ?? "N/A",
                        res.item_number ?? "N/A",
                        res.unit ?? "N/A",
                        res.class ?? "N/A",
                        res.brand ?? "N/A",
                        res.call_type ?? "N/A",
                        res.purchase_date ?? "N/A",
                        res.zip_code ?? "N/A",
                        res.country ?? "N/A",
                        res.state ?? "N/A",
                        res.city ?? "N/A",
                        res.address ?? "N/A",
                        res.issue ?? "N/A",
                        res.status ?? "N/A",
                        res.reason_to_close ?? "N/A",
                        res.receipt?.discount ?? "N/A",
                        res.decision_making?.after_discount ?? "N/A",
                        res.receipt?.retailers_price ?? "N/A",
                        res.decision_making?.cost_of_unit ?? "0",
                        res.decision_making?.shipping_cost ?? "0",
                        res.replacement?.ship_date ?? "N/A",
                        res.replacement?.tracking ?? "N/A",
                        res.refund?.ship_date ?? "N/A",
                        res.refund?.cheque_no ?? "N/A",
                        res.refund?.cheque_amount ?? "0",
                        res.country === "CA" ? "CAD" : "USD",
                        res.receipt?.store ?? "N/A",
                        "No",
                        res.isUploading === "true" ? "YES" : "NO",
                        res.status ?? "N/A",
                        // moment(res?.validation_date).format("L") || "N/A",
                        moment(res?.activity?.created_at).format("L"),
                        dateProcessed ? moment(dateProcessed).format("L") : "N/A",
                        res.created_at ? moment(res.created_at).format("LL") : "N/A",
                        'n/a',
                        warranty_validation_date,
                        decision_making_date,
                        resolution_date,
                        refund_mailed,
                        "Pending",
                        curtis_response_average
                    ];
                });

                exportData = [STANDARD_HEADERS, ...newData];
            }

            // 4. Excel generation logic
            const ws = XLSX.utils.aoa_to_sheet(exportData);

            const headerStyle = {
                font: { bold: true, color: { rgb: "FFFFFF" } },
                fill: { fgColor: { rgb: "2F75B5" } },
            };

            for (let col = 0; col < exportData[0].length; col++) {
                const cell = XLSX.utils.encode_cell({ r: 0, c: col });
                if (!ws[cell]) ws[cell] = {};
                ws[cell].s = headerStyle;
            }

            // Auto-calculate column widths cleanly
            const colWidths = exportData[0].map((_, colIndex) => {
                const maxLen = Math.max(...exportData.map(row =>
                    row[colIndex] ? row[colIndex].toString().length : 0
                ));
                return { wch: maxLen + 2 };
            });
            ws["!cols"] = colWidths;

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, `Tickets_Export_${new Date().getTime()}.xlsx`);

        } catch (error) {
            console.error("Export Failed:", error);
        } finally {
            // 5. Ensures loading is toggled off regardless of success or error
            setLoading(false);
        }
    };

    // 6. Return null early if no criteria are met
    // if (!statusQuery && !searchQuery) return null;

    return (
        <Button
            disabled={isLoading}
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
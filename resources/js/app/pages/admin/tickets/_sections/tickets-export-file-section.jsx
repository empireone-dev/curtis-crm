import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import { export_ticket_files } from "@/app/services/tickets-service";
import moment from "moment";

// Helper to clean and format phone strings efficiently
const formatPhone = (phone) => {
    if (!phone) return "N/A";
    const cleaned = phone.replace(/[^\d]/g, "");
    if (cleaned.length !== 10) return "N/A";
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
};

const STANDARD_HEADERS = [
    "Date Created", "Date Last Updated", "Created From", "Ticket #", "First Name", "Last Name",
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

// Optimized numeric timestamp calculator
const calculateAverageInterval = (responses) => {
    if (!responses || responses.length < 2) return "Not enough data to calculate an interval.";

    const timestamps = responses
        .map(res => new Date(res.created_at).getTime())
        .sort((a, b) => a - b);

    const totalDifferenceMs = timestamps[timestamps.length - 1] - timestamps[0];
    const averageMs = totalDifferenceMs / (timestamps.length - 1);

    const days = Math.floor(averageMs / 86400000);
    const hours = Math.floor((averageMs % 86400000) / 3600000);
    const minutes = Math.floor((averageMs % 3600000) / 60000);

    return `${days} days, ${hours} hours, and ${minutes} minutes`;
};

// Optimized conversation thread response times analyzer
function calculateAverageResponseTimes(threadsArray) {
    if (!threadsArray || !threadsArray.length) {
        return { supportAverageResponseTime: "0 hours", customerAverageResponseTime: "0 hours" };
    }

    const sortedThreads = [...threadsArray].sort((a, b) => moment(a.date).diff(moment(b.date)));
    const supportResponseTimes = [];
    const customerResponseTimes = [];

    for (let i = 1; i < sortedThreads.length; i++) {
        const currentMsg = sortedThreads[i];
        const previousMsg = sortedThreads[i - 1];

        const diffInHours = moment(currentMsg.date).diff(moment(previousMsg.date), 'hours', true);

        const currentIsSupport = currentMsg.from?.includes('support2@curtiscs.com') ?? false;
        const previousIsSupport = previousMsg.from?.includes('support2@curtiscs.com') ?? false;

        if (currentIsSupport && !previousIsSupport) {
            supportResponseTimes.push(diffInHours);
        } else if (!currentIsSupport && previousIsSupport) {
            customerResponseTimes.push(diffInHours);
        }
    }

    const formatDuration = (arr) => {
        if (!arr.length) return "0 hours";
        const avgHours = arr.reduce((sum, val) => sum + val, 0) / arr.length;
        const duration = moment.duration(avgHours, 'hours');
        const days = Math.floor(duration.asDays());
        const hours = Math.round(duration.hours());

        if (days > 0) return `${days} ${days === 1 ? 'day' : 'days'} ${hours} ${hours === 1 ? 'hour' : 'hours'}`;
        return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    };

    return {
        supportAverageResponseTime: formatDuration(supportResponseTimes),
        customerAverageResponseTime: formatDuration(customerResponseTimes)
    };
}

export default function TicketsExportFileSection({ isLoading }) {
    const [loading, setLoading] = useState(false);

    const export_ticket = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
            const searchQuery = queryParams.get("search");

            const { data: allTickets } = await export_ticket_files(window.location.search);
            if (!allTickets || allTickets.length === 0) return;

            let exportData = [];

            if (searchQuery === "RESOURCE") {
                const newData = allTickets.map((res) => [
                    res?.receipt?.updated_at ? moment(res.receipt.updated_at).format("L") : "N/A",
                    res.ticket_id || "N/A",
                    res.validator?.name ?? "N/A",
                ]).sort((a, b) => new Date(a[0]) - new Date(b[0]));

                exportData = [RESOURCE_HEADERS, ...newData];
            } else {
                const newData = allTickets.map((res) => {
                    const agentNotes = res?.agent_notes || [];
                    const casesLogs = res?.cases_logs || [];
                    const combinedLogs = [...agentNotes, ...casesLogs];

                    // Email merge routine
                    const emailMap = {};
                    (res?.emails || []).forEach(current => {
                        const subjectKey = current.subject;
                        if (!emailMap[subjectKey]) {
                            emailMap[subjectKey] = { ...current, threads: [...(current.threads || [])] };
                        } else {
                            emailMap[subjectKey].threads.push(...(current.threads || []));
                            emailMap[subjectKey].message_count = (emailMap[subjectKey].message_count || 0) + (current.message_count || 0);
                            if (new Date(current.updated_at) > new Date(emailMap[subjectKey].updated_at)) {
                                emailMap[subjectKey].updated_at = current.updated_at;
                                emailMap[subjectKey].body = current.body;
                            }
                        }
                    });

                    const allUnifiedThreads = Object.values(emailMap).flatMap(email => email.threads || []);
                    const globalResults = calculateAverageResponseTimes(allUnifiedThreads);

                    const dateProcessed = res?.decision_status === "REPLACEMENT"
                        ? res?.replacement_shipped?.created_at
                        : res?.decision_status === "REFUND"
                            ? res?.refund_shipped?.created_at
                            : null;

                    const activities = res.activities || [];
                    const warrantyActivity = activities.find(a => a.type === "WARRANTY VALIDATION");
                    const decisionMaking = activities.find(a => a.type === "DECISION MAKING");
                    const assign_to = activities.find(a => a.type === "ASSIGNED TO");
                    const refundMaking = activities.find(a => a.type === "REFUND SHIPPED");
                    const replacementMaking = activities.find(a => a.type === "REPLACEMENT SHIPPED");

                    const warranty_validation_date = warrantyActivity?.created_at ? moment(warrantyActivity.created_at).format('LL') : '';
                    const decision_making_date = decisionMaking?.created_at ? moment(decisionMaking.created_at).format('LL') : '';
                    const refund_date = refundMaking?.created_at ? moment(refundMaking.created_at).format('LL') : '';
                    const replacement_date = replacementMaking?.created_at ? moment(replacementMaking.created_at).format('LL') : '';

                    let resolution_date = '';
                    if (assign_to?.message) {
                        try {
                            const parsedMessage = JSON.parse(assign_to.message);
                            if (parsedMessage?.created_at) {
                                resolution_date = moment(parsedMessage.created_at).format('LL');
                            }
                        } catch (e) { }
                    }

                    const refund_mailed = refund_date || replacement_date || '';
                    const curtis_response_average = calculateAverageInterval([{ created_at: res.created_at }, ...combinedLogs]);

                    return [
                        res.created_at ? moment(res.created_at).format("L") : "N/A",
                        res.latest_updated ? moment(res.latest_updated).format("L") : "N/A",
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
                        res.activity?.created_at ? moment(res.activity.created_at).format("L") : "N/A",
                        dateProcessed ? moment(dateProcessed).format("L") : "N/A",
                        res.created_at ? moment(res.created_at).format("LL") : "N/A",
                        'n/a',
                        warranty_validation_date,
                        decision_making_date,
                        resolution_date,
                        refund_mailed,
                        globalResults.customerAverageResponseTime,
                        curtis_response_average
                    ];
                });

                exportData = [STANDARD_HEADERS, ...newData];
            }

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

            ws["!cols"] = exportData[0].map((_, colIndex) => {
                const maxLen = Math.max(...exportData.map(row => row[colIndex] ? row[colIndex].toString().length : 0));
                return { wch: Math.min(maxLen + 2, 50) }; // Capped at 50 max to avoid massive columns
            });

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, `Tickets_Export_${Date.now()}.xlsx`);
        } catch (error) {
            console.error("Export Failed:", error);
        } finally {
            setLoading(false);
        }
    };

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
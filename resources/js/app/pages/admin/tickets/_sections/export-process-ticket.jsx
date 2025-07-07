import { Modal } from "antd";
import React, { useState } from "react";
import { DatePicker } from "antd";
import * as XLSX from "xlsx";
import { export_process_ticket_service } from "@/app/services/tickets-service";
import moment from "moment";

const { RangePicker } = DatePicker;

export default function ExportProcessTicket() {
    const [open, setOpen] = useState(false);
    const [dateRange, setDateRange] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDateChange = (dates, dateStrings) => {
        setDateRange(dateStrings); // ['DD-MM-YYYY', 'DD-MM-YYYY']
        console.log("Selected Dates:", dateStrings);
    };

    function exportToXLSX(data, filename = "export.xlsx") {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        XLSX.writeFile(workbook, filename);
    }

    async function export_data() {
        setLoading(true);
        try {
            const res = await export_process_ticket_service({
                start: dateRange[0],
                end: dateRange[1],
            });
            // console.log('ress',res)
            // console.log(
            //     "res",
            //     res?.result?.map((item) => ({
            //         "Date Created":
            //             moment(item?.ticket?.created_at).format("LLL") || "",
            //         "Date Last Updated":
            //             moment(item?.cases_log?.created_at).format("LLL") || "",
            //         "Ticket #": item?.ticket?.ticket_id || "",
            //         "First Name": item?.ticket?.fname || "",
            //         "Last Name": item?.ticket?.lname || "",
            //         Phone: item?.ticket?.phone || "",
            //         Email: item?.ticket?.email || "",
            //         "Serial #": item?.ticket?.serial_number || "",
            //         "Model #": item?.ticket?.item_number || "",
            //         "Unit Item": item?.ticket?.unit || "",
            //         Class: item?.ticket?.class || "",
            //         Brand: item?.ticket?.brand || "",
            //         Resolution: item?.ticket?.call_type || "",
            //         "Purchase Date":
            //             moment(item?.ticket?.purchase_date).format("LL") || "",
            //         Zipcode: item?.ticket?.Zip_code || "",
            //         Country: item?.ticket?.country || "",
            //         State: item?.ticket?.state || "",
            //         City: item?.ticket?.city || "",
            //         Address: item.address || "",
            //         Issue: item?.ticket?.issue || "",
            //         "Ticket Status": item?.ticket?.status || "",
            //         Reason: item?.ticket?.reason_to_close || "",
            //         Discount: item?.decision?.discount || "",
            //         "Price After Discount":
            //             item?.decision?.after_discount || "",
            //         "Purchase Price": item?.decision?.retailers_price || "",
            //         "Cost Price": item?.decision?.cost_of_unit || "",
            //         "Shipping Cost": item.shippingCost || "",
            //         "Replacement Ship Date": item?.decision?.date || "",
            //         "Tracking #": (item.replacement?.tracking ?? "N/A") || "",
            //         "Cheque Ship Date": item?.refund?.ship_date || "",
            //         "Cheque #": item?.refund?.cheque_no || "",
            //         "Cheque Amount": item?.refund?.cheque_amount || "",
            //         "Cheque Currency":
            //             item?.ticket?.country == "US" ? "USD" : "CAD" || "",
            //         "Retail Store": item?.receipt?.store || "",
            //         // "From Parts": item.fromParts || "",
            //         // "Is Downloaded": item.isDownloaded || "",
            //         "Warranty Decision": item?.ticket?.decision_status || "",
            //         "Validation Date":
            //             moment(item?.validate?.created_at).format("LL") || "",
            //         "Date Processed":
            //             moment(item?.replacement_shipped?.created_at).format(
            //                 "LLL"
            //             ) || "",
            //     }))
            // );

            if (res?.result?.length > 0) {
                exportToXLSX(
                    res?.result?.map((item) => ({
                        "Date Created":
                            moment(item?.ticket?.created_at).format("LLL") ||
                            "",
                        "Date Last Updated":
                            moment(item?.cases_log?.created_at).format("LLL") ||
                            "",
                        "Ticket #": item?.ticket?.ticket_id || "",
                        "First Name": item?.ticket?.fname || "",
                        "Last Name": item?.ticket?.lname || "",
                        Phone: item?.ticket?.phone || "",
                        Email: item?.ticket?.email || "",
                        "Serial #": item?.ticket?.serial_number || "",
                        "Model #": item?.ticket?.item_number || "",
                        "Unit Item": item?.ticket?.unit || "",
                        Class: item?.ticket?.class || "",
                        Brand: item?.ticket?.brand || "",
                        Resolution: item?.ticket?.call_type || "",
                        "Purchase Date":
                            moment(item?.ticket?.purchase_date).format("LL") ||
                            "",
                        Zipcode: item?.ticket?.Zip_code || "",
                        Country: item?.ticket?.country || "",
                        State: item?.ticket?.state || "",
                        City: item?.ticket?.city || "",
                        Address: item.address || "",
                        Issue: item?.ticket?.issue || "",
                        "Ticket Status": item?.ticket?.status || "",
                        Reason: item?.ticket?.reason_to_close || "",
                        Discount: item?.decision?.discount || "",
                        "Price After Discount":
                            item?.decision?.after_discount || "",
                        "Purchase Price": item?.decision?.retailers_price || "",
                        "Cost Price": item?.decision?.cost_of_unit || "",
                        "Shipping Cost": item.shippingCost || "",
                        "Replacement Ship Date": item?.decision?.date || "",
                        "Tracking #":
                            (item.replacement?.tracking ?? "N/A") || "",
                        "Cheque Ship Date": item?.refund?.ship_date || "",
                        "Cheque #": item?.refund?.cheque_no || "",
                        "Cheque Amount": item?.refund?.cheque_amount || "",
                        "Cheque Currency":
                            item?.ticket?.country == "US" ? "USD" : "CAD" || "",
                        "Retail Store": item?.receipt?.store || "",
                        // "From Parts": item.fromParts || "",
                        // "Is Downloaded": item.isDownloaded || "",
                        "Warranty Decision":
                            item?.ticket?.decision_status || "",
                        "Validation Date":
                            moment(item?.validate?.created_at).format("LL") ||
                            "",
                        "Date Processed":
                            moment(
                                item?.replacement_shipped?.created_at
                            ).format("LLL") || "",
                    }))
                );
            } else {
                console.warn("No data to export.");
            }

            setLoading(false);
            setOpen(false);
        } catch (error) {
            console.error("Export failed", error);
            setLoading(false);
        }
    }

    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md text-white"
            >
                EXPORT PROCESS TICKET
            </button>
            <Modal
                confirmLoading={loading}
                onOk={export_data}
                onCancel={() => setOpen(false)}
                okText="Export"
                open={open}
            >
                <label className="block text-sm mb-2">Select Date Range:</label>
                <RangePicker
                    onChange={handleDateChange}
                    format="DD-MM-YYYY"
                    allowClear
                    size="large"
                    style={{ width: "100%" }}
                />
            </Modal>
        </div>
    );
}

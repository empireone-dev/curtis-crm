import { export_by_the_warehouse_service } from "@/app/services/activities-service";
import { Button } from "antd";
import React, { useState } from "react";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import moment from "moment";

export default function ExportByTheWarehouse() {
    const [loading, setLoading] = useState(false);
    // const [data, setData] = useState([]);
    async function function_export_by_the_warehouse(params) {
        try {
            setLoading(true);
            const res = await export_by_the_warehouse_service();
            console.log("res", res);
            await handleExport(res);
            setData(res);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const handleExport = (result) => {
        const data = result.map((res) => ({
            "CREATED AT": moment(res.ticket.created_at).format("LLL"),
            "UPDATED AT": moment(res.ticket.updated_at).format("LLL"),
            "CASE FILE": res.ticket.ticket_id,
            FULLNAME: `${res.ticket.fname} ${res.ticket.lname}`,
            MODEL: res.ticket.item_number,
            "ITEM CLASS": res.ticket.class,
            BRAND: res.ticket.brand,
            COUNTRY: res.ticket.country,
            STATE: res.ticket.state,
            CITY: res.ticket.city,
            ISSUE: res.ticket.issue,
            "REPLACEMENT SHIP DATE": res.replacement?.ship_date,
            "CHEQUE SHIP DATE": res.refund?.ship_date,
            "EMAIL ADDRESS": res.ticket.email,
            "VALIDATION DATE": res?.validate?.created_at
                ? moment(res?.validate?.created_at).format("LLL")
                : "N/A",
            "DATE PROCESSED":
                res?.ticket?.decision_status === "REPLACEMENT"
                    ? moment(res?.replacement_shipped?.created_at).format("L")
                    : res?.ticket?.decision_status === "REFUND"
                    ? moment(res?.refund_shipped?.created_at).format("L")
                    : "N/A",
        }));

        console.log("datadata", data);
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Auto-fit column widths
        const columnWidths = Object.keys(data[0]).map((key) => {
            const maxLength = Math.max(
                key.length,
                ...data.map((row) =>
                    row[key] ? row[key].toString().length : 0
                )
            );
            return { wch: maxLength + 2 }; // add padding
        });

        worksheet["!cols"] = columnWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, "WAREHOUSE Data " + moment().format("LLL"));
    };

    return (
        <div className="p-3">
            <Button
                loading={loading}
                onClick={function_export_by_the_warehouse}
                color="default"
                variant="solid"
            >
                EXPORT RECEIVED BY THE WAREHOUSE
            </Button>
        </div>
    );
}

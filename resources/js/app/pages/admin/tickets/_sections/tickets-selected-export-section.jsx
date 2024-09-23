import React, { useEffect, useState } from "react";
import { Button, Modal, Radio, Select } from "antd";
import { useSelector } from "react-redux";
import { verify_tickets_service } from "@/app/services/tickets-service";
import * as XLSX from "xlsx";
import moment from "moment";

export default function TicketsSelectedExportSection({ selected }) {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { tickets } = useSelector((state) => state.tickets);
    const [value, setValue] = useState("all");
    const [selectedColumn, setSelectedColumn] = useState([]);

    const columns = [
        { id: 0, name: "Date Created" },
        { id: 1, name: "Date Last Updated" },
        { id: 2, name: "Ticket #" },
        { id: 3, name: "First Name" },
        { id: 4, name: "Last Name" },
        { id: 5, name: "Phone" },
        { id: 6, name: "Email" },
        { id: 7, name: "Serial #" },
        { id: 8, name: "Model #" },
        { id: 9, name: "Unit" },
        { id: 10, name: "Item Class" },
        { id: 11, name: "Brand" },
        { id: 12, name: "Resolution" },
        { id: 13, name: "Purchase Date" },
        { id: 14, name: "Zipcode" },
        { id: 15, name: "Country" },
        { id: 16, name: "State" },
        { id: 17, name: "City" },
        { id: 18, name: "Address" },
        { id: 19, name: "Issue" },
        { id: 20, name: "Ticket Status" },
        { id: 21, name: "Reason" },
        { id: 22, name: "Discount" },
        { id: 23, name: "Price After Discount" },
        { id: 24, name: "Purchase Price" },
        { id: 25, name: "Cost Price" },
        { id: 26, name: "Shipping Cost" },
        { id: 27, name: "Replacement Ship Date" },
        { id: 28, name: "Tracking #" },
        { id: 29, name: "Cheque Ship Date" },
        { id: 30, name: "Cheque #" },
        { id: 31, name: "Cheque Amount" },
        { id: 32, name: "Cheque Currency" },
        { id: 33, name: "Retail Store" },
    ];

    // const options = [];
    // for (let i = 10; i < 36; i++) {
    //     options.push({
    //         value: i.toString(36) + i,
    //         label: i.toString(36) + i,
    //     });
    // }
    const handleChange = (value) => {
        console.log(`selected `, value);
        setSelectedColumn(value);
    };

    const onChange = (e) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        // setIsModalOpen(false);
        setLoading(true);
        console.log(window.location.search)
        const exist = await verify_tickets_service(window.location.search);

        async function get_status(params) {
            if (value == "all") {
                return exist.data;
            } else if (value == "uncheck") {
                return exist.data.filter((item) => !selected.includes(item.id));
            } else if (value == "checked") {
                return exist.data.filter((item) => selected.includes(item.id));
            }
        }

        async function get_column(params) {
            if (value == "all") {
                // return columns;
                return columns.filter((item) =>
                    selectedColumn.includes(item.id)
                );
            } else if (value == "uncheck") {
                return columns.filter(
                    (item) => !selectedColumn.includes(item.id)
                );
            } else if (value == "checked") {
                return columns.filter((item) =>
                    selectedColumn.includes(item.id)
                );
            }
        }
        const result = (await get_status()).map((res) => ({
            0: {
                id: 0,
                name: moment(res.created_at).format("L"),
            },
            1: {
                id: 1,
                name: moment(res.updated_at).format("L"),
            },
            2: {
                id: 2,
                name: res?.ticket_id ?? "N/A",
            },
            3: {
                id: 3,
                name: res?.fname ?? "N/A",
            },
            4: {
                id: 4,
                name: res?.lname ?? "N/A",
            },
            5: {
                id: 5,
                name: res?.phone ?? "N/A",
            },
            6: {
                id: 6,
                name: res?.email ?? "N/A",
            },
            7: {
                id: 7,
                name: res?.serial_number ?? "N/A",
            },
            8: {
                id: 8,
                name: res?.item_number ?? "N/A",
            },
            9: {
                id: 9,
                name: res?.unit ?? "N/A",
            },
            10: {
                id: 10,
                name: res?.class ?? "N/A",
            },
            11: {
                id: 11,
                name: res?.brand ?? "N/A",
            },
            12: {
                id: 12,
                name: res?.call_type ?? "N/A",
            },
            13: {
                id: 13,
                name: res?.purchase_date ?? "N/A",
            },
            14: {
                id: 14,
                name: res?.zip_code ?? "N/A",
            },
            15: {
                id: 15,
                name: res?.country ?? "N/A",
            },
            16: {
                id: 16,
                name: res?.state ?? "N/A",
            },
            17: {
                id: 17,
                name: res?.city ?? "N/A",
            },
            18: {
                id: 18,
                name: res?.address ?? "N/A",
            },
            19: {
                id: 19,
                name: res?.issue ?? "N/A",
            },
            20: {
                id: 20,
                name: res?.status ?? "N/A",
            },
            21: {
                id: 21,
                name: res?.reason_to_close ?? "N/A",
            },
            22: {
                id: 22,
                name: res.receipt?.discount ?? "N/A",
            },
            23: {
                id: 23,
                name: res.decision_making?.after_discount ?? "N/A",
            },
            24: {
                id: 24,
                name: res.receipt?.retailers_price ?? "N/A",
            },
            25: {
                id: 25,
                name: res.decision_making?.cost_of_unit ?? "N/A",
            },
            26: {
                id: 26,
                name: res.decision_making?.shipping_cost ?? "N/A",
            },
            27: {
                id: 27,
                name: res.replacement?.ship_date ?? "N/A",
            },
            28: {
                id: 28,
                name: res.replacement?.tracking ?? "N/A",
            },
            29: {
                id: 29,
                name: res.refund?.ship_date ?? "N/A",
            },
            30: {
                id: 30,
                name: res.refund?.cheque_no ?? "N/A",
            },
            31: {
                id: 31,
                name: res.refund?.cheque_amount ?? "N/A",
            },
            32: {
                id: 32,
                name: (res.country == "CA" ? "CAD" : "USD") ?? "N/A",
            },
            33: {
                id: 33,
                name: res.receipt?.store ?? "N/A",
            },
        }));

        const new_column = (await get_column()).sort((a, b) => a.id - b.id);
        
        const new_data = result.map((item) =>
            selectedColumn.map((res) => item[res]).sort((a, b) => a.id - b.id)
        );
        const export_data = [
            new_column.map((res) => res.name),
            ...new_data.map((res) => res.map((res) => res.name)),
        ];
        const ws = XLSX.utils.aoa_to_sheet(export_data);
        console.log("new_column", new_column);
        console.log("new_data", new_data);
        console.log("export_data", export_data);

        // Define the style for the header row
        const headerStyle = {
            font: { bold: true, color: { rgb: "FFFFFF" } }, // White font color
            fill: { fgColor: { rgb: "2F75B5" } }, // Blue background color
        };

        // Apply the style to each cell in the first row (header row)
        for (let col = 0; col < export_data[0].length; col++) {
            const cell = XLSX.utils.encode_cell({ r: 0, c: col });
            if (!ws[cell]) ws[cell] = {}; // Ensure the cell object exists
            ws[cell].s = headerStyle;
        }

        // Calculate the column widths
        const colWidths = export_data[0].map((_, colIndex) => {
            return Math.max(
                ...export_data.map((row) => {
                    const value = row[colIndex] ? row[colIndex].toString() : "";
                    return value.length;
                })
            );
        });

        ws["!cols"] = colWidths.map((width) => ({ wch: width + 2 })); // Adding a little extra padding

        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, new Date().getTime() + ".xlsx");
        setLoading(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Export Case Files
            </Button>
            <Modal
                title="Export Data"
                open={isModalOpen}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Submit
                    </Button>,
                ]}
                onCancel={handleCancel}
            >
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={"all"}>Export All</Radio>
                    <Radio value={"checked"}>Export Checked</Radio>
                    <Radio value={"uncheck"}>Export Uncheck</Radio>
                </Radio.Group>
                <div className="font-bold py-2">Select table column</div>
                <Select
                    mode="tags"
                    style={{
                        width: "100%",
                    }}
                    placeholder="select column"
                    onChange={handleChange}
                    tokenSeparators={[","]}
                    options={columns.map((res, i) => ({
                        value: res.id,
                        label: res.name,
                    }))}
                />
            </Modal>
        </div>
    );
}

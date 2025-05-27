import Input from "@/app/layouts/components/input";
import Textarea from "@/app/layouts/components/textarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTicket } from "../../../../_redux/tickets-slice";
import { router } from "@inertiajs/react";
import {
    unrepair_service,
    update_repair_service,
} from "@/app/services/repair-service";
import Loading from "@/app/layouts/components/loading";
import routing from "../../../components/routing";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { upload_attachment_service } from "@/app/services/files-service";

export default function ContentRepairFormection() {
    const [form, setForm] = useState({});
    const { ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app);
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setForm({
            ...ticket.decision_making,
            repair_cost: ticket?.repair?.repair_cost ?? ticket.repair_cost,
            notes: ticket?.repair?.notes ?? ticket.notes,
            asc_data: ticket.asc,
        });
    }, []);
    function formHandler(value, name) {
        if (name === "repair_cost") {
            setForm({
                ...form,
                repair_cost: value.replace(/[^0-9.]/g, ""),
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
    }

    async function submit_repaired_asc(params) {
        if (confirm("Are you sure you want to mark as repaired the ticket?")) {
            setIsLoading1(true);
            try {
                const result = await update_repair_service({
                    ...form,
                    account: user,
                    status: "REPAIR SUCCESS",
                });
                // dispatch(setTicket(result.status))
                setIsLoading1(false);
                router.visit(routing("files"));
            } catch (error) {
                setIsLoading1(false);
            }
        }
    }

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    async function submit_not_repaired_asc(params) {
        if (confirm("Are you sure you want to mark as unrepair the ticket?")) {
            setIsLoading2(true);
            try {
                const newData = {
                    ...form,
                    account: user,
                    status: "REPAIR UNSUCCESSFUL",
                };
                const result = await unrepair_service(form.ticket_id, newData);
                console.log("result", result);
                setIsLoading2(false);
                router.visit(routing("decision"));
            } catch (error) {
                setIsLoading2(false);
            }
        }
    }
    let isUploading = false;

    async function upload_attachment(e) {
        if (isUploading) return;
        isUploading = true;

        try {
            const filePromises = e.fileList?.map((element) => {
                const file = element.originFileObj;
                return fileToBase64(file);
            });

            const base64Strings = await Promise.all(filePromises);

            const response = await upload_attachment_service({
                attachments: base64Strings,
                ticket_id: ticket.ticket_id,
            });

            if (response?.status == 200) {
                message.success("Uploaded attachment");
                console.log("base64Strings", base64Strings);
            } else {
                message.error("Upload failed. Please try again.");
            }
        } catch (error) {
            // console.error("Error during file upload:", error);
            // message.error("An error occurred while uploading attachments.");
        } finally {
            isUploading = false;
        }
    }

    console.log("ticketticket", ticket?.repair_files);
    const invoices = ticket?.repair_files?.map((res, i) => ({
        uid: i,
        name: res.file,
        url: res.file,
        status: "done",
    }));
    return (
        <div className="flex flex-col gap-6">
            <div>ASC Name: {ticket.asc?.user?.name ?? "None"}</div>
            <div>
                Address: {ticket.asc?.user?.address ?? ""},{" "}
                {ticket.asc?.user?.city ?? ""}, {ticket.asc?.user?.state ?? ""},{" "}
                {ticket.asc?.user?.zip_code ?? ""} Canada
            </div>
            <div>Email: {ticket.asc?.user?.email ?? ""}</div>
            <div>Phone: {ticket.asc?.user?.phone ?? ""}</div>
            <Upload
                method="GET"
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture"
                defaultFileList={invoices}
                multiple
                onChange={upload_attachment}
            >
                <Button type="primary" icon={<UploadOutlined />}>
                    Upload Attachments
                </Button>
            </Upload>
            <Input
                onChange={formHandler}
                name="repair_cost"
                required={true}
                value={form?.repair_cost ?? " "}
                label="Repair Cost"
                type="text"
                errorMessage="Repair Cost is required"
            />

            <Textarea
                required={true}
                onChange={formHandler}
                name="notes"
                value={form?.notes ?? " "}
                label="notes"
                type="text"
                errorMessage="notes is required"
            />
            <div className="flex gap-4">
                <button
                    onClick={submit_repaired_asc}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                    {isLoading1 ? <Loading /> : "REPAIRED"}
                </button>

                <button
                    onClick={submit_not_repaired_asc}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                    {isLoading2 ? <Loading /> : " NOT REPAIRED"}
                </button>
            </div>
        </div>
    );
}

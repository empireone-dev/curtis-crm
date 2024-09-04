import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import Textarea from "@/app/layouts/components/textarea";
import { upload_rma_request_service } from "@/app/services/desicion-making-service";
import { useSelector } from "react-redux";
import { router } from "@inertiajs/react";
import routing from "../../../components/routing";

export default function RMAUploadForm() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.app);
    const ticket_id=window.location.pathname.split('/')[4]
console.log('user',user)
    const props = {
        method: "GET",
        action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
        onChange({ file, fileList }) {
            if (file.status !== "uploading") {
                setData({
                    ...data,
                    file: file.originFileObj,
                });
            }
        },
    };
    async function submitForm(params) {
        const fd = new FormData();
        fd.append("file", data.file);
        fd.append("notes", data.notes);
        fd.append("ticket_id", ticket_id);
        fd.append("user_id", user.id);
        try {
            const result = await upload_rma_request_service(fd);
            setLoading(true);
            router.visit(routing("files"));
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col gap-4">
            <Upload listType="picture" {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            <Textarea
                name="notes"
                value={data.notes ?? ""}
                label="Notes"
                type=""
                errorMessage="Notes is required!"
                onChange={(e) =>
                    setData({
                        ...data,
                        notes: e,
                    })
                }
                required={true}
            />
            <Button onClick={submitForm} type="primary" size="large">
                UPLOAD
            </Button>
        </div>
    );
}

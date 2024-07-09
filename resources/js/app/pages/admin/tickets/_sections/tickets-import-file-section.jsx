import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { upload_csv_file_service } from "@/app/services/refund-service";

export default function TicketsImportFileSection() {
    const props = {
        method: "GET",
        name: "file",
        accept: ".csv",
        listType: "picture",
        showUploadList: false,
        // action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
        headers: {
            authorization: "authorization-text",
        },
        async onChange(info) {
            if (info.file.status !== "uploading") {
                // console.log(info.file, info.fileList);
            }
            const fd = new FormData();
            fd.append("csv_file",info.file.originFileObj);
            await upload_csv_file_service(fd);
            if (info.file.status === "done") {
                message.success(`${info.file.name} Updated Successfully!`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div>
            <Upload {...props}>
                <Button size="large" icon={<UploadOutlined />}>
                    Click to Upload
                </Button>
            </Upload>
            {/* <input type="file" accept=".csv"  onChange={(e)=>console.log(e.target.files[0])}/> */}
        </div>
    );
}

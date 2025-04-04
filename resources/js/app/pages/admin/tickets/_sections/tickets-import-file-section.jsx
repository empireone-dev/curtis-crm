import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload } from "antd";
import { upload_csv_file_service } from "@/app/services/refund-service";
import { Radio } from "antd";
import { useSelector } from "react-redux";

export default function TicketsImportFileSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [type, setType] = useState("REPLACEMENT");
    const { user } = useSelector((state) => state.app);
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            if (info.file.status !== "uploading") {
                // console.log(info.file, info.fileList);
            }

            const fd = new FormData();
            fd.append("csv_file", info.file.originFileObj);
            fd.append("type", type);
            fd.append("user_id", user.id);
            try {
                await upload_csv_file_service(fd);
                if (info.file.status === "done") {
                    message.success(`${info.file.name} Updated Successfully!`);
                    setLoading(false);
                } else if (info.file.status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                    setLoading(false);
                }
            } catch (error) {
                message.error(`${info.file.name} file upload failed.`);
                setLoading(false);
            }
        },
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Button type="primary" onClick={showModal}>
                IMPORT CSV FILE
            </Button>
            <Modal
                title="IMPORT CSV FILE"
                open={isModalOpen}
                onOk={handleOk}
                okButtonProps={{
                    disabled: true,
                    className: "hidden",
                }}
                cancelButtonProps={{
                    disabled: true,
                    className: "hidden",
                }}
                onCancel={handleCancel}
            >
                <div className="flex flex-col gap-5">
                    <Radio.Group
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    >
                        <Radio value={"REPLACEMENT"}>REPLACEMENT</Radio>
                        <Radio value={"REFUND"}>REFUND</Radio>
                    </Radio.Group>
                    <Upload {...props}>
                        <Button
                            size="large"
                            loading={loading}
                            icon={<UploadOutlined />}
                        >
                            Click to Upload
                        </Button>
                    </Upload>
                </div>
            </Modal>
        </div>
    );
}

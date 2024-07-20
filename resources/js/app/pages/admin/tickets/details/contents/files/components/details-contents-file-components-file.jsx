import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import { useSelector } from "react-redux";
import { router, usePage } from "@inertiajs/react";
import store from "@/app/store/store";
import {
    delete_upload_ticket_files_thunk,
    upload_ticket_files_thunk,
} from "@/app/pages/customer/tickets/redux/customer-tickets-thunk";
import moment from "moment";
import { message } from "antd";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const DetailsFileUploadComponent = ({ files, type }) => {
    const { user } = useSelector((state) => state.app);
    const { url } = usePage();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const key = "updatable";

    useEffect(() => {
        setFileList([
            ...fileList,
            ...files.map((res) => ({
                uid: res.id,
                name: moment(res.created_at).format("LLLL"),
                url: res.url,
                status: "done",
                extension: res.url.split("/").pop().split(".").pop(),
            })),
        ]);
    }, []);

    const handlePreview = async (file) => {
        try {
            if (file.extension == "pdf") {
                window.open(file.url, "_blank");
            } else if (file.extension == "docx") {
                const encodedUrl = encodeURIComponent(file.url);
                window.open(
                    `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`,
                    "_blank"
                );
            } else if (["mp4", "webm", "ogg", "mov"].includes(file.extension)) {
                window.open(file.url, "_blank");
            } else {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                // setPreviewImage(file.url || file.preview);
                // setPreviewOpen(true);
                window.open(file.url, "_blank");
            }
        } catch (error) {
            console.error("Error handling file preview:", error);
        }
    };

    // Function to convert file to Base64 (assuming you have this function defined)
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    function checkStatus(data) {
        // Check if there is any object with status 'active'
        const hasActive = data.some((obj) => obj.status !== "done");
        if (hasActive) {
            return false;
        } else {
            return true;
        }
    }
    async function handleChange({ fileList: newFileList }) {
        messageApi.open({
            key,
            type: "loading",
            content: "Loading...",
        });

        const fd = new FormData();
        const ticket_id = url
            .split("/")
            [url.split("/").length - 2].split("#")[0];
        const resolvedTicketId =
            ticket_id === "tickets"
                ? window.location.pathname.split("/")[3]
                : ticket_id;

        fd.append("ticket_id", resolvedTicketId);
        fd.append("user_id", user.id);
        fd.append("type", type);

        if (checkStatus(newFileList)) {
            newFileList.forEach((file) => {
                if (file.name !== "uploaded" && file.status === "done") {
                    fd.append("files[]", file.originFileObj);
                }
            });
        } else {
            newFileList.forEach((file) => {
                if (file.status === "uploading") {
                    setFileList(newFileList);
                }
            });
        }
        // Upload the files

        if (newFileList.length !== 0) {
            const data = await store.dispatch(
                upload_ticket_files_thunk(fd, resolvedTicketId)
            );
            newFileList.forEach((file) => {
                if (data.resp.length !== 0) {
                    // console.log('newFileLists',data.resp)
                    if (file.status === "uploading") {
                        setFileList(newFileList);
                    }else{
                        setFileList(
                            data.resp.map((res) => ({
                                uid: res.id,
                                name: moment(res.created_at).format("LLLL"),
                                url: res.url,
                                status: "done",
                                extension: res.url
                                    .split("/")
                                    .pop()
                                    .split(".")
                                    .pop(),
                            }))
                        );
                    }
                    // setFileList(newFileList);
                }
            });
        }
        // Update file list with the response data

        // setTimeout(() => {
        //     messageApi.open({
        //         key,
        //         type: "success",
        //         content: "Uploaded!",
        //         duration: 2,
        //     });
        // }, 1500);
    }
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    async function remove_image(value) {
        const ticket_id = url
            .split("/")
            [url.split("/").length - 2].split("#")[0];

        if (confirm("Do you want to delete the file?")) {
            const res = await store.dispatch(
                delete_upload_ticket_files_thunk(value.uid, ticket_id)
            );
            setFileList(
                res.data.map((res) => ({
                    uid: res.id,
                    name: moment(res.created_at).format("LLLL"),
                    url: res.url,
                    status: "done",
                    extension: res.url.split("/").pop().split(".").pop(),
                }))
            );
        }
    }
    return (
        <>
            {contextHolder}
            <div class="px-4 py-3 ">
            <div className="border border-blue-500 hover:border-blue-600 p-2.5 rounded-md">
                <Upload
                    multiple
                    method="GET"
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    onRemove={remove_image}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
            </div>

            {previewImage && fileList.length !== 0 && (
                <Image.PreviewGroup
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                            !visible && setPreviewImage(""),
                    }}
                >
                    <Image
                        wrapperStyle={{
                            display: "none",
                        }}
                        src={previewImage}
                    />
                </Image.PreviewGroup>
            )}
            </div>
        </>
    );
};
export default DetailsFileUploadComponent;

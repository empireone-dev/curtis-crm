import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import { useSelector } from "react-redux";
import { usePage } from "@inertiajs/react";
import store from "@/app/store/store";
import { upload_ticket_files_thunk } from "@/app/pages/customer/tickets/redux/customer-tickets-thunk";
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

    //   [

    //     {
    //       uid: '-4',
    //       name: 'image.png',
    //       status: 'done',
    //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     },
    //     {
    //       uid: '-xxx',
    //       percent: 50,
    //       name: 'image.png',
    //       status: 'uploading',
    //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    //     },
    //     {
    //       uid: '-5',
    //       name: 'image.png',
    //       status: 'error',
    //     },
    //   ]

    useEffect(() => {
        setFileList([
            ...fileList,
            ...files.map((res) => ({
                uid: res.id,
                name: "uploaded",
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
            }else if (["mp4", "webm", "ogg", "mov"].includes(file.extension)) {
                window.open(file.url, '_blank');
            } else {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }
                setPreviewImage(file.url || file.preview);
                setPreviewOpen(true);
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
        const fd = new FormData();
        const ticket_id = url
            .split("/")
            [url.split("/").length - 2].split("#")[0];
        fd.append("ticket_id", ticket_id);
        fd.append("user_id", user.id);
        fd.append("type", type);

        if (checkStatus(newFileList)) {
            for (let i = 0; i < newFileList.length; i++) {
                if (
                    newFileList[i].name !== "uploaded" &&
                    newFileList[i].status == "done"
                ) {
                    fd.append("files[]", newFileList[i].originFileObj);
                    setFileList(newFileList);
                }
            }
        } else {
            setFileList(newFileList);
        }
        await store.dispatch(upload_ticket_files_thunk(fd, ticket_id));
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
    return (
        <>
            <Upload
                multiple
                method="GET"
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
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
        </>
    );
};
export default DetailsFileUploadComponent;

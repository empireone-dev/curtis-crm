import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

export default function UploadFilesSection({ form, setForm }) {
    // const fileList = [
    //     {
    //         uid: "0",
    //         name: "xxx.png",
    //         status: "uploading",
    //         percent: 33,
    //     },
    //     {
    //         uid: "-1",
    //         name: "yyy.png",
    //         status: "done",
    //         url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //         thumbUrl:
    //             "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //     },
    //     {
    //         uid: "-2",
    //         name: "zzz.png",
    //         status: "error",
    //     },
    // ];

    const attachments =form?.dealer?.attachments1.map((res,i)=>({
        uid: i,
        name: res.file,
        url: res.file,
        status: "done",
    }))

    const invoices =form?.dealer?.invoices1.map((res,i)=>({
        uid: i,
        name: res.file,
        url: res.file,
        status: "done",
    }))
    console.log('formaaaa',attachments)
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    function upload_attachment(e) {
        const filePromises = e.fileList.map((element) => {
            const file = element.originFileObj;
            return fileToBase64(file);
        });

        Promise.all(filePromises)
            .then((base64Strings) => {
                setForm({
                    ...form,
                    dealer: {
                        ...form.dealer,
                        attachments: base64Strings,
                    },
                });
            })
            .catch((error) => {
                console.error("Error converting files:", error);
            });
    }

    function upload_invoice(e) {
        const filePromises = e.fileList.map((element) => {
            const file = element.originFileObj;
            return fileToBase64(file);
        });

        Promise.all(filePromises)
            .then((base64Strings) => {
                setForm({
                    ...form,
                    dealer: {
                        ...form.dealer,
                        invoices: base64Strings,
                    },
                });
            })
            .catch((error) => {
                console.error("Error converting files:", error);
            });
    }
    return (
        <div>
            <Upload
                method="GET"
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture"
                defaultFileList={attachments}
                multiple
                onChange={upload_attachment}
            >
                <Button type="primary" icon={<UploadOutlined />}>
                    Upload Attachments
                </Button>
            </Upload>
            <br />
            <Upload
         
                method="GET"
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture"
                multiple
                defaultFileList={invoices}
                onChange={upload_invoice}
            >
                <Button type="primary" icon={<UploadOutlined />}>
                    Attach Invoice
                </Button>
            </Upload>
        </div>
    );
}

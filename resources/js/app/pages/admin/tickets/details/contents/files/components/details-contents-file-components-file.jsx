import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { router, usePage } from "@inertiajs/react";
import store from "@/app/store/store";
import {
    delete_upload_ticket_files_thunk,
    upload_ticket_files_thunk,
} from "@/app/pages/customer/tickets/redux/customer-tickets-thunk";
import moment from "moment";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const isImage = (extension) => {
    return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(
        extension?.toLowerCase()
    );
};

const DetailsFileUploadComponent = ({ files, type }) => {
    const { user } = useSelector((state) => state.app);
    const { url } = usePage();
    
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const [toast, setToast] = useState(null); 
    const [isUploading, setIsUploading] = useState(false); // Added loading state
    
    const fileInputRef = useRef(null);

    useEffect(() => {
        setFileList([
            ...files.map((res) => ({
                uid: res.id,
                name: moment(res.created_at).format("LLLL"),
                url: res.url,
                status: "done",
                extension: res.url.split("/").pop().split(".").pop(),
            })),
        ]);
    }, [files]);

    const showToast = (type, text, duration = 3000) => {
        setToast({ type, text });
        if (duration > 0) {
            setTimeout(() => setToast(null), duration);
        }
    };

    const handlePreview = async (file) => {
        try {
            if (file.extension === "pdf") {
                window.open(file.url, "_blank");
            } else if (file.extension === "docx") {
                const encodedUrl = encodeURIComponent(file.url);
                window.open(
                    `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`,
                    "_blank"
                );
            } else if (["mp4", "webm", "ogg", "mov"].includes(file.extension)) {
                window.open(file.url, "_blank");
            } else if (isImage(file.extension)) {
                setPreviewImage(file.url || file.preview);
                setPreviewOpen(true);
            } else {
                window.open(file.url, "_blank");
            }
        } catch (error) {
            console.error("Error handling file preview:", error);
        }
    };

    const handleFileChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length === 0) return;

        setIsUploading(true); // Start loading
        showToast("loading", "Uploading...", 0);

        const fd = new FormData();
        const ticket_id = url.split("/")[url.split("/").length - 2].split("#")[0];
        const resolvedTicketId =
            ticket_id === "tickets"
                ? window.location.pathname.split("/")[3]
                : ticket_id;

        fd.append("ticket_id", resolvedTicketId);
        fd.append("user_id", user.id);
        fd.append("type", type);

        selectedFiles.forEach((file) => {
            fd.append("files[]", file);
        });

        try {
            const data = await store.dispatch(
                upload_ticket_files_thunk(fd, resolvedTicketId)
            );
            
            if (data?.resp) {
                setFileList(
                    data.resp.map((res) => ({
                        uid: res.id,
                        name: moment(res.created_at).format("LLLL"),
                        url: res.url,
                        status: "done",
                        extension: res.url.split("/").pop().split(".").pop(),
                    }))
                );
            }
            showToast("success", "Uploaded successfully!", 2000);
        } catch (error) {
            console.error("Upload error:", error);
            showToast("error", "Upload failed", 3000);
        } finally {
            setIsUploading(false); // Stop loading
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const remove_image = async (uid) => {
        const ticket_id = url.split("/")[url.split("/").length - 2].split("#")[0];

        if (window.confirm("Do you want to delete the file?")) {
            try {
                const res = await store.dispatch(
                    delete_upload_ticket_files_thunk(uid, ticket_id)
                );
                if (res?.data) {
                    setFileList(
                        res.data.map((item) => ({
                            uid: item.id,
                            name: moment(item.created_at).format("LLLL"),
                            url: item.url,
                            status: "done",
                            extension: item.url.split("/").pop().split(".").pop(),
                        }))
                    );
                }
            } catch (error) {
                console.error("Error deleting file:", error);
                showToast("error", "Failed to delete file", 3000);
            }
        }
    };

    return (
        <>
            {/* Custom Toast Notification */}
            {toast && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999] flex items-center gap-2 px-4 py-2 bg-white border shadow-lg rounded-md text-sm font-medium transition-all duration-300">
                    {toast.type === "loading" && (
                        <svg className="w-5 h-5 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {toast.type === "success" && (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                    {toast.type === "error" && (
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    )}
                    <span className="text-gray-700">{toast.text}</span>
                </div>
            )}

            <div className="px-4 py-3">
                <div className="border border-blue-500 hover:border-blue-600 p-2.5 rounded-md bg-white transition-colors duration-200">
                    
                    {/* File List */}
                    {fileList.length > 0 && (
                        <ul className="space-y-2 mb-3">
                            {fileList.map((file) => (
                                <li key={file.uid} className={`flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 group ${isUploading ? 'opacity-70 pointer-events-none' : ''}`}>
                                    <div 
                                        className="flex items-center gap-3 cursor-pointer overflow-hidden flex-1" 
                                        onClick={() => handlePreview(file)}
                                    >
                                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded overflow-hidden">
                                            {isImage(file.extension) ? (
                                                <img src={file.url} alt="preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-blue-500 group-hover:text-blue-700 group-hover:underline text-sm font-medium truncate">
                                            {file.name || file.url.split("/").pop()}
                                        </span>
                                    </div>

                                    <button 
                                        type="button" 
                                        onClick={() => remove_image(file.uid)}
                                        disabled={isUploading}
                                        className="text-gray-400 hover:text-red-500 p-2 transition-colors focus:outline-none disabled:opacity-50" 
                                        title="Remove file"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Hidden Native File Input */}
                    <input 
                        type="file" 
                        multiple 
                        className="hidden" 
                        ref={fileInputRef} 
                        onChange={handleFileChange}
                        disabled={isUploading}
                    />

                    {/* Custom Upload Button */}
                    {fileList.length < 8 && (
                        <button
                            type="button"
                            onClick={() => !isUploading && fileInputRef.current?.click()}
                            disabled={isUploading}
                            className={`flex flex-col items-center justify-center w-[104px] h-[104px] bg-gray-50 border border-dashed rounded transition-colors duration-200 ${
                                isUploading
                                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                                    : "border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                            }`}
                        >
                            {isUploading ? (
                                <svg className="w-6 h-6 mb-2 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                            )}
                            <span className="text-sm">{isUploading ? "Uploading..." : "Upload"}</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Image Preview Modal */}
            {previewOpen && previewImage && (
                <div 
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-75 transition-opacity" 
                    onClick={() => setPreviewOpen(false)}
                >
                    <div className="relative max-w-5xl max-h-[90vh] p-4 flex flex-col items-center justify-center">
                        <button 
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 text-4xl leading-none focus:outline-none"
                            onClick={() => setPreviewOpen(false)}
                        >
                            &times;
                        </button>
                        <img 
                            src={previewImage} 
                            alt="Preview" 
                            className="max-w-full max-h-full object-contain rounded shadow-lg" 
                            onClick={(e) => e.stopPropagation()} 
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailsFileUploadComponent;
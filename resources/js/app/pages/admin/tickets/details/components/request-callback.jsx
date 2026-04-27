import React, { useState } from "react";
import { store_tech_call_back_service } from "@/app/services/tech-call-back-service";
import { useDispatch, useSelector } from "react-redux";
import { get_tickets_by_ticket_id } from "@/app/services/tickets-service";
import { setTicket } from "../../_redux/tickets-slice";
import { usePage } from "@inertiajs/react";

export default function RequestCallback() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState(""); // Replaces Antd form state
    const [toast, setToast] = useState(null); // Replaces Antd message API

    const { ticket } = useSelector((state) => state.tickets);
    const { url } = usePage();
    const dispatch = useDispatch();

    // Helper to trigger brief toast notifications
    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3000);
    };

    // Handles closing the modal and resetting the form fields
    const handleCancel = () => {
        setOpen(false);
        setNotes("");
    };

    // Handles the form submission natively
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const values = { notes };
            console.log("Callback Request Submitted:", values);
            
            await store_tech_call_back_service({
                ...ticket,
                ...values,
            });

            const ticketId = url
                .split("/")
                [url.split("/").length - 2].split("#")[0];

            const ress = await get_tickets_by_ticket_id(ticketId);
            dispatch(setTicket(ress));

            showToast("success", "Callback requested successfully!");

            // Close modal and clear form after successful submission
            setOpen(false);
            setNotes("");
        } catch (error) {
            console.error("Error submitting callback request:", error);
            showToast("error", "Failed to request callback. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Custom Toast Notification */}
            {toast && (
                <div 
                    className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-md shadow-lg text-white font-medium transition-opacity duration-300 ${
                        toast.type === "success" ? "bg-green-500" : "bg-red-500"
                    }`}
                >
                    {toast.message}
                </div>
            )}

            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
                Request Callback
            </button>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={handleCancel}
                    ></div>

                    {/* Modal Content container */}
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg z-50 overflow-hidden flex flex-col">
                        
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Request a Callback
                            </h3>
                            <button
                                onClick={handleCancel}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                aria-label="Close"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Standard HTML Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="px-6 py-5">
                                <label 
                                    htmlFor="notes" 
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Notes
                                </label>
                                <textarea
                                    id="notes"
                                    rows={4}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-y"
                                    placeholder="Let us know what this is regarding or the best time to call..."
                                />
                            </div>

                            {/* Modal Footer */}
                            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={loading}
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-60"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {/* Loading Spinner */}
                                    {loading && (
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    {loading ? "Submitting..." : "Submit Request"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
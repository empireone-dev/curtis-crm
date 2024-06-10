import React, { useEffect, useState } from "react";
import CustomerTicketsBillOfSaleSection from "./customer-tickets-bill-of-sale-section";
import CustomerTicketsFrontOfTheUnitSection from "./customer-tickets-front-of-the-unit-section";
import CustomerTicketsRearOfTheUnitSection from "./customer-tickets-rear-of-the-unit-section";
import CustomerTicketsReadableSerialSection from "./customer-tickets-readable-serial-section";
import CustomerTicketsDefectIssueSection from "./customer-tickets-defect-issue-section";
import CustomerTicketsClearModel from "./customer-tickets-clear-model";
import CustomerTicketsPartsModel from "./customer-tickets-parts-model";
import CustomerTicketsReceiptModel from "./customer-tickets-receipt-model";
import CustomerTicketsSerialModel from "./customer-tickets-serial-model";
import { router, usePage } from "@inertiajs/react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { upload_photo_status } from "@/app/services/files-service";

export default function WarrantyFilesSection() {
    const { ticket } = useSelector((state) => state.tickets);
    const { filesData } = useSelector((state) => state.customer_tickets);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    function notes_notification() {
        if (
            ticket.call_type == "CF-Warranty Claim" &&
            filesData.bill_of_sale &&
            filesData.front_of_the_unit &&
            filesData.rear_of_the_unit &&
            filesData.readable_serial_section &&
            filesData.defect_issue &&
            ticket.isUploading == "true"
        ) {
            return true;
        } else if (
            ticket.call_type == "Parts" &&
            filesData.clear_model &&
            filesData.parts_model &&
            filesData.receipt_model &&
            filesData.serial_model &&
            ticket.isUploading == "true"
        ) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    async function uploadPhoto(params) {
        setLoading(true);
        try {
            await upload_photo_status({
                ticket_id: ticket.id,
            });
            router.visit(window.location.pathname);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="my-3">
                {notes_notification() ? (
                    <div className="text-green-600 text-2xl font-black border border-green-600 p-2 px-5">
                        Information Completed{" "}
                    </div>
                ) : (
                    <div className="text-red-600 text-2xl font-black border border-red-600 p-2  px-5">
                        Incomplete Information
                    </div>
                )}
            </div>
            {!isLoading &&
            ticket?.call_type &&
            ticket?.call_type == "CF-Warranty Claim" ? (
                <>
                    <CustomerTicketsBillOfSaleSection />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsFrontOfTheUnitSection />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsRearOfTheUnitSection />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsReadableSerialSection />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsDefectIssueSection />
                </>
            ) : (
                <>
                    <CustomerTicketsSerialModel />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsReceiptModel />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsPartsModel />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsClearModel />
                </>
            )}
            <Button
                onClick={uploadPhoto}
                type="primary"
                size="large"
                className="my-10 w-full"
            >
                UPLOAD PHOTOS
            </Button>
        </>
    );
}

import React, { useEffect } from "react";
import CustomerTicketsBillOfSaleSection from "./customer-tickets-bill-of-sale-section";
import CustomerTicketsFrontOfTheUnitSection from "./customer-tickets-front-of-the-unit-section";
import CustomerTicketsRearOfTheUnitSection from "./customer-tickets-rear-of-the-unit-section";
import CustomerTicketsReadableSerialSection from "./customer-tickets-readable-serial-section";
import CustomerTicketsDefectIssueSection from "./customer-tickets-defect-issue-section";
import CustomerTicketsClearModel from "./customer-tickets-clear-model";
import CustomerTicketsPartsModel from "./customer-tickets-parts-model";
import CustomerTicketsReceiptModel from "./customer-tickets-receipt-model";
import CustomerTicketsSerialModel from "./customer-tickets-serial-model";
import { usePage } from "@inertiajs/react";
import { useDispatch, useSelector } from "react-redux";

export default function WarrantyFilesSection() {
    const { ticket } = useSelector((state) => state.tickets);
    const { filesData } = useSelector((state) => state.customer_tickets);
    function notes_notification() {
        if (
            ticket.call_type == "CF-Warranty Claim" &&
            filesData.bill_of_sale &&
            filesData.front_of_the_unit &&
            filesData.rear_of_the_unit &&
            filesData.readable_serial_section &&
            filesData.defect_issue
        ) {
            return true;
        } else if (
            ticket.call_type == "Parts" &&
            filesData.clear_model &&
            filesData.parts_model &&
            filesData.receipt_model &&
            filesData.serial_model
        ) {
            return true;
        } else {
            return false;
        }
    }
    return (
        <>
            {notes_notification() ? (
                <div className="text-green-600 text-2xl font-black border border-green-600 p-2 px-5">
                    Information Completed{" "}
                </div>
            ) : (
                <div className="text-red-600 text-2xl font-black border border-red-600 p-2  px-5">
                    Incomplete Information
                </div>
            )}
            {ticket?.call_type && ticket?.call_type == "CF-Warranty Claim" ? (
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
        </>
    );
}

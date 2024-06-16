import React, { useEffect, useState } from "react";
import CustomerTicketsBillOfSaleSection from "./customer-tickets-bill-of-sale-section";
import CustomerTicketsFrontOfTheUnitSection from "./customer-tickets-front-of-the-unit-section";
import CustomerTicketsRearOfTheUnitSection from "./customer-tickets-rear-of-the-unit-section";
import CustomerTicketsReadableSerialSection from "./customer-tickets-readable-serial-section";
import CustomerTicketsDefectIssueSection from "./customer-tickets-defect-issue-section";
import CustomerTicketsUpdateExplanation from "./customer-tickets-update-explanation";
import store from "@/app/store/store";
import { get_upload_ticket_files_thunk } from "../../redux/customer-tickets-thunk";
import { setFilesData } from "../../redux/customer-tickets-slice";
import { usePage } from "@inertiajs/react";
import { useDispatch, useSelector } from "react-redux";
import CustomerTicketsClearModel from "./customer-tickets-clear-model";
import CustomerTicketsPartsModel from "./customer-tickets-parts-model";
import CustomerTicketsReceiptModel from "./customer-tickets-receipt-model";
import CustomerTicketsSerialModel from "./customer-tickets-serial-model";

export default function TicketsDetailsFormSection() {
    const { url } = usePage();
    const dispatch = useDispatch();
    const [isTranslate,setIsTranslate] =useState(false)
    const { ticket, filesData } = useSelector(
        (state) => state.customer_tickets
    );
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await store.dispatch(
                    get_upload_ticket_files_thunk(url.split("/")[3])
                );
                console.log("res", res);
                dispatch(setFilesData(res));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [url]);
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
          <button
          onClick={()=>setIsTranslate(!isTranslate)}
          className="p-3 bg-orange-500 hover:bg-orange-600 text-white my-3 font-black rounded-md">
                TRANSLATE
            </button>
            <CustomerTicketsUpdateExplanation
            isTranslate={isTranslate}
            />
          
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
                    <CustomerTicketsBillOfSaleSection 
                    isTranslate={isTranslate}
                    />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsFrontOfTheUnitSection 
                    isTranslate={isTranslate}
                    />
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsRearOfTheUnitSection 
                    isTranslate={isTranslate}/>
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsReadableSerialSection isTranslate={isTranslate}/>
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsDefectIssueSection isTranslate={isTranslate}/>
                </>
            ) : (
                <>
                    <CustomerTicketsClearModel isTranslate={isTranslate}/>
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsPartsModel isTranslate={isTranslate}/>
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsReceiptModel isTranslate={isTranslate}/>
                    <div className="h-px my-8 border border-blue-500 w-full" />
                    <CustomerTicketsSerialModel isTranslate={isTranslate}/>
                </>
            )}
        </>
    );
}

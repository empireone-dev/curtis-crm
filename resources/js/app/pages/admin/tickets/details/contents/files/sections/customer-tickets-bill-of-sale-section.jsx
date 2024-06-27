import store from "@/app/store/store";
import React, { useState } from "react";
import { delete_upload_ticket_files_thunk } from "@/app/pages/customer/tickets/redux/customer-tickets-thunk";
import { useSelector } from "react-redux";
import DetailsFileUploadComponent from "../components/details-contents-file-components-file";

export default function CustomerTicketsBillOfSaleSection() {
    const { filesData } = useSelector((state) => state.customer_tickets);

    async function deleteFileImage(id, ticket_id) {
        if (confirm("Are you sure you wanna delete the image?")) {
            setIsLoading(true);
            await store.dispatch(
                delete_upload_ticket_files_thunk(id, ticket_id)
            );
            setIsLoading(false);
        }
    }
    return (
        <div>
            <section className="h-full w-full flex flex-col">
                <div className="text-xl font-black">
                    A clear and readable picture of the bill of sale
                </div>
                <div className="text-gray-400">
                    Please note the bill of sale must show the following:
                    <ul className="max-w-md space-y-1 text-gray-400 list-disc list-inside mt-2">
                        <li>
                            Store Name and Address *except if purchased online
                        </li>
                        <li>Date of purchase</li>
                        <li>Item description</li>
                        <li>Unit Price</li>
                        <li>Total amount paid</li>
                    </ul>
                </div>
                <div className="text-md font-gray-500">
                    If you do not have the bill of sale, you may try contacting
                    the dealer’s customer care department for added support.
                </div>
                <h1 className=" pb-3 font-semibold sm:text-lg text-gray-900">
                    To Upload
                </h1>

                <DetailsFileUploadComponent
                    type="bill_of_sale"
                    files={filesData?.bill_of_sale ?? []}
                />
            </section>
        </div>
    );
}

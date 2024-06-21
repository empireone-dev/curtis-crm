
import store from "@/app/store/store";
import React, { useState } from "react";
import {
    delete_upload_ticket_files_thunk,
} from "@/app/pages/customer/tickets/redux/customer-tickets-thunk";
import {  useSelector } from "react-redux";
import DetailsFileUploadComponent from "../components/details-contents-file-components-file";

const CustomerTicketDistroy = () => {
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
          <article
            aria-label="File Upload Modal"
            className="relative flex flex-col container  w-full h-1/2"
        >
            <section className="h-full w-full flex flex-col">
             
                <h1 className=" pb-3 font-semibold sm:text-lg text-gray-900">To Upload</h1>

                <DetailsFileUploadComponent
                    type="destroy_ticket"
                    files={filesData?.destroy_ticket ?? []}
                />
            </section>

        </article>
        </div>
    );
};

export default CustomerTicketDistroy;


import store from "@/app/store/store";
import React from "react";
import {
    delete_upload_ticket_files_thunk,
} from "@/app/pages/customer/tickets/redux/customer-tickets-thunk";
import { useSelector } from "react-redux";
import DetailsFileUploadComponent from "../components/details-contents-file-components-file";

const CustomerTicketsClearModel = () => {
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
        <article
            aria-label="File Upload Modal"
            className="relative flex flex-col container  w-full h-1/2"
        >
            <section className="h-full w-full flex flex-col">
                <div className="text-xl font-black">
                    Description of the part/s that you are looking for.
                </div>

                <h1 className=" pb-3 font-semibold sm:text-lg text-gray-900">To Upload</h1>

                <DetailsFileUploadComponent
                    type="clear_model"
                    files={filesData?.clear_model ?? []}
                />
            </section>

        </article>
    );
};

export default CustomerTicketsClearModel;

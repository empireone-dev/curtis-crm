import store from "@/app/store/store";
import React from "react";
import { useSelector } from "react-redux";
import {
    delete_upload_ticket_files_thunk,
    upload_ticket_files_thunk,
} from "@/app/pages/customer/tickets/redux/customer-tickets-thunk";
import DetailsFileUploadComponent from "../components/details-contents-file-components-file";

export default function CustomerTicketsRearOfTheUnitSection() {
    const { filesData } = useSelector((state) => state.customer_tickets);

    async function deleteFileImage(id, ticket_id) {
        if (confirm("Are you sure you wanna delete the image?")) {
            await store.dispatch(
                delete_upload_ticket_files_thunk(id, ticket_id)
            );
        }
    }

    return (
        <article
            aria-label="File Upload Modal"
            className="relative flex flex-col container  w-full h-1/2"
        >
            <section className="h-full w-full flex flex-col">
                <div className="text-xl font-black">
                    A clear picture of the rear of the unit
                </div>
                <div className="text-gray-400">All edges must be visible.</div>

                <h1 className=" pb-3 font-semibold sm:text-lg text-gray-900">
                    To Upload
                </h1>
                <DetailsFileUploadComponent
                    type="rear_of_the_unit"
                    files={filesData?.rear_of_the_unit ?? []}
                />
            </section>
        </article>
    );
}

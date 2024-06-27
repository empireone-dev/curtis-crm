import store from "@/app/store/store";
import React from "react";
import {
    delete_upload_ticket_files_thunk,
} from "@/app/pages/customer/tickets/redux/customer-tickets-thunk";
import { useSelector } from "react-redux";
import DetailsFileUploadComponent from "../components/details-contents-file-components-file";


export default function CustomerTicketsFrontOfTheUnitSection() {
    const { filesData } = useSelector((state) => state.customer_tickets);

    async function deleteFileImage(id, ticket_id) {
        if (confirm("Are you sure you wanna delete the image?")) {
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
                    A clear picture of the front of the unit
                </div>
                <div className="text-gray-400">
                    for TVs, a full frontal picture while the tv is turned on.
                </div>

                <h1 className=" pb-3 font-semibold sm:text-lg text-gray-900">
                    To Upload
                </h1>

                <DetailsFileUploadComponent
                    type="front_of_the_unit"
                    files={filesData?.front_of_the_unit ?? []}
                />
            </section>
        </article>
    );
}


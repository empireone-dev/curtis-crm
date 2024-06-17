import Loading from "@/app/layouts/components/loading";
import store from "@/app/store/store";
import { usePage } from "@inertiajs/react";
import React, { useState, useRef } from "react";
import {
    delete_upload_ticket_files_thunk,
    upload_ticket_files_thunk,
} from "../../redux/customer-tickets-thunk";
import { useSelector } from "react-redux";
import ImageView from "@/app/layouts/components/image-view";
import DetailsFileUploadComponent from "@/app/pages/admin/tickets/details/contents/files/components/details-contents-file-components-file";

const CustomerTicketsFrontOfTheUnitSection = ({ isTranslate }) => {
    const { filesData } = useSelector((state) => state.customer_tickets);

    async function deleteFileImage(id, ticket_id) {
        setIsLoading(true);
        await store.dispatch(delete_upload_ticket_files_thunk(id, ticket_id));
        setIsLoading(false);
    }

    return (
        <article
            aria-label="File Upload Modal"
            className="relative flex flex-col container  w-full h-1/2"
        >
            <section className="h-full w-full flex flex-col">
                {!isTranslate ? (
                    <>
                        <div className="text-xl font-black">
                            Une image claire de l'avant de l'unité
                        </div>
                        <div className="text-gray-400">
                            pour les téléviseurs, une image frontale complète
                            lorsque le téléviseur est allumé.
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-xl font-black">
                            A clear picture of the front of the unit
                        </div>
                        <div className="text-gray-400">
                            for TVs, a full frontal picture while the tv is
                            turned on.
                        </div>
                    </>
                )}

                <DetailsFileUploadComponent
                    type="front_of_the_unit"
                    files={filesData?.front_of_the_unit ?? []}
                />
            </section>
        </article>
    );
};

export default CustomerTicketsFrontOfTheUnitSection;

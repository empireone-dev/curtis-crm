import store from "@/app/store/store";
import { usePage } from "@inertiajs/react";
import React from "react";
import { delete_upload_ticket_files_thunk } from "../../redux/customer-tickets-thunk";
import { useSelector } from "react-redux";
import DetailsFileUploadComponent from "@/app/pages/admin/tickets/details/contents/files/components/details-contents-file-components-file";

const CustomerTicketsRearOfTheUnitSection = ({ isTranslate }) => {
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
                            Une image claire de l'arrière de l'appareil
                        </div>
                        <div className="text-gray-400">
                            Tous les bords doivent être visibles.
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-xl font-black">
                            A clear picture of the rear of the unit
                        </div>
                        <div className="text-gray-400">
                            All edges must be visible.
                        </div>
                    </>
                )}

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
};

export default CustomerTicketsRearOfTheUnitSection;

import store from "@/app/store/store";
import React from "react";
import { delete_upload_ticket_files_thunk } from "../../redux/customer-tickets-thunk";
import { useSelector } from "react-redux";
import DetailsFileUploadComponent from "@/app/pages/admin/tickets/details/contents/files/components/details-contents-file-components-file";

const CustomerTicketsPartsModel = ({ isTranslate }) => {
    const { filesData } = useSelector((state) => state.customer_tickets);
    const { user } = useSelector((state) => state.app);

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
                            Image claire de la ou des pièces dont vous avez
                            besoin.
                        </div>
                        <div className="text-xl font-black">
                            Photo claire de l'unité dans laquelle se trouve la
                            pièce manquante/endommagée.
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-xl font-black">
                            Clear picture of the part/s you need.
                        </div>
                        <div className="text-xl font-black">
                            Clear photo of the unit in which the missing/damaged
                            part is located.
                        </div>
                    </>
                )}

                <h1 className=" pb-3 font-semibold sm:text-lg text-gray-900"></h1>
                <DetailsFileUploadComponent
                    type="parts_model"
                    files={filesData?.parts_model ?? []}
                />
            </section>
        </article>
    );
};

export default CustomerTicketsPartsModel;

import store from "@/app/store/store";
import React, { useState,  } from "react";
import {
    delete_upload_ticket_files_thunk,
} from "../../redux/customer-tickets-thunk";
import { useSelector } from "react-redux";
import DetailsFileUploadComponent from "@/app/pages/admin/tickets/details/contents/files/components/details-contents-file-components-file";

const CustomerTicketsReadableSerialSection = ({ isTranslate }) => {
    const { filesData } = useSelector((state) => state.customer_tickets);
    const [isLoading, setIsLoading] = useState(false);



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
                            Une image claire et lisible de l'autocollant du
                            numéro de modèle et du numéro de série
                        </div>
                        <div className="text-gray-400">
                            situé à l'arrière de l'appareil.
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-xl font-black">
                            A clear and readable picture of the model # and
                            serial # sticker
                        </div>
                        <div className="text-gray-400">
                            located at the back of the unit.
                        </div>
                    </>
                )}

                <h1 className=" pb-3 font-semibold sm:text-lg text-gray-900">
                    To Upload
                </h1>

                <DetailsFileUploadComponent
                    type="readable_serial_section"
                    files={filesData?.readable_serial_section ?? []}
                />
            </section>
        </article>
    );
};

export default CustomerTicketsReadableSerialSection;

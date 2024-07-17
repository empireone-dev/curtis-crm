import store from "@/app/store/store";
import React, { useState } from "react";
import { delete_upload_ticket_files_thunk } from "../../redux/customer-tickets-thunk";
import { useSelector } from "react-redux";
import DetailsFileUploadComponent from "@/app/pages/admin/tickets/details/contents/files/components/details-contents-file-components-file";

const CustomerTicketsSerialModel = ({isTranslate}) => {
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
                    <div className="text-xl font-black">
                        Image claire et lisible de l'autocollant du modèle et du numéro de série (situé à l'arrière de l'appareil)
                    </div>
                ) : (
                    <div className="text-xl font-black">
                        Clear and readable picture of the model and serial number sticker (located at the back of the unit)
                    </div>
                )}
                <h1 className=" pb-3 font-semibold sm:text-lg text-gray-900"></h1>
                <DetailsFileUploadComponent
                    type="serial_model"
                    files={filesData?.serial_model ?? []}
                />
            </section>
        </article>
    );
};

export default CustomerTicketsSerialModel;

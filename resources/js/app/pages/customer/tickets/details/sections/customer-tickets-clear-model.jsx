import store from "@/app/store/store";
import React, { useState, useRef, useEffect } from "react";
import {
    delete_upload_ticket_files_thunk,
} from "../../redux/customer-tickets-thunk";
import { useDispatch, useSelector } from "react-redux";
import DetailsFileUploadComponent from "@/app/pages/admin/tickets/details/contents/files/components/details-contents-file-components-file";

const CustomerTicketsClearModel = ({ isTranslate }) => {
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
                            Description de la ou des pièces que vous recherchez
                    </div>
                ) : (
                    <div className="text-xl font-black">
                         Description of the part/s that you are looking for.
                    </div>
                )}
                <h1 className=" pb-3 font-semibold sm:text-lg text-gray-900"></h1>
                <DetailsFileUploadComponent
                    type="clear_model"
                    files={filesData?.clear_model ?? []}
                />
            </section>
        </article>
    );
};

export default CustomerTicketsClearModel;

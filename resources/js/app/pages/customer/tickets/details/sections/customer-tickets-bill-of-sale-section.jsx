import { upload_picture_videos } from "@/app/services/files-service";
import store from "@/app/store/store";
import React, { useState, useRef, useEffect } from "react";
import {
    delete_upload_ticket_files_thunk,
} from "../../redux/customer-tickets-thunk";
import { useDispatch, useSelector } from "react-redux";
import DetailsFileUploadComponent from "@/app/pages/admin/tickets/details/contents/files/components/details-contents-file-components-file";

const CustomerTicketsBillOfSaleSection = ({ isTranslate }) => {
    const { filesData } = useSelector((state) => state.customer_tickets);
    const dispatch = useDispatch();
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
                            Une image claire et lisible de l'acte de vente
                        </div>
                        <div className="text-gray-400">
                            Veuillez noter que l'acte de vente doit indiquer les
                            éléments suivants :
                            <ul className="max-w-md space-y-1 text-gray-400 list-disc list-inside mt-2">
                                <li>
                                    Nom et adresse du magasin *sauf si acheté en
                                    ligne
                                </li>
                                <li>Date d'achat</li>
                                <li>Description de l'article</li>
                                <li>Prix ​​unitaire</li>
                                <li>Montant total payé</li>
                            </ul>
                        </div>
                        <div className="text-md font-gray-500">
                            Si vous n'avez pas l'acte de vente, vous pouvez
                            essayer de contacter le service client du revendeur
                            pour une assistance supplémentaire.
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-xl font-black">
                            A clear and readable picture of the bill of sale
                        </div>
                        <div className="text-gray-400">
                            Please note the bill of sale must show the
                            following:
                            <ul className="max-w-md space-y-1 text-gray-400 list-disc list-inside mt-2">
                                <li>
                                    Store Name and Address *except if purchased
                                    online
                                </li>
                                <li>Date of purchase</li>
                                <li>Item description</li>
                                <li>Unit Price</li>
                                <li>Total amount paid</li>
                            </ul>
                        </div>
                        <div className="text-md font-gray-500">
                            If you do not have the bill of sale, you may try
                            contacting the dealer’s customer care department for
                            added support.
                        </div>
                    </>
                )}

                <DetailsFileUploadComponent
                    type="bill_of_sale"
                    files={filesData?.bill_of_sale ?? []}
                />
            </section>
        </article>
    );
};

export default CustomerTicketsBillOfSaleSection;

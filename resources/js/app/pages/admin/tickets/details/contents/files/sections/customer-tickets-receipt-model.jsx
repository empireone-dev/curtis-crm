import Loading from '@/app/layouts/components/loading';
import store from '@/app/store/store';
import { usePage } from '@inertiajs/react';
import React, { useState, useRef } from 'react';;
import { useSelector } from 'react-redux';
import ImageView from '@/app/layouts/components/image-view';
import { delete_upload_ticket_files_thunk, upload_ticket_files_thunk } from '@/app/pages/customer/tickets/redux/customer-tickets-thunk';
import DetailsFileUploadComponent from '../components/details-contents-file-components-file';

const CustomerTicketsReceiptModel = () => {
    const { filesData } = useSelector((state) => state.customer_tickets)
    const galleryRef2 = useRef(null);
    const [loading,setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useSelector((state) => state.app)
    const {url} = usePage()

   
    async function deleteFileImage(id, ticket_id) {
        if (confirm('Are you sure you wanna delete the image?')) {
        setIsLoading(true)
        await store.dispatch(delete_upload_ticket_files_thunk(id, ticket_id))
        setIsLoading(false)
        handleCancel()
        }
    }


    return (
        <article
            aria-label="File Upload Modal"
            className="relative flex flex-col container  w-full h-1/2"
        >
            <section className="h-full w-full flex flex-col">
                <div className='text-xl font-black'>
                Clear and readable picture of the bill of sale showing the date of purchase, item description and unit price.

                </div>
               
                
                <h1 className=" pb-3 font-semibold sm:text-lg text-gray-900">To Upload</h1>

                <DetailsFileUploadComponent
                    type="receipt_model"
                    files={filesData?.receipt_model ?? []}
                />
            </section>

        </article>
    );
};

export default CustomerTicketsReceiptModel;

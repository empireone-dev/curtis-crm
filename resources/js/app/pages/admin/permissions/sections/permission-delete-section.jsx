import Modal from '@/app/layouts/components/modal'
import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import store from '@/app/store/store';
import { delete_permission_thunk } from '../redux/permissions-thunk';

export default function PermissionDeleteSection({data}) {
    const [open, setOpen] = useState(false)
    const closeModal = () => {
        setOpen(false);
    };

    function deletePermission(id) {
        store.dispatch(delete_permission_thunk(id))
        closeModal();
    }
    
    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center">
                <TrashIcon className='h-6 text-white' />
            </button>
            <Modal
                open={open}
                setOpen={setOpen}
                title="Delete Permission"
            >
                Are you sure you want to delete Permission?

                <div class="flex border-gray-200 rounded-b dark:border-gray-600 mt-3.5">
                    <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => deletePermission(data.id)}>Yes, Proceed</button>
                    <button data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={closeModal}>Cancel</button>
                </div>
            </Modal>
        </div>
    )
}

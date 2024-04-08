import Drawer from '@/app/layouts/components/drawer'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { update_roles_thunk } from '../redux/roles-thunk';
import store from '@/app/store/store';

export default function RoleEditSection({ data }) {
    const [id, setId] = useState('');
    const [newData, setNewData] = useState({})
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setNewData(data)
    }, [data]);

    const closeModal = () => {
        setOpen(false);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        store.dispatch(update_roles_thunk(newData))
        closeModal();
    };
    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                type="button" className=" text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center">
                <PencilSquareIcon className='h-6 text-white' />
            </button>
            <Drawer
                open={open}
                setOpen={setOpen}
                title="Edit Roles"
            >
                <form onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <label htmlFor="first_name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={newData.name ?? ''}
                            onChange={(event) => setNewData({
                                ...newData,
                                name: event.target.value
                            })} />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="first_name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={newData.title ?? ''}
                            onChange={(event) => setNewData({
                                ...newData,
                                title: event.target.value
                            })} />
                    </div>  
                    <div className="mb-2 mt-5 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:text-slate-400" onClick={closeModal}>Cancel</button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                </form>
            </Drawer>
        </div>
    )
}

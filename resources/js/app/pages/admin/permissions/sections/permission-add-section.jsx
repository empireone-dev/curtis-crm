import Drawer from '@/app/layouts/components/drawer'
import React, { useState } from 'react'
import { store_permission_thunk } from '../redux/permissions-thunk';
import store from '@/app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import InputComponents from '@/app/layouts/components/input-components';
import { setPermissions, setPermissionsForm } from '../redux/permissions-slice';

export default function PermissionAddSection() {
    const { permissionsForm } = useSelector((state) => state.permissions)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const closeModal = () => {
        setOpen(false);
    };

    function changeHandler(e) {
        const data = e.target.name
        if (data == 'image') {
            dispatch(setPermissionsForm({
                ...permissionsForm,
                [data]: e.target.files
            }))
        } else {
            dispatch(setPermissionsForm({
                ...permissionsForm,
                [data]: e.target.value
            }))
        }

    }

    function submitPermission(e) {
        e.preventDefault()
        store.dispatch(store_permission_thunk(permissionsForm))
    }

    return (
        <div>
            <button onClick={() => setOpen(true)}
                type="button"
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Create Permission</span>
            </button>

            <Drawer
                open={open}
                setOpen={setOpen}
                title="Create New Permission"
            >
                <form onSubmit={submitPermission}>
                    <div className='mt-4'>
                        <InputComponents
                            name="name"
                            required={true}
                            label="Name"
                            placeholder="Name"
                            value={permissionsForm.name ?? ''}
                            type="text"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='mt-4'>
                        <InputComponents
                            name="title"
                            required={true}
                            label="Title"
                            placeholder="Title"
                            value={permissionsForm.title ?? ''}
                            type="text"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-2 mt-5 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900 hover:text-slate-400" onClick={closeModal}>Cancel</button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Drawer>
        </div>
    )
}

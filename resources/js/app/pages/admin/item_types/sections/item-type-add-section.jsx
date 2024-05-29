import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setItemTypesForm } from '../redux/item-types-slice';
import store from '@/app/store/store';
import { store_item_types_thunk } from '../redux/item-types-thunk';
import Drawer from '@/app/layouts/components/drawer';
import InputComponents from '@/app/layouts/components/input-components';

export default function ItemTypeAddSection() {
    const { item_typesForm } = useSelector((state) => state.item_types)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const closeModal = () => {
        setOpen(false);
    };

    function changeHandler(e) {
        const data = e.target.name
        if (data == 'image') {
            dispatch(setItemTypesForm({
                ...item_typesForm,
                [data]: e.target.files
            }))
        } else {
            dispatch(setItemTypesForm({
                ...item_typesForm,
                [data]: e.target.value
            }))
        }

    }

    function submitItemType(e) {
        e.preventDefault()
        store.dispatch(store_item_types_thunk(item_typesForm))
        closeModal();
    }
    return (
        <div>
            <button onClick={() => setOpen(true)}
             className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600  ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <span>Create Item Type</span>
            </button>

            <Drawer
                open={open}
                setOpen={setOpen}
                title="Create New Item Type"
            >
                <form onSubmit={submitItemType}>
                    <div className='mt-4'>
                        <InputComponents
                            name="name"
                            required={true}
                            label="Name"
                            placeholder="Name"
                            value={item_typesForm.name ?? ''}
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

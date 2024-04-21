import Drawer from '@/app/layouts/components/drawer'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { update_users_thunk } from '../redux/users.thunk';
import store from '@/app/store/store';

export default function UserEditSection({data}) {
    const [id, setId] = useState('');
    const [newData, setNewData] = useState({})
    const [open, setOpen] = useState(false)
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        setNewData(data)
    }, [data]);

    useEffect(() => {
        if (tooltipVisible) {
            const handleScroll = () => {
                setTooltipVisible(false);
            };
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [tooltipVisible]);

    const handleMouseEnter = (e) => {
        const rect = e.target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const tooltipWidth = 80;
        const tooltipHeight = 20;
        const tooltipX = rect.left + window.pageXOffset + rect.width + tooltipWidth < window.innerWidth
            ? rect.right + window.pageXOffset
            : rect.left + window.pageXOffset - tooltipWidth;
        const tooltipY = rect.top + scrollTop - tooltipHeight;
        setTooltipPosition({ x: tooltipX, y: tooltipY });
        setTooltipVisible(true);
    };

    const handleMouseLeave = () => {
        setTooltipVisible(false);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        store.dispatch(update_users_thunk(newData))
        closeModal();
    };
    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                type="button" className=" text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-3 py-2 text-center"
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={() => handleMouseLeave()}>
                <PencilSquareIcon className='h-6 text-white' />
                {tooltipVisible && (
                <span className="tooltip bg-black text-white text-md rounded-xl p-3 absolute z-50" style={{ top: tooltipPosition.y + window.pageYOffset, left: tooltipPosition.x }}>Edit User</span>
            )}
            </button>
            <Drawer
                open={open}
                setOpen={setOpen}
                title="Edit Users"
            >
                <form onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <label htmlFor="name" class="block mb-1 text-sm font-medium text-gray-900">Name</label>
                        <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            value={newData.name ?? ''}
                            onChange={(event) => setNewData({
                                ...newData,
                                name: event.target.value
                            })} />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="email" class="block mb-1 text-sm font-medium text-gray-900">Email</label>
                        <input type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                        value={newData.email ?? ''}
                        onChange={(event) => setNewData({
                            ...newData,
                            email: event.target.value
                        })}/>
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

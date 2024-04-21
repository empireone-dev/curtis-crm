import { Link, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import TicketsTableHeaderSection from './tickets-table-header-section'
import { useSelector } from 'react-redux'
import moment from 'moment'
import TicketsSearchSection from './tickets-search-section'
import { EyeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import TicketsPaginateSection from './tickets-paginate-section'

export default function TicketTableSection() {

    const { tickets } = useSelector((state) => state.tickets)
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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
        const tooltipWidth = 110;
        const tooltipHeight = 45;
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


    function moveToDetails(id) {
        router.visit('/administrator/tickets/details/' + id + '#files')
    }
    return (
        <>
            <section className=" pr-3 py-5 bg-white min-h-screen px-5">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <TicketsTableHeaderSection />
                </div>

                <TicketsSearchSection />

                <div className="flex flex-col mt-6">
                    {/* <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
                    <div>
                        {/* <div className="inline-block w-full py-2 align-middle md:px-6 lg:px-8"> */}
                        <div className='w-full py-2 '>
                            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                                <button className="flex items-center gap-x-3 focus:outline-none">
                                                    <span>ID</span>

                                                    <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                        <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                        <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                                    </svg>
                                                </button>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                                Fullname
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                                Email
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                                Resolution
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                                Issue
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                                Status
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                                Is Uploaded
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                                Created At
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                                Last Updated At
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 ">
                                        {
                                            tickets.map((res, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                            <h2 className="font-medium text-gray-800">{res.id}</h2>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                            {res.fname}  {res.lname}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            {res.email}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            {res.call_type}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div >
                                                                {JSON.parse(res.issue).map((item, j) => {
                                                                    return (
                                                                        <div key={j} className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-blue-100 bg-blue-700 border border-blue-700">
                                                                            <div className="text-xs font-normal leading-none max-w-full flex-initial">
                                                                                {item}
                                                                            </div>

                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap ">
                                                            {res.status == null ? (
                                                                <div className="inline py-1 font-black text-sm rounded-full text-orange-500 gap-x-2 bg-orange-100/60">
                                                                    OPEN
                                                                </div>
                                                            ) : res.status == 'CLOSED' ?
                                                                <div className="inline py-1 font-black text-sm rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                                    {res.status}
                                                                </div>
                                                                : (
                                                                    <div className="inline py-1 font-black text-sm rounded-full text-blue-500 gap-x-2 bg-blue-100/60">
                                                                        {res.status}
                                                                    </div>
                                                                )}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            {res.isUploading == 'true' ?
                                                                <div className="inline px-3 py-1 text-sm font-black rounded-full text-green-500 gap-x-2 bg-green-100/60">
                                                                    UPLOADED
                                                                </div>
                                                                :

                                                                <div className="inline px-3 py-1 text-sm font-black rounded-full text-red-500 gap-x-2 bg-red-100/60">
                                                                    PENDING
                                                                </div>}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            {moment(res.created_at).format('LLL')}
                                                        </td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            {moment(res.updated_at).format('LLL')}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <button onClick={() => moveToDetails(res.id)}
                                                                onMouseEnter={(e) => handleMouseEnter(e)}
                                                                onMouseLeave={() => handleMouseLeave()}>
                                                                <EyeIcon className='h-6 text-blue-500' />
                                                                {tooltipVisible && (
                                                                    <span className="tooltip bg-black text-white text-md rounded-xl p-3 absolute z-50" style={{ top: tooltipPosition.y + window.pageYOffset, left: tooltipPosition.x }}>View Ticket Details</span>
                                                                )}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <TicketsPaginateSection />
            </section>
        </>
    )
}

import { ArrowDownOnSquareStackIcon } from '@heroicons/react/24/outline'
import { Link } from '@inertiajs/react'
import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'

export default function CustomerTicketsTableSection() {

    const { tickets } = useSelector((state) => state.customer_tickets)
    console.log('tickets', tickets)

    return (
        <section className="container px-4 mx-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800">Tickets</h2>

                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">{tickets.length} count</span>
                    </div>

                </div>

            </div>

            <div className="mt-6 md:flex md:items-center md:justify-between">
                <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg  rtl:flex-row-reverse ">
                    <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm ">
                        View all
                    </button>

                    <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm   hover:bg-gray-100">
                        Monitored
                    </button>

                    <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm   hover:bg-gray-100">
                        Unmonitored
                    </button>
                </div>

                <div className="relative flex items-center mt-4 md:mt-0">
                    <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </span>

                    <input type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5    focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
            </div>

            <div className="flex flex-col mt-6">
                {/* <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
                <div>
                    {/* <div className="inline-block w-full py-2 align-middle md:px-6 lg:px-8"> */}
                    <div className='w-full py-2 '>
                        <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>


                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Ticket Number
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Created At
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Email
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Fullname
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Resolution
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Issue
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Is Uploaded
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Status
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 ">
                                    {
                                        tickets.map((res, i) => {
                                            return <tr key={i}>
                                                <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                    <h2 className="font-medium text-gray-800">{res.ticket_id}</h2>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h4 className="text-gray-700 ">{moment(res.created_at).format('LLL')}</h4>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h4 className="text-gray-700 ">{res.email}</h4>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h4 className="text-gray-700 ">{res.fname} {res.lname}</h4>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h4 className="text-gray-700 ">{res.call_type}</h4>
                                                    </div>
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

                                                <td className="px-4 py-4 text-sm whitespace-nowrap ">
                                                    {(res.status == 'PARTS VALIDATION' || res.status == 'WARRANTY VALIDATION' || res.status == 'TECH VALIDATION') ? (
                                                        <div className="inline py-1 font-black text-sm rounded-full text-orange-500 gap-x-2 bg-orange-100/60">
                                                            OPEN
                                                        </div>
                                                    ) : (
                                                        <div className="inline py-1 font-black text-sm rounded-full text-blue-500 gap-x-2 bg-blue-100/60">
                                                            {res.status}
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <Link
                                                            href={'/customer/tickets/' + res.id}
                                                            className="text-gray-700 ">
                                                            <button
                                                                type='button'
                                                                className="text-white bg-blue-500  via-blue-500  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-2 py-2 text-center">
                                                                <ArrowDownOnSquareStackIcon className='h-6 text-white' />
                                                            </button>

                                                        </Link>
                                                    </div>
                                                </td>

                                            </tr>
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

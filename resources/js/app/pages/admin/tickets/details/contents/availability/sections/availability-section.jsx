import Input from '@/app/layouts/components/input'
import Textarea from '@/app/layouts/components/textarea'
import { GlobeAmericasIcon, QueueListIcon, } from '@heroicons/react/24/outline'
import React from 'react'

export default function AvailabilitySection() {

    function formHandler(value, name) {
        dispatch(setRefund({
            ...availability,
            [name]: value,
        }))
    }
    return (
        <div>
            <h1 className='text-2xl mt-5'><b>Availability</b></h1>
            <section className="container bg-white">
                <form className="flex flex-col gap-6">
                    <div className="flex gap-3">
                        <button
                            type="button"
                            className="flex items-center rounded-md mt-3 bg-white px-2.5 py-1.5 text-sm text-blue-500 font-semibold shadow-sm ring-1 ring-inset ring-blue-500 hover:bg-blue-500 hover:text-white"
                        >
                            <QueueListIcon className="h-5" />
                            <span>Valid OOW</span>
                        </button>
                        <i aria-hidden="true" class="v-icon notranslate v-icon--left mdi mdi-list-status theme--light"></i>
                    </div>
                    <p>Parts Validation Notes: Remote Control ***OOW</p>
                    <div className="flex gap-3 w-full">
                        <table className="min-w-full divide-y divide-gray-200 ">
                            <thead className="">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                        <button className="flex items-center gap-x-3 focus:outline-none">
                                            <span>Name</span>
                                        </button>
                                    </th>

                                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right">
                                        Part Number
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                        Location
                                    </th>
                                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-right rtl:text-right">
                                        Cost
                                    </th>
                                    <th scope="col" className="px-12 py-3.5 text-sm font-normal text-right rtl:text-right">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 ">
                                <tr >
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div>
                                            <h2 className="font-medium text-gray-800"></h2>
                                        </div>
                                    </td>
                                    <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                        <div className="inline  py-1 text-sm font-normal rounded-full">

                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <h4 className="text-gray-700 "></h4>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <h4 className="text-gray-700 "></h4>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <div>
                                            <h4 className="text-gray-700 "></h4>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='w-full'>
                        <h1 className=' mb-2'>Remarks/Notes:</h1>
                        <Textarea
                            // disabled={true}
                            // value={ticket.validation_notes}
                            type="text" className='w-full'/>
                    </div>
                    <div className='flex gap-2'>
                        <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-200 ">
                            OOW &gt; WILLING TO BUY
                        </button>
                        <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 ">
                        OOW &gt; NOT WILLING TO BUY
                        </button>
                        <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                            CLOSE
                        </button>
                        <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                            PENDING
                        </button>
                        <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                            FOR REPLACEMENT
                        </button>
                    </div>

                </form>
            </section>
        </div>
    )
}

import Textarea from '@/app/layouts/components/textarea'
import React from 'react'

export default function ContentReplacementForm() {
    return (
        <div className='bg-white h-full px-3'>
            <div className="flex flex-col mt-6 ">
                {/* <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
                <div>
                    {/* <div className="inline-block w-full py-2 align-middle md:px-6 lg:px-8"> */}
                    <div className='w-full py-2'>
                        <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead className="">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            <button className="flex items-center gap-x-3 focus:outline-none">
                                                <span>Name</span>
                                            </button>
                                        </th>

                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Part Number
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Location
                                        </th>
                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-right rtl:text-right text-gray-500">
                                            Cost
                                        </th>
                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-right rtl:text-right text-gray-500">
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
                    </div>
                </div>
            </div>
            <div className='mt-3 w-full'>
                <h1 className='mt-2'>Parts Internal Remarks/Notes:</h1>
                <Textarea type="text" className='w-full' />
            </div>
            <div className='mt-3 w-full'>
                <h1>Updates from Curtis Notes:</h1>
                <Textarea type="text" className='w-full' />
            </div>
            <div className='mt-5 my-4 w-full'>
                <h1 className='mt-2'>Resource Notes:</h1>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900"><b>Notes :</b></dt>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900"><b>Unit :</b></dt>
                    <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0"><b>Brand :</b></dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900"><b>Model # :</b></dt>
                    <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0"><b>Serial # :</b></dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900"><b>Tracking # :</b></dt>
                </div>
                <div className='flex gap-2'>
                    <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                        REPLACEMENT SHIPPED
                    </button>
                    <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                        REPLACEMENT NOT SHIPPED
                    </button>
                    <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                        NO UNIT AVAILABLE
                    </button>
                </div>
            </div>

        </div>
    )
}

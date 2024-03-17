import { TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function WarrantyFilesSection() {
    return (
        <>
            <section className="container px-4 my-12 mx-auto border-t-2 border-b-2 border-slate-400">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="w-full flex justify-center">
                        <div className="flex items-center gap-x-3 mt-4">
                            <h1 class="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
                                Warranty Files
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-x-3 mt-4">
                            <h2 className="text-xl font-medium text-gray-800 dark:text-white">A clear and readable picture of the bill of sale</h2>
                        </div>
                        <div className="flex items-center gap-x-3 mb-3">
                            <p className="font-medium text-gray-400 dark:text-white">Please note the bill of sale must show the following:</p>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <p className="font-medium text-gray-400 dark:text-white">• Store Name and Address *except if purchased online</p>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <p className="font-medium text-gray-400 dark:text-white">• Date of purchase</p>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <p className="font-medium text-gray-400 dark:text-white">• Item description</p>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <p className="font-medium text-gray-400 dark:text-white">• Unit Price</p>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <p className="font-medium text-gray-400 dark:text-white">• Total amount paid</p>
                        </div>
                        <div className="flex items-center gap-x-3 mt-5">
                            <p className="font-medium text-gray-400 dark:text-white">If you do not have the bill of sale, you may try contacting the dealer’s customer care department for added support.</p>
                        </div>

                    </div>
                </div>


                <div className="flex flex-col">
                    {/* <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
                    <div>
                        {/* <div className="inline-block w-full py-2 align-middle md:px-6 lg:px-8"> */}
                        <div className='w-full py-2 '>
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-3 focus:outline-none">
                                                    <span>ID</span>

                                                    <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                        <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                        <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                                    </svg>
                                                </button>
                                            </th>

                                            <th scope="col" className="px-12 py-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Date
                                            </th>
                                            <th scope="col" className="px-12 py-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                File
                                            </th>
                                            <th scope="col" className="px-12 py-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-gray-800 dark:text-white ">1</h2>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-gray-800 dark:text-white ">01/01/2024</h2>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">DOWNLOAD/VIEW</button>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 item-center"><TrashIcon className='h-4 text-white' /></button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Page <span className="font-medium text-gray-700 dark:text-gray-100">1 of 10</span>
                    </div>

                    <div className="flex items-center mt-4 mb-4 gap-x-4 sm:mt-0">
                        <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>

                            <span>
                                previous
                            </span>
                        </a>

                        <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                            <span>
                                Next
                            </span>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

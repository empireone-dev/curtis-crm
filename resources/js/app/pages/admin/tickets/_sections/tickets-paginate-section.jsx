import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage, setSearch } from '../_redux/tickets-slice'
import { router } from '@inertiajs/react'

export default function TicketsPaginateSection() {
    const dispatch = useDispatch()

    const { tickets, search } = useSelector((state) => state.tickets)
console.log(search)
    return (
        <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
            <div className="text-sm text-gray-500 dark:text-gray-400">
                Page <span className="font-medium text-gray-700 dark:text-gray-100">
                    {search.page??1} of {tickets.length}</span>
            </div>

            <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                <button
                    onClick={() => {
                        dispatch(setSearch({
                            ...search,
                            page: search.page - 1
                        }))
                    }}
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>

                    <span>
                        previous
                    </span>
                </button>

                <button
                    onClick={() => {
                        dispatch(setSearch({
                            ...search,
                            page: search.page  + 1
                        }))
                    }}
                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <span>
                        Next
                    </span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../_redux/tickets-slice'
import store from '@/app/store/store'
import { get_tickets_thunk } from '../_redux/tickets-thunk'

export default function TicketsSearchSection() {
    // const { url } = usePage()
    // const ticket_id = url.split('?')[1]
    const dispatch = useDispatch()
    const { search } = useSelector((state) => state.tickets)

    function searchSubmit(e) {
        e.preventDefault()
        store.dispatch(get_tickets_thunk(`?search=${search.id}`))
        
    }
    return (
        <div className="mt-6 md:flex md:items-center md:justify-between">
        
            <form
                onSubmit={searchSubmit}
                className="relative flex items-center mt-4 md:mt-0">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </span>

                <input
                    onChange={(e) => dispatch(setSearch({
                        ...search,
                        id:e.target.value
                    }))}
                    type="text" placeholder="Search ID" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5    focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
            </form>
        </div>
    )
}

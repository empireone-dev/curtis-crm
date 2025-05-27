import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { router } from "@inertiajs/react";
// import { setSearch } from '../../users/redux/users-slice'

export default function ProductivityDirectEmailSection() {
    // const { url } = usePage()
    // const ticket_id = url.split('?')[1]
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    function searchSubmit(e) {
        e.preventDefault();
        // store.dispatch(get_users_thunk(`?search=${search.id}`))
       router.visit('/agent/productivity/direct_emails/0?page=1&search=case_file&where='+search)
    }
    return (
        <div className=" md:flex md:items-center md:justify-end">
            <form
                onSubmit={searchSubmit}
                className="relative flex items-center mt-4 md:mt-0"
            >
                <span className="absolute">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 mx-3 text-gray-400 "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </span>

                <input
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    type="text"
                    placeholder="Search Direct Emails"
                    className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5    focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </form>
        </div>
    );
}

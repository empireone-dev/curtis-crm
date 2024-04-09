import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

export default function ContentNotesCommentSection() {

    const { notes } = useSelector((state) => state.tickets);
    
    return (
        <div>
            <ol className="relative ">
                {
                    notes.map((res, i) => {
                        const formattedTimestamp = moment(res.created_at).fromNow();
                        return (
                            <article key={i} className="p-6 text-base bg-white rounded-lg border-s border-l-2 border-blue-500 my-3">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex flex-col">
                                       <div className='flex'>
                                       <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                            className="mr-2 w-6 h-6 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                            alt="Michael Gough" />{res.user.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{moment(res.created_at).format('LLL')}

                                      </p>
                                       </div>
                                        <div className='text-gray-400'>{formattedTimestamp}</div>
                                    </div>

                                    <button id={`dropdownComment${i}Button`} data-dropdown-toggle={`dropdownComment${i}`}
                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                        type="button">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                        <span className="sr-only">Comment settings</span>
                                    </button>

                                    <div id={`dropdownComment${i}`}
                                        className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby={`dropdownMenuIconHorizontalButton${i}`}>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                            </li>
                                        </ul>
                                    </div>
                                </footer>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {res.message}
                                </p>

                            </article>
                        )
                    })
                }
            </ol>
        </div>
    )
}

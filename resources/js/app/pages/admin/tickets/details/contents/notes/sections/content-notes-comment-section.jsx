import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

export default function ContentNotesCommentSection() {

    const { notes, ticket } = useSelector((state) => state.tickets);
    console.log('notes', notes)
    return (
        <div>
            <ol className="relative ">

                <article className="p-6 text-base bg-white rounded-lg border-s border-l-2 border-blue-500 my-3">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex flex-col">
                            <div className='flex'>
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900font-semibold"><img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                    alt="Michael Gough" />Customer Detailed Explanation</p>
                                <p className="text-sm text-gray-600 ">{moment(ticket.created_at).format('LLL')}

                                </p>
                            </div>
                            <div className='text-gray-400'>{moment(ticket.created_at).fromNow()}</div>
                        </div>
                    </footer>
                    <p className="text-gray-500 ">
                        {ticket.detailed_explanation_issue}
                    </p>

                </article>
                {
                    notes?.agent_notes?.map((res, i) => {
                        const formattedTimestamp = moment(res.created_at).fromNow();
                        return (
                            <article key={i} className="p-6 text-base bg-white rounded-lg border-s border-l-2 border-blue-500 my-3">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex flex-col">
                                        <div className='flex'>
                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900font-semibold"><img
                                                className="mr-2 w-6 h-6 rounded-full"
                                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                                alt="Michael Gough" />{res?.user?.emp_id ?? ''}</p>
                                            <p className="text-sm text-gray-600 ">{moment(res.created_at).format('LLL')}

                                            </p>
                                        </div>
                                        <div className='text-gray-400'>{formattedTimestamp}</div>
                                    </div>

                                    <button id={`dropdownComment${i}Button`} data-dropdown-toggle={`dropdownComment${i}`}
                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50   "
                                        type="button">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                        <span className="sr-only">Comment settings</span>
                                    </button>

                                 
                                </footer>
                                <p className="text-gray-500 ">
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

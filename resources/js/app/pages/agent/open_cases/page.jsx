import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, Tag } from "antd";
import { cases_service } from "@/app/services/tickets-service";
import { setTickets } from "../tickets/redux/customer-tickets-slice";
import AgentLayout from "@/app/layouts/agent/agent-layout";
import AgentOpenCasesListSection from "./sections/agent-open-cases-list-section";
import Skeleton from "@/app/layouts/components/skeleton";
import AgentOpenCasesPaginationSection from "./sections/agent-open-cases-pagination-section";
import { router } from "@inertiajs/react";

export default function AgentOpenCasesEMail({ auth }) {
    const { tickets } = useSelector((state) => state.customer_tickets);
    const [loading, setLoading] = useState(true);
    const account = auth.user;
    const dispatch = useDispatch();
    const cases = window.location.pathname.split("/")[2];

    useEffect(() => {
        async function fetch_date(params) {
            const res = await cases_service(
                window.location.search,
                cases,
                account.id
            );
            console.log("resresresres", res);
            dispatch(setTickets(res));
            setLoading(false);
        }
        fetch_date();
    }, []);
//     const aa= "\u003Cparts@curtiscs.com\u003E"
// console.log('dawdwadwa',aa.match(/<([^>]*)>/)[1])
    function addDaysSkippingWeekends(date) {
        let dueDate = moment(date);
        let dayOfWeek = dueDate.day();

        if (dayOfWeek === 4) {
            // Thursday (4), add 4 days to make it Monday (1)
            dueDate = dueDate.add(4, 'days');
        } else if (dayOfWeek === 5) {
            // Friday (5), add 4 days to make it Tuesday (2)
            dueDate = dueDate.add(4, 'days');
        } else if (dayOfWeek === 6) {
            // Saturday (6), add 3 days to make it Tuesday (2)
            dueDate = dueDate.add(3, 'days');
        } else if (dayOfWeek === 0) {
            // Sunday (0), add 2 days to make it Tuesday (2)
            dueDate = dueDate.add(2, 'days');
        }else{
            dueDate = dueDate.add(2, 'days');
        }
        return dueDate.format("LLL");
    }

    return (
        <AgentLayout account={account}>
            <div className="p-3 flex gap-5 flex-col justify-between w-full h-full">
                {loading ? (
                    <div>
                        <Skeleton />
                    </div>
                ) : (
                    <div>
                        <div class="flex items-center my-3">
                            <div class="flex items-center ml-3">
                                <button
                                    title="Reload"
                                    class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <span class="bg-gray-300 h-6 w-[.5px] mx-3"></span>
                            <div class="flex items-center space-x-2">
                                <button
                                    title="Archive"
                                    class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                                        ></path>
                                    </svg>
                                </button>
                                <button
                                    title="Mark As Spam"
                                    class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        ></path>
                                    </svg>
                                </button>
                                <button
                                    title="Delete"
                                    class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <span class="bg-gray-300 h-6 w-[.5px] mx-3"></span>
                            <div class="flex items-center space-x-2">
                                <button
                                    title="Mark As Read"
                                    class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                                        ></path>
                                    </svg>
                                </button>
                                <button
                                    title="Mark As Unread"
                                    class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        ></path>
                                    </svg>
                                </button>
                                <button
                                    title="Add Star"
                                    class="text-gray-700 px-2 py-1 border border-gray-300 rounded-lg shadow hover:bg-gray-200 transition duration-100"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Added On
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Due On
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Case File
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets?.result && tickets?.result?.map((res, i) => {
                                    return (
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-3">
                                                {moment(res.date).format("LLL")}
                                            </td>
                                            <td class="px-6 py-3">
                                                {/* {moment(res.date)
                                                    .add(2, "days")
                                                    .format("LLL")} */}
                                                {addDaysSkippingWeekends(
                                                    moment(res.date),
                                                    2
                                                )}
                                            </td>
                                            <th
                                                scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {`${(res.subject.replace(/^WARRANTY CLAIM #/, ""))}`.replace(/Re: /, "")}
                                            </th>
                                            <td class="px-6 py-3"> {res.email}</td>
                                            <td class="px-6 py-3">
                                                <button
                                                    onClick={() =>
                                                        window.open(
                                                            `/agent/customer_details/${`${(res.subject.replace(/^WARRANTY CLAIM #/, ""))}`.replace(/Re: /, "")}`,
                                                            "_blank"
                                                        )
                                                    }
                                                    className="text-white bg-green-500 px-5 py-1.5 rounded-md"
                                                >
                                                    VIEW
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* <div className="overflow-auto h-full">
                            <Collapse
                                accordion
                                items={tickets?.map((res, i) => ({
                                    key: i,
                                    label: (
                                        <div key={i} class="relative overflow-x-auto">
                                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                           
                                        </table>
                                    </div>
                                        // <div className="flex justify-between items-center">
                                        //     <div>
                                        //         {res.emails[0]?.emails[0]
                                        //             ?.from ?? "No Emails"}
                                        //     </div>
                                        //     <div>
                                        //         {res.ticket?.status ==
                                        //         "CLOSED" ? (
                                        //             <Tag color="red">
                                        //                 {res.ticket?.status}
                                        //             </Tag>
                                        //         ) : (
                                        //             <Tag color="green">
                                        //                 {res.ticket?.status}
                                        //             </Tag>
                                        //         )}
                                        //         {moment(
                                        //             res.emails[0]?.emails[0]
                                        //                 .date
                                        //         ).format("LLL")}
                                        //     </div>
                                        // </div>
                                    ),
                                    children: res.emails[0]?.emails.map(
                                        (res, i) => {
                                            return (
                                                <AgentOpenCasesListSection
                                                    key={i}
                                                    data={res}
                                                />
                                            );
                                        }
                                    ),
                                }))}
                            />
                        </div> */}
                    </div>
                )}
                <div className="flex items-center justify-end">
                    <AgentOpenCasesPaginationSection />
                </div>
            </div>
        </AgentLayout>
    );
}

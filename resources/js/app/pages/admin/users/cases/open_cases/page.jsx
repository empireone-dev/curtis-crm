import React, { useEffect, useState } from "react";
import TicketCasesHandledLayout from "../layout";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { Collapse, Tag } from "antd";
import OpenCasesListSection from "./sections/open-cases-list-section";
import { router } from "@inertiajs/react";
export default function TicketOpenCasesPage() {
    const { tickets } = useSelector((state) => state.customer_tickets);
    const [emails, setEmails] = useState([]);

    // useEffect(() => {
    //     try {
    //         axios
    //             .get("/fetch_emails")
    //             .then((res) => {
    //                 console.log("ress", res.data);
    //                 setEmails(res.data);
    //             })
    //             .catch((err) => {
    //                 console.error("Error fetching emails:", err);
    //             });
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // }, []);
    console.log('tickets',tickets)
    return (
        <TicketCasesHandledLayout>
            <div className="mx-3">
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
                                {tickets.map((res, i) => {
                                    return (
                                        <tr class="bg-white border-b">
                                            <td class="px-6 py-3">{moment(res.ticket.updated_at).format('LLL')}</td>
                                            <td class="px-6 py-3">{moment(res.ticket.updated_at).add(2, 'days').format('LLL')}</td>
                                            <th
                                                scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {res.ticket.ticket_id}
                                            </th>
                                            <td class="px-6 py-3"> {res.ticket.email}</td>
                                            <td class="px-6 py-3">
                                                <button
                                                onClick={()=>router.visit(`${window.location.pathname.substring(0,30)}customer_details/${res.ticket.id}`)}
                                                className="text-white bg-green-500 px-5 p-1.5 rounded-md">
                                                  VIEW
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                {/* <Collapse
                    accordion
                    items={tickets?.map((res, i) => ({
                        key: i,
                        label: (
                            <div className="flex justify-between items-center">
                                <div>{res.emails[0]?.emails[0]?.from??'No Emails'}</div>
                                <div>
                                    {res.ticket.status == "CLOSED" ? (
                                        <Tag color="red">
                                            {res.ticket.status}
                                        </Tag>
                                    ) : (
                                        <Tag color="green">
                                            {res.ticket.status}
                                        </Tag>
                                    )}
                                    {moment(
                                        res?.emails[0]?.emails[0]?.date
                                    ).format("LLL")}
                                </div>
                            </div>
                        ),
                        children: res.emails[0]?.emails.map((res, i) => {
                            return <OpenCasesListSection key={i} data={res} />;
                        }),
                    }))}
                /> */}
            </div>
        </TicketCasesHandledLayout>
    );
}

import React, { useEffect, useState } from "react";
import TicketCasesHandledLayout from "../layout";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { Collapse, Tag } from "antd";
import OpenCasesListSection from "./sections/open-cases-list-section";
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
    return (
        <TicketCasesHandledLayout>
            <div className="mx-3">
                <Collapse
                    accordion
                    items={tickets.map((res, i) => ({
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
                />
            </div>
        </TicketCasesHandledLayout>
    );
}

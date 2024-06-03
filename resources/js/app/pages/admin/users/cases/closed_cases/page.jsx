import React, { useEffect, useState } from "react";
import TicketCasesHandledLayout from "../layout";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { Collapse, Tag } from "antd";
import HandledCasesListSection from "./sections/handled-cases-list-section";
export default function TicketCasesHandledPage() {
    const { tickets } = useSelector((state) => state.customer_tickets);
    const [emails, setEmails] = useState([]);

    return (
        <TicketCasesHandledLayout>
            <div className="mx-3">
                <Collapse
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
                        children: res.emails[0]?.emails.map((res) => {
                            return <HandledCasesListSection data={res} />;
                        }),
                    }))}
                />
            </div>
        </TicketCasesHandledLayout>
    );
}

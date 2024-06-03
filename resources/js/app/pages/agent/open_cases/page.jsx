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

export default function AgentOpenCasesEMail({ auth }) {
    const { tickets } = useSelector((state) => state.customer_tickets);
    const [loading, setLoading] = useState(true);
    const account = auth.user;
    const dispatch = useDispatch();
    const cases = window.location.pathname.split("/")[2];

    useEffect(() => {
        async function fetch_date(params) {
            const res = await cases_service(window.location.search,cases, account.id);
            console.log('resres',res)
            dispatch(setTickets(res));
            setLoading(false);
        }
        fetch_date();
    }, []);
    return (
        <AgentLayout account={account}>
            <div className="m-3">
                {loading ? (
                    <div>
                        <Skeleton />
                    </div>
                ) : (
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
                                            res.emails[0]?.emails[0].date
                                        ).format("LLL")}
                                    </div>
                                </div>
                            ),
                            children: res.emails[0]?.emails.map((res, i) => {
                                return (
                                    <AgentOpenCasesListSection
                                        key={i}
                                        data={res}
                                    />
                                );
                            }),
                        }))}
                    />
                )}
            </div>
        </AgentLayout>
    );
}

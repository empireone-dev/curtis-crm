import React, { useEffect, useState } from "react";
import TicketCasesHandledLayout from "../layout";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import DirectEmailsListSection from "./sections/direct-emails-list-section";

export default function TicketDirectEmailsPage() {
    const { tickets } = useSelector((state) => state.customer_tickets);
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        try {
            axios
                .get("/fetch_emails")
                .then((res) => {
                    console.log("ress", res.data);
                    setEmails(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching emails:", err);
                });
        } catch (error) {
            console.log("error", error);
        }
    }, []);
    console.log('tickets',tickets)
    return (
        <TicketCasesHandledLayout>
            {tickets.map((res,i) => {
                return  res.emails.length !== 0 &&   <DirectEmailsListSection key={i} data={res} />
            })}
        </TicketCasesHandledLayout>
    );
}

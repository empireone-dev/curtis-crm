import React, { useEffect, useState } from "react";
import TicketCasesHandledLayout from "../layout";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import DirectEmailsListSection from "./sections/direct-emails-list-section";
import { Collapse } from 'antd';

export default function TicketDirectEmailsPage() {
    const { tickets } = useSelector((state) => state.customer_tickets);
    // const [emails, setEmails] = useState([]);

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
            {/* {tickets.map((res,i) => {
                return  res.emails.length !== 0 &&   <DirectEmailsListSection key={i} data={res} />
            })} */}
            <div className="mx-3">
            <Collapse accordion items={tickets.map((res,i)=>({
                key:i,
                label:<div className="flex justify-between items-center">
                    <div>
                    {res.emails[0].emails[0].from}
                    </div>
                    <div>
                    {moment(res.emails[0].emails[0].date).format('LLL')}
                    </div>

                </div>,
                children: res.emails[0].emails.map(res=>{
                    return <DirectEmailsListSection data={res}/>
                }),
            }))} />
            </div>
        </TicketCasesHandledLayout>
    );
}

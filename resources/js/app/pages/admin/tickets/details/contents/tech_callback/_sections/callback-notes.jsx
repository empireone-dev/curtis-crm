import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

export default function CallBackNotes() {
    const { ticket } = useSelector((state) => state.tickets);
    console.log("ticketticket", ticket?.callbacks);
    return (
        <div>
            <div className="text-2xl font-bold">TECH CALLBACK LOGS</div>
            <div className="flex gap-5">
                <div className="flex-1">
                    {ticket?.callbacks?.map((res, i) => {
                        return (
                            <div className="my-3">
                                <p>{res?.user?.name}</p>
                                <p>
                                    <br />
                                    On {moment(res?.created_at).format("LLL")}
                                </p>
                                <p>Notes: {res?.note}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

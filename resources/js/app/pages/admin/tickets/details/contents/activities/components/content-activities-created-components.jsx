import React, { useState } from "react";
import Modal from "@/app/layouts/components/modal";

export default function ContentActivitiesCreatedTicketComponents({ data }) {
    const [open, setOpen] = useState(false);
    const result = JSON.parse(data.message);
    console.log("resultresult", result);
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="bg-green-500 p-3 rounded-md text-white hover:bg-green-600"
            >
                TICKET CREATED
            </button>
            <Modal
                open={open}
                setOpen={setOpen}
                title="Ticket Created Activities"
                width="max-w-5xl"
                position=""
            >
                <div className="flex flex-col w-full my-4">
                    <div className="flex gap-3 items-center justify-between my-3">
                        <div className="font-black">
                            TICKET INFORMATION
                            <div
                                className={`text-green-500 border rounded-md border-green-500 items-center justify-center flex px-2`}
                            >
                                {data.type}
                            </div>
                        </div>
                    </div>
                    <div className="font-black my-4 flex gap-2">
                        Ticket Information:
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex gap-2">
                            Ticket ID:
                            <div className="font-bold">
                                {data?.ticket?.ticket_id ?? ""}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            Customer's Name:
                            <div className="font-bold">
                                {data?.ticket?.fname ?? ""}{" "}
                                {data?.ticket?.lname ?? ""}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            Email:
                            <div className="font-bold">
                                {data?.ticket?.email ?? ""}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            Phone:
                            <div className="font-bold">
                                {data?.ticket?.phone ?? ""}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            Address:
                            <div className="font-bold">
                                {data?.ticket?.address ?? ""}{" "}
                                {data?.ticket?.city ?? ""}{" "}
                                {data?.ticket?.state ?? ""}{" "}
                                {data?.ticket?.zip_code ?? ""}{" "}
                                {data?.ticket?.country == "CA"
                                    ? "CANADA"
                                    : "UNITED STATE" ?? ""}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            Brand:
                            <div className="font-bold">
                                {data?.ticket?.brand ?? ""}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            Class:
                            <div className="font-bold">
                                {data?.ticket?.class ?? ""}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            Item Number:
                            <div className="font-bold">
                                {data?.ticket?.item_number ?? ""}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            Number Serial:
                            <div className="font-bold">
                                {data?.ticket?.serial_number ?? ""}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            Address:
                            <div className="font-bold">
                                {data?.ticket?.address ?? ""}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            Country:
                            <div className="font-bold">
                                {data?.ticket?.country ?? ""}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            State:
                            <div className="font-bold">
                                {data?.ticket?.state ?? ""}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            City:
                            <div className="font-bold">
                                {data?.ticket?.city ?? ""}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            Zip Code:
                            <div className="font-bold">
                                {data?.ticket?.zip_code ?? ""}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            Issue:
                            {JSON.parse(data?.ticket?.issue).map((res, i) => {
                                return (
                                    <div key={i} className="font-bold">
                                        {res ?? ""}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex flex-col">
                            Remarks:
                            <div className="font-bold indent-8">
                                {data?.ticket?.remarks ?? ""}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

import Modal from "@/app/layouts/components/modal";
import React, { useState } from "react";

export default function ContentActivitiesChangeCallTypeComponents({ data }) {
    const [open, setOpen] = useState(false);
    const result = JSON.parse(data.message);
    console.log("result", result);
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className={`bg-blue-500  hover:bg-blue-600 p-3 rounded-md text-white`}
            >
                CHANGED RESOLUTION FROM TECH TO {result.where_to_move}
            </button>
            <Modal
                open={open}
                setOpen={setOpen}
                title={`${data.type} Activities`}
                width="max-w-5xl"
                position=""
            >
                <div className="flex flex-col w-full my-4">
                    <div className="flex gap-3 items-center justify-between my-3">
                        <div className="font-black">
                            TICKET INFORMATION {`( ${result.status} )`}
                            {/* <div
                        className={`text-yellow-500 border rounded-md border-yellow-500 items-center justify-center flex`}
                    >
                        {data.type}
                    </div> */}
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex gap-2">
                            Customer's Name:
                            <div className="font-bold">
                                {data?.ticket?.fname ?? ""}{" "}
                                {data?.ticket?.lname ?? ""}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            Ticket ID #:
                            <div className="font-bold">
                                {data?.ticket?.ticket_id ?? ""}
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
                            Unit:
                            <div className="font-bold">{result.unit ?? ""}</div>
                        </div>
                        <div className="flex flex-col">
                            Remarks:
                            <div className="indent-8 font-bold">
                                {data?.ticket?.remarks ?? ""}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full ">
                    <div className="flex gap-3  my-3">
                        <div className="font-black">TECH INFORMATION</div>
                    </div>

                    <div className="flex gap-2 my-2">
                        Issue:
                        {result?.issue}
                    </div>
                    <div className="flex flex-col">
                        Reason:
                        <div className="indent-8 font-bold">
                            {result?.reason ?? ""}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        FROM:
                        <div className="indent-8 font-bold">
                            TECH TO {result?.where_to_move ?? ""}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        Notes:
                        <div className="indent-8 font-bold">
                            {result?.notes ?? ""}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

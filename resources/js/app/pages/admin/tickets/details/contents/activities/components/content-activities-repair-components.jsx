import Modal from "@/app/layouts/components/modal";
import React, { useState } from "react";

export default function ContentActivitiesRepairComponents({ data }) {
    const [open, setOpen] = useState(false);
    const result = JSON.parse(data.message);
    
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className={`${
                    data.type == "REPAIR"
                        ? "bg-green-500  hover:bg-green-600"
                        : "bg-red-500  hover:bg-red-600"
                }  p-3 rounded-md text-white`}
            >
                {data.type} PARTS
            </button>
            <Modal
                open={open}
                setOpen={setOpen}
                title={"Parts Activities"}
                width="max-w-5xl"
                position=""
            >
                <div className="flex flex-col w-full my-4">
                    <div className="flex gap-3 items-center justify-between my-3">
                        <div className="font-black">
                            TICKET INFORMATION{" "}
                            <div
                                className={`${
                                    data.type == "REPAIR"
                                        ? "text-green-500 border rounded-md border-green-500"
                                        : "text-red-500 border rounded-md border-red-500"
                                } items-center justify-center flex`}
                            >
                                {data.type}
                            </div>
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
                        <div className="font-black">REPAIR INFORMATION</div>
                    </div>
                    <div className="flex gap-2">
                        ASC Name:
                        <div className="font-bold">
                            {data?.asc_data?.name ?? ""}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        ASC Address:
                        <div className="font-bold">
                            {data?.asc_data?.address ?? ""}
                            {data?.asc_data?.city ?? ""}
                            {data?.asc_data?.state ?? ""}
                            {data?.asc_data?.zip_code ?? ""}
                            {data?.asc_data?.country == "CA"
                                ? "CANADA"
                                : "UNITED STATE" ?? ""}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        ASC Email:
                        <div className="font-bold">
                            {data?.asc_data?.email ?? ""}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        ASC Phone:
                        <div className="font-bold">
                            {data?.asc_data?.phone ?? ""}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Repair Cost:
                        <div className="font-bold">
                            $ {result?.repair?.repair_cost ?? 0}.00
                        </div>
                    </div>
                    <div className="flex flex-col">
                        Notes:
                        <div className="indent-8 font-bold">
                            {result?.repair?.notes ?? ""}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

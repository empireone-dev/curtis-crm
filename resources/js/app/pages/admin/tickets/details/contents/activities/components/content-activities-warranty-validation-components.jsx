import Modal from "@/app/layouts/components/modal";
import React, { useState } from "react";

export default function ContentActivitiesWarrantyValidationComponents({
    data,
}) {
    const [open, setOpen] = useState(false);
    const result = JSON.parse(data.message);
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="bg-blue-500 p-3 rounded-md text-white hover:bg-blue-600"
            >
                WARRANTY VALIDATION
            </button>
            <Modal
                open={open}
                setOpen={setOpen}
                title="Warranty Validation Activities"
                width="max-w-5xl"
                position=""
            >
                <div className="flex flex-col w-full my-4">
                    <div className="flex gap-3 items-center justify-between my-3">
                        <div className="font-black">
                            TICKET INFORMATION
                            <div
                                className={`text-blue-500 border rounded-md border-blue-500 items-center justify-center flex px-2`}
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
                        <div className="font-black">RECEIPTS INFORMATION</div>
                    </div>
                    <div className="flex gap-2">
                        Store Name:
                        <div className="font-bold">{result?.store ?? ""}</div>
                    </div>
                    <div className="flex gap-2">
                        Retailer's Price:
                        <div className="font-bold">
                            $ {result?.retailers_price ?? 0}.00
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Discount:
                        <div className="font-bold">
                            $ {result?.discount ?? 0}.00
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Total Price:
                        <div className="font-bold">
                            $ {result?.total_price ?? 0}.00
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Refurbished:
                        <div className="font-bold">
                            $ {result?.total_price ?? 0}.00
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

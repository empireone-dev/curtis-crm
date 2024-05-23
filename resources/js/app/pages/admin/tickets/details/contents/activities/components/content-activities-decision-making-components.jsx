import React, { useState } from "react";
import Modal from "@/app/layouts/components/modal";

export default function ContentActivitiesDecisionMakingComponents({ data }) {
    const [open, setOpen] = useState(false);
    const result = JSON.parse(data.message);

    console.log("datasssss", result);
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="bg-orange-500 p-3 rounded-md text-white hover:bg-orange-600"
            >
                DECISION MAKING
            </button>
            <Modal
                open={open}
                setOpen={setOpen}
                title="Decision Making Activities"
                width="max-w-5xl"
                position=""
            >
                <div className="flex flex-col w-full my-4">
                    <div className="flex gap-3 items-center justify-between my-3">
                        <div className="font-black">
                            TICKET INFORMATION
                            <div
                                className={`text-orange-500 border rounded-md border-orange-500 items-center justify-center flex`}
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
                            <div className="font-bold indent-8">
                                {data?.ticket?.remarks ?? ""}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full ">
                    <div className="flex gap-3  my-3">
                        <div className="font-black">REPAIR</div>
                    </div>
                    <div className="flex gap-2">
                        Store Name:
                        <div className="font-bold">
                            {data?.asc_data?.name ?? ""}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Repair Cost:
                        <div className="font-bold border-red-500 border my-1 px-2 rounded-md">
                            $ {result?.decision_making?.repair_cost ?? 0}.00
                        </div>
                    </div>
                    <div className="flex flex-col">
                        Repair Notes:
                        <div className="font-bold indent-8">
                            {result?.decision_making?.repair_notes ?? ""}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full ">
                    <div className="flex gap-3  my-3">
                        <div className="font-black">REFUND</div>
                    </div>
                    <div className="flex gap-2">
                        Cost of Refund:
                        <div className="font-bold border-red-500 border my-1 px-2 rounded-md">
                            $ {result?.cost_refund ?? 0}.00
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Repair Cost:
                        <div className="font-bold">
                            $ {result?.repair_cost ?? 0}.00
                        </div>
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
                        Price After Discount:
                        <div className="font-bold">
                            $ {result?.after_discount ?? 0}.00
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Cheque #:
                        <div className="font-bold">
                            {result?.cheque_no ?? 0}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Cheque Amount:
                        <div className="font-bold">
                            $ {result?.cheque_amount ?? 0}.00
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Mail Date:
                        <div className="font-bold">
                            {result?.date ?? ""}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        Repair Notes:
                        <div className="font-bold indent-8">
                            {result?.refund_notes ?? ""}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full ">
                    <div className="flex gap-3  my-3">
                        <div className="font-black">REPLACEMENT</div>
                    </div>
                    <div className="flex gap-2">
                        Cost of Unit
                        <div className="font-bold">
                            $ {result?.cost_of_unit ?? 0}.00
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Cube Weight
                        <div className="font-bold">
                            {result?.cube_weight ?? 0}
                        </div>
                    </div>
                    <div className="flex items-start justify-between border-2 border-black p-1 rounded-sm">
                        <div className="flex gap-2">
                            Length
                            <div className="font-bold">
                                {result?.length ?? ""}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            Width
                            <div className="font-bold">
                                {result?.width ?? ""}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            height
                            <div className="font-bold">
                                {result?.height ?? ""}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Shipping Cost
                        <div className="font-bold border-red-500 border my-1 px-2 rounded-md">
                            $ {result?.shipping_cost ?? 0}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        Repair Notes:
                        <div className="font-bold indent-8">
                            {result?.replacement_notes ?? ""}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

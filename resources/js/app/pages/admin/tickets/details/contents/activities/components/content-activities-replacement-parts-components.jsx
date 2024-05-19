import Modal from "@/app/layouts/components/modal";
import React, { useState } from "react";

export default function ContentActivitiesReplacementPartsComponents({ data }) {
    const [open, setOpen] = useState(false);
    const result = JSON.parse(data.message);

    console.log("waaass", result);
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className={`${
                    data.type == "PARTS REPLACEMENT SHIPPED"
                        ? "bg-green-500  hover:bg-green-600"
                        : "bg-red-500  hover:bg-red-600"
                }  p-3 rounded-md text-white`}
            >
                {data.type}
            </button>
            <Modal
                open={open}
                setOpen={setOpen}
                title="Replacement Activities"
                width="max-w-5xl"
                position=""
            >
                <div className="flex flex-col w-full my-4">
                    <div className="flex gap-3 items-center justify-between my-3">
                        <div className="font-black">
                            TICKET INFORMATION
                            <div
                                className={`${
                                    data.type == "PARTS REPLACEMENT SHIPPED"
                                        ? "text-green-500 border rounded-md border-green-500"
                                        : "text-red-500 border rounded-md border-red-500"
                                } items-center justify-center flex px-2`}
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
                            <div className="indent-8 font-bold">
                                {data?.ticket?.remarks ?? ""}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full ">
                    <div className="flex gap-3  my-3">
                        <div className="font-black">PARTS SHIP INFORMATION</div>
                    </div>
                    <div className="flex gap-2">
                        Ship Date:
                        <div className="font-bold">
                            {result?.replacement?.ship_date ?? "None"}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Unit:
                        <div className="font-bold">
                            {result?.replacement?.unit ?? ""}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Brand:
                        <div className="font-bold">
                            {result?.replacement?.brand ?? ""}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Model:
                        <div className="font-bold">
                            {result?.replacement?.item_number ?? ""}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Serial:
                        <div className="font-bold">
                            $ {result?.replacement?.serial_number ?? ""}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        Tracking:
                        <div className="font-bold">
                            {result?.replacement?.tracking ?? ""}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        Notes:
                        <div className="indent-8 font-bold">
                            {result?.replacement?.notes ?? ""}
                        </div>
                    </div>

                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Part Number
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Location
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Cost
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {result?.replacement?.internals.map((res) => {
                                    return (
                                        <tr class="bg-white border-b ">
                                            <th
                                                scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                               {res.name}
                                            </th>
                                            <td class="px-6 py-4">{res.part_number}</td>
                                            <td class="px-6 py-4">{res.location}</td>
                                            <td class="px-6 py-4">{res.cost}</td>
                                            <td class="px-6 py-4">{res.status}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

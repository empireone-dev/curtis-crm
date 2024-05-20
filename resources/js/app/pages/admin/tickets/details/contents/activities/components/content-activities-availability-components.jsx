import Modal from "@/app/layouts/components/modal";
import React, { useState } from "react";

export default function ContentActivitiesAvailabilityComponents({ data }) {
    const [open, setOpen] = useState(false);
    const result = JSON.parse(data.message);

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className={`bg-yellow-500  hover:bg-yellow-600 p-3 rounded-md text-white`}
            >
                {data.type} {`( ${result.status} )`}
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
                            <div
                                className={`text-yellow-500 border rounded-md border-yellow-500 items-center justify-center flex`}
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
                        <div className="font-black">INTERNALS INFORMATION</div>
                    </div>
                    <div className="flex gap-2">
                        Warranty Status:
                        <div className="font-bold border border-yellow-500 px-2 rounded-md">
                            {result?.warranty_status == "IW"
                                ? "IN WARRANTY"
                                : "OUT OF WARRANTY" ?? ""}
                        </div>
                    </div>

                    <div className="flex gap-2 my-2">
                        Issue:
                        {JSON.parse(result?.ticket?.issue).map((res) => {
                            return (
                                <div className="font-bold border border-yellow-500 px-2 rounded-md mx-2">
                                    {res}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex flex-col">
                        Notes:
                        <div className="indent-8 font-bold">
                            {result?.internal_notes ?? ""}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        Availability:
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
                                    {result.internals.map((res) => {
                                        return (
                                            <tr class="bg-white border-b ">
                                                <th
                                                    scope="row"
                                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {res.name}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {res.part_number}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {res.location}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {res.cost}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {res.status}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

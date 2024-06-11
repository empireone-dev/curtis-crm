import Modal from "@/app/layouts/components/modal";
import React, { useState } from "react";

export default function ContentActivitiesReplacementComponents({ data }) {
    const [open, setOpen] = useState(false);
    const result = JSON.parse(data.message);

    console.log("result", result);
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className={`${
                    data.type == "REPLACEMENT SHIPPED"
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
                width="max-w-5xl h-full"
                position=""
            >
                <div className="flex flex-col w-full my-4">
                    <div className="flex gap-3 items-center justify-between my-3">
                        <div className="font-black">
                            TICKET INFORMATION
                            <div
                                className={`${
                                    data.type == "REPLACEMENT SHIPPED"
                                        ? "text-green-500 border rounded-md border-green-500"
                                        : "text-red-500 border rounded-md border-red-500"
                                } items-center justify-center flex px-2`}
                            >
                                {data.type}
                            </div>
                        </div>
                    </div>

                    <div class="flex h-full items-center justify-center bg-red-400 w-full">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                            <tbody>
                                <tr class="bg-white border-b">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        Shipped Date:
                                    </th>
                                    <td class="px-6 py-4">
                                        {" "}
                                        {result?.replacement?.ship_date ?? ""}
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        UNIT:
                                    </th>
                                    <td class="px-6 py-4">
                                        {" "}
                                        {result?.replacement?.unit ?? ""}
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        BRAND:
                                    </th>
                                    <td class="px-6 py-4">
                                        {result?.replacement?.brand ?? ""}
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        MODEL #:
                                    </th>
                                    <td class="px-6 py-4">
                                        {result?.replacement?.model ?? ""}
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        SERIAL #:
                                    </th>
                                    <td class="px-6 py-4">
                                        {result?.replacement?.serial_number ??
                                            ""}
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        TRACKING #:
                                    </th>
                                    <td class="px-6 py-4">
                                        {result?.replacement?.tracking ?? ""}
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        NOTES:
                                    </th>
                                    <td class="px-6 py-4">
                                        {result?.replacement?.notes ?? ""}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

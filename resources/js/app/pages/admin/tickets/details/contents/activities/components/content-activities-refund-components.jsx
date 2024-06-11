import Modal from "@/app/layouts/components/modal";
import React, { useState } from "react";

export default function ContentActivitiesRefundComponents({ data }) {
    const [open, setOpen] = useState(false);
    const result = JSON.parse(data.message);
    console.log("ssssssssssssssss", result);
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className={`bg-purple-500  hover:bg-purple-600 p-3 rounded-md text-white`}
            >
                {data.type}
            </button>
            <Modal
                open={open}
                setOpen={setOpen}
                title={`${data.type} Activities`}
                width="max-w-5xl h-full"
                position=""
            >
                <div className="flex flex-col w-full my-4">
                    <div className="flex gap-3 items-center justify-between my-3">
                        <div className="font-black">
                            TICKET INFORMATION
                            <div
                                className={`text-purple-500 border rounded-md border-purple-500 items-center justify-center flex`}
                            >
                                {data.type}
                            </div>
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
                                        Cheque #:
                                    </th>
                                    <td class="px-6 py-4">
                                    {result?.refund?.cheque_no ?? 0}
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        Cheque Amount:
                                    </th>
                                    <td class="px-6 py-4">
                                    ${result?.refund?.cheque_amount ?? 0}.00
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        Mail Date:
                                    </th>
                                    <td class="px-6 py-4">
                                        {result?.refund?.ship_date ?? ""}
                                    </td>
                                </tr>
                                <tr class="bg-white border-b">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        Notes:
                                    </th>
                                    <td class="px-6 py-4">
                                    {result?.refund?.notes ?? ""}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            </Modal>
        </div>
    );
}

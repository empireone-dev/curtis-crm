import React, { useState } from "react";
import { Button, Modal } from "antd";
import { EyeIcon } from "@heroicons/react/24/outline";
import { PaperClipIcon } from "@heroicons/react/20/solid";

export default function ShowAttachmentSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    console.log("datadatadata", data);
    return (
        <>
            <a onClick={showModal}>
                <EyeIcon className="text-blue-700 h-6" />
            </a>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Close
                    </Button>,
                ]}
                width={800}
            >
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="px-4 py-1 sm:px-6">
                        <h3 className="text-base/7 font-semibold text-gray-900">
                            Applicant Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
                            Personal details and application.
                        </p>
                    </div>
                    <div className="px-4 sm:px-0">
                        <p className="mt-1 max-w-2xl text-2xl text-black">
                            Case File: {data.ticket_id}
                        </p>
                        <h3 className="text-2xl font-semibold text-gray-900">
                            Acknowledgement Form
                        </h3>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Unit:
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.unit}{" "}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Brand:
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.brand}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Model:{" "}
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.class}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Serial
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.serial_number}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Technical Fault
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.issue}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="px-4 sm:px-0">
                        <h3 className="text-2xl font-semibold text-gray-900">
                            Customer Information
                        </h3>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Name:
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.fname} {data.mname} {data.lname}{" "}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Address:
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.address}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    City/Province:{" "}
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.city} {data.province}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    State
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.state}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Zipcode/Postal Code
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.zip_code}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Email
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.email}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Phone
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data.phone}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="px-4 sm:px-0">
                        <h3 className="text-2xl font-semibold text-gray-900">
                            Dealer Information
                        </h3>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Dealer Name:
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data?.repair_information?.name}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Major Labour Details:
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {
                                        data?.repair_information
                                            ?.major_labour_details
                                    }
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Major Labour Rate:{" "}
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {
                                        data?.repair_information
                                            ?.major_labour_rate
                                    }
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Major Labour Notes
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {
                                        data?.repair_information
                                            ?.major_labour_notes
                                    }
                                </dd>
                            </div>

                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Minor Labour Details:
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {
                                        data?.repair_information
                                            ?.minor_labour_details
                                    }
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Minor Labour Rate:{" "}
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {
                                        data?.repair_information
                                            ?.minor_labour_rate
                                    }
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Minor Labour Notes
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {
                                        data?.repair_information
                                            ?.minor_labour_notes
                                    }
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    MISC Cost
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data?.repair_information?.misc_cost}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Invoice Number
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data?.repair_information?.invoice_number}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Invoice Date
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data?.repair_information?.invoice_date}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Repair Start Date
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data?.repair_information?.repair_start}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Repair End Date
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data?.repair_information?.repair_end}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Subtotal
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data?.repair_information?.sub_total}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Tax MISC Cost
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data?.repair_information?.tax}
                                </dd>
                            </div>
                            <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    Total
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {data?.repair_information?.total}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm/6 font-medium text-gray-900">
                        Attachments
                    </dt>
                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ul
                            role="list"
                            className="divide-y divide-gray-100 rounded-md border border-gray-200"
                        >
                            {data?.repair_information?.attachments1?.map(
                                (res, i) => {
                                    return (
                                        <li
                                            key={i}
                                            className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6"
                                        >
                                            <div className="flex w-0 flex-1 items-center">
                                                <PaperClipIcon
                                                    aria-hidden="true"
                                                    className="size-5 shrink-0 text-gray-400"
                                                />
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">
                                                        {res.file}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4 shrink-0">
                                                <a
                                                    href={res.file}
                                                    target="_blank"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Show
                                                </a>
                                            </div>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm/6 font-medium text-gray-900">
                        Invoices
                    </dt>
                    <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ul
                            role="list"
                            className="divide-y divide-gray-100 rounded-md border border-gray-200"
                        >
                            {data?.repair_information?.invoices1?.map(
                                (res, i) => {
                                    return (
                                        <li
                                            key={i}
                                            className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6"
                                        >
                                            <div className="flex w-0 flex-1 items-center">
                                                <PaperClipIcon
                                                    aria-hidden="true"
                                                    className="size-5 shrink-0 text-gray-400"
                                                />
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">
                                                        {res.file}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4 shrink-0">
                                                <a
                                                    href={res.file}
                                                    target="_blank"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Show
                                                </a>
                                            </div>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </dd>
                </div>
            </Modal>
        </>
    );
}

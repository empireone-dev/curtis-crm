"use client";

import { useState } from "react";
import {
    Dialog,
    DialogPanel,
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import {
    Bars3Icon,
    CalendarDaysIcon,
    CreditCardIcon,
    EllipsisVerticalIcon,
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    PaperClipIcon,
    UserCircleIcon,
    XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import {
    BellIcon,
    XMarkIcon as XMarkIconOutline,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import DealerFormSection from "./dealer-form-section";
import UploadFilesSection from "./upload-files-section";
import { store_repair_information_service } from "@/app/services/repair-information-service";
import Swal from "sweetalert2";
import moment from "moment";

export default function DecisionSection({ data, callback, setForm }) {
    const [loading, setLoading] = useState(false);
    console.log("data", data);
    async function submit_form(value,status) {
        setLoading(true);
        try {
            await store_repair_information_service({
                ...data,
                decision_status:value,
                status:status
            });
            // await callback();
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <>
            <main>
                <header className="relative isolate">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 overflow-hidden"
                    >
                        <div className="absolute top-full left-16 -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
                            <div
                                style={{
                                    clipPath:
                                        "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
                                }}
                                className="aspect-1154/678 w-[72.125rem] bg-linear-to-br from-[#FF80B5] to-[#9089FC]"
                            />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
                    </div>

                    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                        <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                            <div className="flex items-center gap-x-6">
                                <img
                                    alt=""
                                    src="/images/logo.png"
                                    className="w-52 flex-none   ring-gray-900/10"
                                />
                                <h1>
                                    <div className="mt-1 text-base font-semibold text-gray-900">
                                        CaseFile: {data.ticket_id}{" "}
                                    </div>
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <div className="lg:col-start-3 lg:row-end-1">
                            <h2 className="sr-only">Summary</h2>
                            <div className="rounded-lg bg-gray-50 ring-1 shadow-xs ring-gray-900/5">
                                <dl className="flex flex-wrap">
                                    <div className="flex-auto pt-6 pl-6">
                                        <dt className="text-sm/6 font-semibold text-gray-900">
                                            Amount
                                        </dt>
                                        <dd className="mt-1 text-base font-semibold text-gray-900">
                                            $ {parseInt(data?.dealer?.total??0).toFixed(2)}
                                        </dd>
                                    </div>
                                    <div className="flex-none self-end px-6 pt-4">
                                        <dt className="sr-only">Status</dt>
                                        <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-green-600/20 ring-inset">
                                            Paid
                                        </dd>
                                    </div>
                                    <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                        <dt className="flex-none">
                                            <span className="sr-only">
                                                Client
                                            </span>
                                            <UserCircleIcon
                                                aria-hidden="true"
                                                className="h-6 w-5 text-gray-400"
                                            />
                                        </dt>
                                        <dd className="text-sm/6 font-medium text-gray-900">
                                            {data.fname} {data.mname}{" "}
                                            {data.lname}
                                        </dd>
                                    </div>
                                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                        <dt className="flex-none">
                                            <span className="sr-only">
                                                Due date
                                            </span>
                                            <CalendarDaysIcon
                                                aria-hidden="true"
                                                className="h-6 w-5 text-gray-400"
                                            />
                                        </dt>
                                        <dd className="text-sm/6 text-gray-500">
                                            <time dateTime="2023-01-31">
                                                {moment(
                                                    data.purchase_date
                                                ).format("LL")}
                                            </time>
                                        </dd>
                                    </div>
                                    {/* <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                        <dt className="flex-none">
                                            <span className="sr-only">
                                                Status
                                            </span>
                                            <CreditCardIcon
                                                aria-hidden="true"
                                                className="h-6 w-5 text-gray-400"
                                            />
                                        </dt>
                                        <dd className="text-sm/6 text-gray-500">
                                            Paid with MasterCard
                                        </dd>
                                    </div> */}
                                </dl>
                                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                                    {/* <a
                                        href="#"
                                        className="text-sm/6 font-semibold text-gray-900"
                                    >
                                        Download receipt{" "}
                                        <span aria-hidden="true">&rarr;</span>
                                    </a> */}
                                </div>
                            </div>
                        </div>

                        {/* Invoice */}
                        <div className="-mx-4 px-4 py-8 ring-1 shadow-xs ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pt-16 xl:pb-20">
                            <div className="text-xl  font-bold">
                                Purchase Information
                            </div>
                            <dl className="mt-6 grid grid-cols-1 text-sm/6 sm:grid-cols-2">
                                <div className="sm:pr-4">
                                    <dt className="inline text-gray-500">
                                        Purchase Date:
                                    </dt>
                                </div>
                                <div className="mt-2 sm:mt-0 sm:pl-4">
                                    <dt className="inline text-gray-500">
                                        {data.purchase_date}
                                    </dt>
                                </div>
                                <div className="sm:pr-4">
                                    <dt className="inline text-gray-500">
                                        Model Number:
                                    </dt>{" "}
                                </div>
                                <div className="mt-2 sm:mt-0 sm:pl-4">
                                    <dt className="inline text-gray-500">
                                        {data.unit}
                                    </dt>
                                </div>
                            </dl>
                            <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pt-6 sm:pl-4"></div>

                            <div className="text-xl  font-bold">
                                Personal Information
                            </div>
                            <dl className="mt-6 grid grid-cols-1 text-sm/6 sm:grid-cols-2">
                                <div className="sm:pr-4">
                                    <dt className="inline text-gray-500">
                                        Customer Name:
                                    </dt>
                                </div>
                                <div className="mt-2 sm:mt-0 sm:pl-4">
                                    <dt className="inline text-gray-500">
                                        {data.fname} {data.mname} {data.lname}
                                    </dt>
                                </div>
                                <div className="sm:pr-4">
                                    <dt className="inline text-gray-500">
                                        Address:
                                    </dt>{" "}
                                </div>
                                <div className="mt-2 sm:mt-0 sm:pl-4">
                                    <dt className="inline text-gray-500">
                                        {data.address}
                                    </dt>
                                </div>
                                <div className="sm:pr-4">
                                    <dt className="inline text-gray-500">
                                        City, Province/State:
                                    </dt>{" "}
                                </div>
                                <div className="mt-2 sm:mt-0 sm:pl-4">
                                    <dt className="inline text-gray-500">
                                        {data.city} {data.state}
                                    </dt>
                                </div>
                                <div className="sm:pr-4">
                                    <dt className="inline text-gray-500">
                                        Zipcode/Postal Code:
                                    </dt>{" "}
                                </div>
                                <div className="mt-2 sm:mt-0 sm:pl-4">
                                    <dt className="inline text-gray-500">
                                        {data.zip_code}
                                    </dt>
                                </div>
                                <div className="sm:pr-4">
                                    <dt className="inline text-gray-500">
                                        Phone Number:
                                    </dt>{" "}
                                </div>
                                <div className="mt-2 sm:mt-0 sm:pl-4">
                                    <dt className="inline text-gray-500">
                                        {data.phone}
                                    </dt>
                                </div>
                            </dl>

                            <DealerFormSection form={data} setForm={setForm} />
                            <br />
                            <div className="flex gap-3">
                            <button
                                onClick={()=>submit_form('NOT REPAIRED','REPAIR UNSUCCESSFUL')}
                                className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-md w-full"
                            >
                                {loading ? "Loading..." : "NOT REPAIRED"}
                            </button>
                            <button
                                onClick={()=>submit_form('REPAIRED','REPAIR SUCCESS')}
                                className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-md w-full"
                            >
                                {loading ? "Loading..." : "REPAIRED"}
                            </button>
                            </div>
                        </div>

                        <div className="lg:col-start-3">
                            {/* Activity feed */}
                            <h2 className="text-sm/6 font-semibold text-gray-900">
                                Activity
                            </h2>
                            <UploadFilesSection form={data} setForm={setForm} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

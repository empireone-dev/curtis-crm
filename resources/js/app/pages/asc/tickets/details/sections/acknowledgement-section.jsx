import { accept_acknowledge_service } from "@/app/services/tickets-service";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function AcknowledgementSection({ data,callback }) {
    const [loading, setLoading] = useState(false);
    async function accept_acknowledge(params) {
        setLoading(true);
        try {
            await accept_acknowledge_service(data);
            await callback()
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <div>
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
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                            Unit:
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data.unit}{" "}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                            Brand:
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data.brand}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                            Model:{" "}
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data.class}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                            Serial
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data.serial_number}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
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
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                            Name:
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data.fname} {data.mname} {data.lname}{" "}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                            Address:
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data.address}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                            City/Province:{" "}
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data.city} {data.province}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                            State
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data.state}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                            Zipcode/Postal Code
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data.zip_code}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                            Email
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data.email}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                            Phone
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data.phone}
                        </dd>
                    </div>
                </dl>
            </div>
            <div className="fixed bottom-0 right-0 p-5">
                <button
                disabled={loading}
                    onClick={accept_acknowledge}
                    className="bg-green-600 hover:bg-green-500 p-2 rounded-lg text-white"
                >
                    {loading ? "Loading..." : " ACKNOWLEDGE RECEIPT"}
                </button>
            </div>
        </div>
    );
}

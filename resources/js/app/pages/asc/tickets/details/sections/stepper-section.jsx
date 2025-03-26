import { get_tickets_by_ticket_details_id } from "@/app/services/tickets-service";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import AcknowledgementSection from "./acknowledgement-section";
import ConfirmationSection from "./confirmation-section";
import DecisionSection from "./decision-section";

export default function StepperSection() {
    const [data, setData] = useState({});
    const [form, setForm] = useState({});

    async function get_ticket(params) {
        const res = await get_tickets_by_ticket_details_id(
            window.location.pathname.split("/")[3]
        );
        setData(res);
        setForm(res);
    }

    useEffect(() => {
        get_ticket();
    }, []);

    const steps = [
        {
            id: "01",
            name: "Acknowledgement Form",
            href: "#",
            status:
                data.received_at == null && data.asc_status == null
                    ? "current"
                    : "complete",
        },
        {
            id: "02",
            name: "Confirmation",
            href: "#",
            // status: "current"
            status:
                data.received_at == null && data.asc_status == null
                    ? "upcoming"
                    : data.received_at == null && data.asc_status != null
                    ? "current"
                    : "complete",
        },
        {
            id: "03",
            name: "Decision",
            href: "#",
            status:
                (data.received_at == null && data.asc_status == null) ||
                (data.received_at == null && data.asc_status != null)
                    ? "upcoming"
                    : (data.received_at == null && data.asc_status != null) ||
                      (data.received_at != null && data.asc_status != null)
                    ? "current"
                    : "complete",
        },
    ];

    const page1 = data.received_at == null && data.asc_status == null && (
        <AcknowledgementSection callback={() => get_ticket()} data={form} />
    );

    const page2 = data.received_at == null && data.asc_status != null && (
        <ConfirmationSection callback={() => get_ticket()} data={form} />
    );

    const page3 =
        (data.received_at == null && data.asc_status != null) ||
        (data.received_at != null && data.asc_status != null && (
            <DecisionSection callback={() => get_ticket()}
            setForm={setForm}
            data={form} />
        ));
console.log('formform',form)
    return (
        <div>
            <nav aria-label="Progress">
                <ol
                    role="list"
                    className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
                >
                    {steps.map((step, stepIdx) => (
                        <li
                            key={step.name}
                            className="relative md:flex md:flex-1"
                        >
                            {step.status === "complete" ? (
                                <a
                                    href={step.href}
                                    className="group flex w-full items-center"
                                >
                                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                                            <CheckIcon
                                                aria-hidden="true"
                                                className="size-6 text-white"
                                            />
                                        </span>
                                        <span className="ml-4 text-sm font-medium text-gray-900">
                                            {step.name}
                                        </span>
                                    </span>
                                </a>
                            ) : step.status === "current" ? (
                                <a
                                    href={step.href}
                                    aria-current="step"
                                    className="flex items-center px-6 py-4 text-sm font-medium"
                                >
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                                        <span className="text-indigo-600">
                                            {step.id}
                                        </span>
                                    </span>
                                    <span className="ml-4 text-sm font-medium text-indigo-600">
                                        {step.name}
                                    </span>
                                </a>
                            ) : (
                                <a
                                    href={step.href}
                                    className="group flex items-center"
                                >
                                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                                            <span className="text-gray-500 group-hover:text-gray-900">
                                                {step.id}
                                            </span>
                                        </span>
                                        <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                                            {step.name}
                                        </span>
                                    </span>
                                </a>
                            )}

                            {stepIdx !== steps.length - 1 ? (
                                <>
                                    {/* Arrow separator for lg screens and up */}
                                    <div
                                        aria-hidden="true"
                                        className="absolute top-0 right-0 hidden h-full w-5 md:block"
                                    >
                                        <svg
                                            fill="none"
                                            viewBox="0 0 22 80"
                                            preserveAspectRatio="none"
                                            className="size-full text-gray-300"
                                        >
                                            <path
                                                d="M0 -2L20 40L0 82"
                                                stroke="currentcolor"
                                                vectorEffect="non-scaling-stroke"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </>
                            ) : null}
                        </li>
                    ))}
                </ol>
            </nav>
            <div className="p-5">
                {data.id && page1}
                {data.id && page2}
                {data.id && page3}
            </div>
        </div>
    );
}

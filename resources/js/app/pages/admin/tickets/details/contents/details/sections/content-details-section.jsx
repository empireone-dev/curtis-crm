import Loading from "@/app/layouts/components/loading";
import store from "@/app/store/store";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { update_tickets_status_thunk } from "../../../../_redux/tickets-thunk";
import { router } from "@inertiajs/react";
import ReasonToClose from "../id/sections/reason-to-close";
import routing from "../../../components/routing";
import MoveTicketAssignement from "./move-ticket-assignement";
import ResendInitialEmail from "./resend-initial-email";
import moment from "moment";

export default function ContentDetailsSection() {
    const { ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app);
    const [isLoading, setIsLoading] = useState(false);

    async function close_ticket() {
        if (confirm("Are you sure you want to close the ticket?")) {
            setIsLoading(true);
            try {
                await store.dispatch(
                    update_tickets_status_thunk(ticket?.id, "CLOSED")
                );
                setIsLoading(false);
                router.visit(routing("details"));
            } catch (error) {
                setIsLoading(false);
            }
        }
    }

    function edit_ticket(params) {
        if (user.role_id == 1) {
            router.visit(`/administrator/tickets/details/${ticket?.id}/edit`);
        } else {
            router.visit(`/agent/tickets/details/${ticket?.id}/edit`);
        }
    }
    async function open_ticket(params) {
        if (confirm("Are you sure you want to open the ticket?")) {
            setIsLoading(true);
            try {
                await store.dispatch(
                    update_tickets_status_thunk(ticket?.id, "OPEN")
                );
                setIsLoading(false);
                router.visit(routing("details"));
            } catch (error) {
                setIsLoading(false);
            }
        }
    }
    const formatPhone = (phone) => {
        if (!phone) return "N/A";
        const cleaned = phone.replace(/[^\d]/g, "");
        if (cleaned.length !== 10) return "N/A";
        const formatted = cleaned.replace(
            /(\d{3})(\d{3})(\d{4})/,
            "($1) $2-$3"
        );
        return formatted;
    };

    function print_pdf() {
        window.open("/print/ticket_details/" + ticket?.id, "_blank");
    }
    return (
        <div className="m-5 py-5">
            <div className="px-4 sm:px-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                            Ticket Details
                        </h3>
                        <button
                            onClick={print_pdf}
                            className="p-2 bg-green-500 hover:bg-green-600 rounded-md text-white"
                        >
                            Print PDF
                        </button>
                    </div>

                    <div className="flex gap-5">
                        {ticket?.email && <ResendInitialEmail />}
                        <MoveTicketAssignement />
                        <button
                            onClick={edit_ticket}
                            className="bg-blue-500 p-2 text-white  hover:bg-blue-600  w-48"
                        >
                            <div className="p-1 w-full flex items-center justify-center">
                                EDIT TICKET
                            </div>
                        </button>

                        {ticket?.status == "CLOSED" ? (
                            <button
                                onClick={open_ticket}
                                className="bg-violet-500 p-3 text-white  hover:bg-violet-600 w-48"
                            >
                                OPEN
                            </button>
                        ) : (
                            <ReasonToClose data={ticket} />
                        )}
                    </div>
                </div>
                <h3 className="text-base font-semibold leading-7 text-red-600">
                    {ticket?.move_status ?? ""}
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6  font-medium text-gray-500">
                    Personal details and ticket?.
                </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <b>Case File Number :</b> {ticket?.ticket_id}
                        </dt>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <b>Full name :</b> {ticket?.fname} {ticket?.lname}
                        </dt>
                        <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                            <b>Email :</b> {ticket?.email}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <b>Phone :</b> {formatPhone(ticket?.phone)}
                        </dt>
                        <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                            <b>Purchase Date :</b>{" "}
                            {moment(ticket?.purchase_date).format("LL")}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <b>Store Name:</b> {ticket?.receipt?.store ?? "NA"}
                        </dt>
                        <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                            {/* <b>Unit :</b> {ticket?.unit} */}Brand Name:{" "}
                            {ticket?.brand}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <b>Model # :</b> {ticket?.item_number}
                        </dt>
                        <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                            <b>Unit :</b> {ticket?.unit}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <b>Serial # :</b> {ticket?.serial_number}
                        </dt>
                        <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                            <b>Item Type :</b> {ticket?.class}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900 flex">
                            <b>Issue :</b>{" "}
                            <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-blue-100 bg-blue-700 border border-blue-700">
                                <div className="text-xs font-normal leading-none max-w-full flex-initial">
                                    {ticket?.issue}
                                </div>
                            </div>
                        </dt>
                        <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                            <b>Resolution :</b> {ticket?.call_type}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <b>Country :</b> {ticket?.country}
                        </dt>
                        <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                            <b>Zip Code / Postal :</b> {ticket?.zip_code}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <b>Address :</b> {ticket?.address}
                        </dt>
                        <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                            <b>State :</b> {ticket?.state}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <b>City :</b> {ticket?.city}
                        </dt>
                        <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                            <b>Authorized Service Center:</b> N/A
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <b>Remarks :</b> {ticket?.remarks}
                        </dt>
                        <dd className="mt-1 text-sm leading-6  font-medium text-gray-700 sm:col-span-2 sm:mt-0">
                            <b>Explanation :</b> {ticket?.explanation}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}

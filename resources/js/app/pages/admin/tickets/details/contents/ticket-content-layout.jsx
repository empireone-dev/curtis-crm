import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import store from "@/app/store/store";
import { get_upload_ticket_files_thunk } from "@/app/pages/customer/tickets/redux/customer-tickets-thunk";
import { setFilesData } from "@/app/pages/customer/tickets/redux/customer-tickets-slice";
import { useDispatch, useSelector } from "react-redux";
import { get_tickets_by_ticket_id } from "@/app/services/tickets-service";
import { setTicket } from "../../_redux/tickets-slice";
import { TicketIcon } from "@heroicons/react/24/outline";
import Skeleton from "@/app/layouts/components/skeleton";
import TicketsDetailsMoveAssignSection from "../sections/tickets-details-move-assign-section,";

export default function TicketsDetailsLayout({ children }) {
    const { ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app);
    const { url } = usePage();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const ticketId = url
                    .split("/")
                    [url.split("/").length - 2].split("#")[0];
                const res = await store.dispatch(
                    get_upload_ticket_files_thunk(ticketId)
                );
                const ress = await get_tickets_by_ticket_id(ticketId);
                dispatch(setTicket(ress));
                dispatch(setFilesData(res));
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [url, dispatch]);

    const tabs = [
        ...(ticket.call_type !== "TS-Tech Support"
            ? [
                  {
                      title: "Files",
                      hash: "files",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" &&
        ticket.call_type === "CF-Warranty Claim" &&
        ticket.status === "WARRANTY VALIDATION"
            ? [
                  {
                      title: "Warranty Validation",
                      hash: "warranty_validation",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" &&
        ticket.call_type === "Parts" &&
        ticket.status === "PARTS VALIDATION"
            ? [
                  {
                      title: "Parts Validation",
                      hash: "parts_validation",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" && ticket.status === "RESOURCE"
            ? [
                  {
                      title: "Decision Making",
                      hash: "decision",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" &&
        (ticket.status === "CA WAREHOUSE" ||
            ticket.status === "US WAREHOUSE" )
            ? [
                  {
                      title: ticket.country + " Warehouse",
                      hash: "warehouse",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" && ticket.status === "REPAIR"
            ? [
                  {
                      title: "Repair",
                      hash: "repair",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" && ticket.status === "AVAILABILITY"
            ? [
                  {
                      title: "Availability",
                      hash: "availability",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" && ticket.status === "INTERNALS"
            ? [
                  {
                      title: "Internals",
                      hash: "internals",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" && ticket.status === "CALLBACK"
            ? [
                  {
                      title: "Callback",
                      hash: "callback",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" && ticket.status === "REFUND"
            ? [
                  {
                      title: "Refund",
                      hash: "refund",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" && ticket.status === "REPLACEMENT"
            ? [
                  {
                      title: "Replacement",
                      hash: "replacement",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" &&
        ticket.status === "REPLACEMENT PARTS"
            ? [
                  {
                      title: "Replacement Parts",
                      hash: "replacement_parts",
                  },
              ]
            : []),
        ...(ticket.call_type === "TS-Tech Support" &&
        ticket.status === "TECH VALIDATION"
            ? [
                  {
                      title: "Update Status",
                      hash: "status",
                  },
              ]
            : []),
        {
            title: "Activities",
            hash: "activities",
        },
        {
            title: "Details",
            hash: "details",
        },
        {
            title: "Agent Notes",
            hash: "notes",
        },
    ];

    const handleTabClick = (index) => {
        router.visit(tabs[index].hash);
    };
    const hash = window.location.pathname.split("/")[5];
    return (
        <div className="font-sans ">
            <div className="sticky top-0 bg-white z-10">
                {user.agent_type !== "CSR" && (
                    <TicketsDetailsMoveAssignSection />
                )}
                <div className=" px-8 text-3xl font-black text-red-600">
               Case File : {ticket.ticket_id??'N/A'}
                </div>
                <div className="w-full px-8">
                    <div
                        className={`py-3 text-3xl font-black flex gap-3 ${
                            ticket.status === "CLOSED"
                                ? "text-red-600"
                                : "text-blue-600"
                        }`}
                    >
                        <TicketIcon className="h-9" />{" "}
                        {ticket.status ?? "Open Ticket"} ({ticket.call_type})
                    </div>
                    <div className="mb-4 flex space-x-4 p-2 bg-white rounded-md border-blue-500 border-2 ">
                        {tabs.map((res, i) => (
                            <button
                                key={i}
                                onClick={() => handleTabClick(i)}
                                className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                                    hash === res.hash
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-300 hover:bg-blue-200"
                                }`}
                            >
                                {res.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mx-8">{loading ? <Skeleton /> : children}</div>
        </div>
    );
}

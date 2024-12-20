import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import store from "@/app/store/store";
import { get_upload_ticket_files_thunk } from "@/app/pages/customer/tickets/redux/customer-tickets-thunk";
import { setFilesData } from "@/app/pages/customer/tickets/redux/customer-tickets-slice";
import { useDispatch, useSelector } from "react-redux";
import { get_tickets_by_ticket_id } from "@/app/services/tickets-service";
import { setTicket } from "../../_redux/tickets-slice";
import { InboxStackIcon, TicketIcon } from "@heroicons/react/24/outline";

import TicketsDetailsMoveAssignComponents from "../components/tickets-details-move-assign-components";


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
// tech support = files,activities,details,agent
//parts = files,activities details agent
//waranty = files,activities details and agent notes
export default function TicketsDetailsTabSection({ account }) {
    const { ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app);
    const { url } = usePage();
    const page = usePage();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await store.dispatch(
                    get_upload_ticket_files_thunk(
                        url.split("/")[url.split("/").length - 2].split("#")[0]
                    )
                );
                const ress = await get_tickets_by_ticket_id(
                    url.split("/")[url.split("/").length - 2].split("#")[0]
                );
                dispatch(setTicket(ress));
                dispatch(setFilesData(res));
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [url]);
    const tabs = [
        {
            title: "Files",
            // components: <TicketsDetailsContentFiles />,
            hash: "#files",
        },
        ...(ticket?.isUploading === "true" &&
        ticket.call_type === "CF-Warranty Claim" &&
        ticket.status == "WARRANTY VALIDATION"
            ? [
                  {
                      title: "Warranty Validation",
                      // components: <ContentsWarrantyValidationPage />,
                      hash: "#warranty_validation",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" &&
        ticket.call_type === "Parts" &&
        ticket.status === "PARTS VALIDATION"
            ? [
                  {
                      title: "Parts Validation",
                      // components: <TicketsPartsValidationContent />,
                      hash: "#parts_validation",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" && ticket.status === "RESOURCE"
            ? [
                  {
                      title: "Decision Making",
                      // components: <TicketsDecisionMakingContent />,
                      hash: "#decision",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" &&
        (ticket.status === "CA WAREHOUSE" ||
            ticket.status === "US WAREHOUSE" ||
            ticket.status === "CLOSED")
            ? // && account?.role_id == 3
              [
                  {
                      title: ticket.country + " Warehouse",
                      // components: <WarehousePage />,
                      hash: "#warehouse",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" && ticket.status === "REPAIR"
            ? [
                  {
                      title: "Repair",
                      // components: <ContentsRepairPage />,
                      hash: "#repair",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" && ticket.status === "AVAILABILITY"
            ? [
                  {
                      title: "Availability",
                      // components: <TicketsAvailabilityContent />,
                      hash: "#availability",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" && ticket.status === "INTERNALS"
            ? [
                  {
                      title: "Internals",
                      // components: <TicketsPartsInternalsContent />,
                      hash: "#internals",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" && ticket.status === "CALLBACK"
            ? [
                  {
                      title: "Callback",
                      // components: <ContentsCallBackPage />,
                      hash: "#callback",
                  },
              ]
            : []),

        ...(ticket?.isUploading === "true" && ticket.status === "REFUND"
            ? [
                  {
                      title: "Refund",
                      // components: <ContentsRefundPage />,
                      hash: "#refund",
                  },
              ]
            : []),
        ...(ticket?.isUploading === "true" && ticket.status === "REPLACEMENT"
            ? [
                  {
                      title: "Replacement",
                      // components: <ReplacementWarrantyPage />,
                      hash: "#replacement",
                  },
              ]
            : []),

        ...(ticket?.isUploading === "true" &&
        ticket.status === "REPLACEMENT PARTS"
            ? [
                  {
                      title: "Replacement Parts",
                      // components: <ContentsReplacementPartsPage />,
                      hash: "#replacement_parts",
                  },
              ]
            : []),

        ...(ticket.call_type == "TS-Tech Support" &&
        ticket.status === "TECH VALIDATION"
            ? [
                  {
                      title: "Update Status",
                      // components: <TicketsDetailsContentStatus />,
                      hash: "#status",
                  },
              ]
            : []),

        {
            title: "Activities",
            // components: <TicketsDetailsContentActivities />,
            hash: "#activities",
        },
        {
            title: "Details",
            // components: <TicketsDetailsContentDetails />,
            hash: "#details",
        },
        {
            title: "Agent Notes",
            // components: <TicketsDetailsContentNotes />,
            hash: "#notes",
        },
    ];

    const handleTabClick = (index) => {
        router.visit(tabs[index].hash);
    };
    const hash = "#" + page.url.split("#")[1];
    return (
        <div className=" font-sans h-full">
            <div className="px-8">
                <div className="w-full ">
                    {user.role_id == 3 && ticket.status === "WAREHOUSE" && (
                        <div className="pt-10">
                            {" "}
                            <TicketsDetailsMoveAssignComponents
                                ticket={ticket}
                                name="MOVE TO RESOURCE"
                                value="RESOURCE"
                                icon={<InboxStackIcon className="h-6" />}
                                link="decision"
                            />
                        </div>
                    )}
                    <div
                        className={`py-3 text-3xl font-black flex gap-3 ${
                            ticket.status == "CLOSED"
                                ? " text-red-600"
                                : " text-blue-600"
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
                                    hash == res.hash
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-300 hover:bg-blue-200"
                                }`}
                            >
                                {res.title}
                            </button>
                        ))}
                    </div>
                    {/* {loading ? (
                        <Skeleton />
                    ) : (
                        tabs.map((res, i) => {
                            return (
                                <div
                                    key={i}
                                    className={classNames("rounded-xl ", "")}
                                >
                                    {hash == res.hash &&
                                        page.url.split("#")[1] &&
                                        res.components}
                                </div>
                            );
                        })
                    )} */}
                </div>
            </div>
        </div>
    );
}

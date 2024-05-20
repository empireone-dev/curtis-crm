import React, { useEffect, useState } from "react";
import {
    AdjustmentsHorizontalIcon,
    ArchiveBoxArrowDownIcon,
    ArrowsRightLeftIcon,
    AtSymbolIcon,
    BanknotesIcon,
    BookOpenIcon,
    CheckBadgeIcon,
    CheckCircleIcon,
    ClipboardIcon,
    Cog6ToothIcon,
    ComputerDesktopIcon,
    CpuChipIcon,
    DocumentCheckIcon,
    EnvelopeIcon,
    HomeIcon,
    HomeModernIcon,
    IdentificationIcon,
    ListBulletIcon,
    PhotoIcon,
    ShoppingCartIcon,
    TagIcon,
    TicketIcon,
    UserCircleIcon,
    UserGroupIcon,
    WrenchScrewdriverIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { agent_dashboard_service } from "@/app/services/dashboard-service";
import AgentCardsComponent from "../components/agent-cards-component";
import { useSelector } from "react-redux";

export default function AgentCardsSection({ account }) {
    const { user } = useSelector((state) => state.app);
    const [data, setData] = useState([]);
    useEffect(() => {
        async function get_dashboard(params) {
            const res = await agent_dashboard_service(account.id);
            setData(res);
        }
        get_dashboard();
    }, []);

    function agent_type(value) {
        if (user.agent_type) {
            const agent_types = user.agent_type.split("/");
            return agent_types.some((val) => value.includes(val));
            // console.log("agent_type", user.agent_type);
            // return true;
        }
    }

    return (
        <div className="py-4 mx-3">
            <div className="my-6">
                <div className="text-3xl font-black my-8">Customers</div>
                <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                    {agent_type(["Warranty"]) && (
                        <AgentCardsComponent
                            title="Waiting For The Photos"
                            link="false"
                            count={data.waiting_photos ?? 0}
                            icon={<PhotoIcon className="h-10 text-white" />}
                        />
                    )}

                    {/* <AgentCardsComponent
                        title="Unseen Customer Email Tickets"
                        count="100"
                        icon={<AtSymbolIcon className="h-10 text-white" />}
                    /> */}

                    {agent_type(["Warranty", "Parts"]) && (
                        <AgentCardsComponent
                            title="Customer Responded"
                            count="100"
                            icon={<UserGroupIcon className="h-10 text-white" />}
                        />
                    )}
                </div>
            </div>

            {agent_type(["Warranty"]) && (
                <div className="text-3xl font-black mb-8">Warranty Claim</div>
            )}
            <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {agent_type(["Warranty"]) && (
                    <AgentCardsComponent
                        title="Warranty Validation"
                        link="WARRANTY VALIDATION"
                        count={data.warranty_validation ?? 0}
                        icon={<ListBulletIcon className="h-10 text-white" />}
                    />
                )}

                {agent_type(["Warranty"]) && (
                    <AgentCardsComponent
                        title="Resouce Team"
                        count={data.resource ?? 0}
                        link="RESOURCE"
                        icon={
                            <ArchiveBoxArrowDownIcon className="h-10 text-white" />
                        }
                    />
                )}

                {/* <AgentCardsComponent
                    title="ASC Tickets"
                    link="REPAIR"
                    count={data.repair ?? 0}
                    icon={<TicketIcon className="h-10 text-white" />}
                /> */}
                {agent_type(["Warranty"]) && (
                    <AgentCardsComponent
                        title="Refund Tickets"
                        link="REFUND"
                        count={data.refund ?? 0}
                        icon={<BanknotesIcon className="h-10 text-white" />}
                    />
                )}

                {agent_type(["Warranty"]) && (
                    <AgentCardsComponent
                        title="Replacement"
                        link="REPLACEMENT"
                        count={data.replacement ?? 0}
                        icon={<TagIcon className="h-10 text-white" />}
                    />
                )}

                {agent_type(["Warranty"]) && (
                    <AgentCardsComponent
                        title="Repair"
                        count={data.repair}
                        icon={<CheckBadgeIcon className="h-10 text-white" />}
                    />
                )}
                {agent_type(["Warranty"]) && (
                    <AgentCardsComponent
                        title="Processed Tickets for Warranty"
                        count={data.warranty_process_ticket ?? 0}
                        icon={<ClipboardIcon className="h-10 text-white" />}
                    />
                )}

                {agent_type(["Warranty"]) && (
                    <AgentCardsComponent
                        title="Close Tickets for Warranty"
                        link="CLOSED"
                        count={data.warranty_closed ?? 0}
                        icon={<XMarkIcon className="h-10 text-white" />}
                    />
                )}
            </div>
            {agent_type(["Parts"]) && (
                <div className="text-3xl font-black my-8">Parts</div>
            )}
            <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {agent_type(["Parts"]) && (
                    <AgentCardsComponent
                        title="Parts Validation"
                        link="PARTS VALIDATION"
                        count={data.parts_validation ?? 0}
                        icon={
                            <AdjustmentsHorizontalIcon className="h-10 text-white" />
                        }
                    />
                )}
                {agent_type(["Parts"]) && (
                    <AgentCardsComponent
                        title="Check Availability"
                        link="INTERNALS"
                        count={data.internals ?? 0}
                        icon={<CheckCircleIcon className="h-10 text-white" />}
                    />
                )}

                {agent_type(["Parts"]) && (
                    <AgentCardsComponent
                        title="Replacement For Parts"
                        link="REPLACEMENT PARTS"
                        count={data.replacement_parts ?? 0}
                        icon={<Cog6ToothIcon className="h-10 text-white" />}
                    />
                )}

                {agent_type(["Parts"]) && (
                    <AgentCardsComponent
                        title="Processed Tickets For Parts"
                        count={data.parts_process_ticket ?? 0}
                        icon={<ClipboardIcon className="h-10 text-white" />}
                    />
                )}

                {agent_type(["Parts"]) && (
                    <AgentCardsComponent
                        title="Closed Tickets For Parts"
                        count={data.parts_closed}
                        icon={<UserCircleIcon className="h-10 text-white" />}
                    />
                )}
            </div>

            {agent_type(["Tech"]) && (
                <div className="text-3xl font-black my-8">
                    Technical Support
                </div>
            )}
            <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {agent_type(["Tech"]) && (
                    <AgentCardsComponent
                        title="Technical"
                        link="TECH VALIDATION"
                        count={data.technical ?? 0}
                        icon={
                            <WrenchScrewdriverIcon className="h-10 text-white" />
                        }
                    />
                )}

                {agent_type(["Tech"]) && (
                    <AgentCardsComponent
                        title="Close Ticket for Technical"
                        link="Close"
                        count={data.tech_closed ?? 0}
                        icon={
                            <WrenchScrewdriverIcon className="h-10 text-white" />
                        }
                    />
                )}
            </div>
            {/* <div className="text-3xl font-black my-8">Curtis Internal</div> */}
            <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {agent_type(["Parts"]) && (
                    <AgentCardsComponent
                        title="Willing To Buy"
                        link="CALLBACK"
                        count={data.callback ?? 0}
                        icon={<ShoppingCartIcon className="h-10 text-white" />}
                    />
                )}
                {agent_type(["Parts"]) && (
                    <AgentCardsComponent
                        title="Check Availability"
                        link="INTERNALS"
                        count={data.internals ?? 0}
                        icon={<CheckCircleIcon className="h-10 text-white" />}
                    />
                )}

                {agent_type(["Parts"]) && (
                    <AgentCardsComponent
                        title="Updates From Curtis"
                        link="AVAILABILITY"
                        count={data.updates_curtis ?? 0}
                        icon={
                            <ComputerDesktopIcon className="h-10 text-white" />
                        }
                    />
                )}
            </div>
            {/* <div className="text-3xl font-black my-8">Warehouse</div>
            <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <AgentCardsComponent
                    title="CA Warehouse"
                    link="CA WAREHOUSE"
                    count={data.warehouse_ca ?? 0}
                    icon={<HomeIcon className="h-10 text-white" />}
                />
                <AgentCardsComponent
                    title="US Warehouse"
                    link="US WAREHOUSE"
                    count={data.warehouse_us ?? 0}
                    icon={<HomeModernIcon className="h-10 text-white" />}
                />
            </div> */}

            <div className="text-3xl font-black my-8">Others</div>
            <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {/* <AgentCardsComponent
                    title="RMA Request"
                    count="100"
                    icon={<ArrowsRightLeftIcon className="h-10 text-white" />}
                /> */}

                {agent_type(["Warranty", "Parts"]) && (
                    <AgentCardsComponent
                        title="Incomplete Information"
                        count="100"
                        icon={
                            <IdentificationIcon className="h-10 text-white" />
                        }
                    />
                )}

                {agent_type(["Warranty"]) && (
                    <AgentCardsComponent
                        title="Direct Emails"
                        count="100"
                        icon={<EnvelopeIcon className="h-10 text-white" />}
                    />
                )}

                {agent_type(["Warranty"]) && (
                    <AgentCardsComponent
                        title="ASC Completed"
                        count="100"
                        icon={<DocumentCheckIcon className="h-10 text-white" />}
                    />
                )}
            </div>
        </div>
    );
}

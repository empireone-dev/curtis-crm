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
import { customer_dashboard_service } from "@/app/services/dashboard-service";
import AgentCardsComponent from "../components/agent-cards-component";

export default function AgentCardsSection({ account }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function get_dashboard(params) {
            const res = await customer_dashboard_service(account.id);
            setData(res);
        }
        get_dashboard();
    }, []);
    return (
        <div className="mt-12 mr-3">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <AgentCardsComponent
                    title="Parts"
                    count={data.parts ?? 0}
                    icon={<CpuChipIcon className="h-10 text-white" />}
                />
                <AgentCardsComponent
                    title="RMA Request"
                    count="100"
                    icon={<ArrowsRightLeftIcon className="h-10 text-white" />}
                />
                <AgentCardsComponent
                    title="Refund Tickets"
                    link="REFUND"
                    count={data.refund ?? 0}
                    icon={<BanknotesIcon className="h-10 text-white" />}
                />
                <AgentCardsComponent
                    title="ASC Tickets"
                    link="REPAIR"
                    count={data.repair ?? 0}
                    icon={<TicketIcon className="h-10 text-white" />}
                />
                {/*  */}
                <AgentCardsComponent
                    title="Replacement For Warranty"
                    link="REPLACEMENT"
                    count={data.replacement ?? 0}
                    icon={<TagIcon className="h-10 text-white" />}
                />

                <AgentCardsComponent
                    title="Replacement For Parts"
                    link="REPLACEMENT PARTS"
                    count={data.replacement_parts ?? 0}
                    icon={<Cog6ToothIcon className="h-10 text-white" />}
                />

                <AgentCardsComponent
                    title="US Warehouse"
                    link="US WAREHOUSE"
                    count={data.warehouse_us ?? 0}
                    icon={<HomeModernIcon className="h-10 text-white" />}
                />

                <AgentCardsComponent
                    title="CA Warehouse"
                    link="CA WAREHOUSE"
                    count={data.warehouse_ca ?? 0}
                    icon={<HomeIcon className="h-10 text-white" />}
                />
                {/*  */}

                <AgentCardsComponent
                    title="Unseen Customer Email Tickets"
                    count="100"
                    icon={<AtSymbolIcon className="h-10 text-white" />}
                />

                <AgentCardsComponent
                    title="Customer Responded"
                    count="100"
                    icon={<UserGroupIcon className="h-10 text-white" />}
                />

                <AgentCardsComponent
                    title="Incomplete Information"
                    count="100"
                    icon={<IdentificationIcon className="h-10 text-white" />}
                />
                <AgentCardsComponent
                    title="Close Tickets"
                    link="CLOSED"
                    count={data.close ?? 0}
                    icon={<XMarkIcon className="h-10 text-white" />}
                />
                {/*  */}
                <AgentCardsComponent
                    title="Willing To Buy"
                    link="CALLBACK"
                    count={data.callback ?? 0}
                    icon={<ShoppingCartIcon className="h-10 text-white" />}
                />

                <AgentCardsComponent
                    title="Check Availability"
                    link="INTERNALS"
                    count={data.internals ?? 0}
                    icon={<CheckCircleIcon className="h-10 text-white" />}
                />
                <AgentCardsComponent
                    title="Updates From Curtis"
                    link="AVAILABILITY"
                    count={data.updates_curtis ?? 0}
                    icon={<ComputerDesktopIcon className="h-10 text-white" />}
                />
                <AgentCardsComponent
                    title="Repair Success"
                    count="100"
                    icon={<CheckBadgeIcon className="h-10 text-white" />}
                />
                {/*  */}
                <AgentCardsComponent
                    title="Processed Tickets"
                    count="100"
                    icon={<ClipboardIcon className="h-10 text-white" />}
                />

                <AgentCardsComponent
                    title="Direct Emails"
                    count="100"
                    icon={<EnvelopeIcon className="h-10 text-white" />}
                />

                <AgentCardsComponent
                    title="ASC Completed"
                    count="100"
                    icon={<DocumentCheckIcon className="h-10 text-white" />}
                />
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import DashboardCardsComponent from "../components/dashboard-cards-component";
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
import { administrator_dashboard_service } from "@/app/services/dashboard-service";

export default function DashboardCardsSection() {
    const [data, setData] = useState({});
    useEffect(() => {
        async function get_tile(params) {
            const res = await administrator_dashboard_service();
            setData(res);
        }
        get_tile();
    }, []);
    return (
        <div className="py-12 mr-3 px-5">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <DashboardCardsComponent
                    title="Validation"
                    link="WARRANTY VALIDATION"
                    count={data.validation ?? 0}
                    icon={<ListBulletIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="Parts Validation"
                    link="PARTS VALIDATION"
                    count={data.parts_validation ?? 0}
                    icon={
                        <AdjustmentsHorizontalIcon className="h-10 text-white" />
                    }
                />
                <DashboardCardsComponent
                    title="Resouce Team"
                    count={data.resource ?? 0}
                    link="RESOURCE"
                    icon={
                        <ArchiveBoxArrowDownIcon className="h-10 text-white" />
                    }
                />
                <DashboardCardsComponent
                    title="Technical"
                    link="TECHNICAL"
                    count={data.technical ?? 0}
                    icon={<WrenchScrewdriverIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="Parts"
                    count={data.parts ?? 0}
                    icon={<CpuChipIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="ChatBot Tickets"
                    count="100"
                    icon={<UserCircleIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="Web Forms Tickets"
                    count={data.web_form ?? 0}
                    icon={<BookOpenIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="RMA Request"
                    count="100"
                    icon={<ArrowsRightLeftIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="Waiting For The Photos"
                    link="false"
                    count={data.waiting_photos ?? 0}
                    icon={<PhotoIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="Refund Tickets"
                    link="REFUND"
                    count={data.refund ?? 0}
                    icon={<BanknotesIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="ASC Tickets"
                    link="REPAIR"
                    count={data.repair ?? 0}
                    icon={<TicketIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="Replacement For Warranty"
                    link="REPLACEMENT"
                    count={data.replacement ?? 0}
                    icon={<TagIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="Replacement For Parts"
                    link="REPLACEMENT PARTS"
                    count={data.replacement_parts ?? 0}
                    icon={<Cog6ToothIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="CA Warehouse"
                    link="CA WAREHOUSE"
                    count={data.warehouse_ca ?? 0}
                    icon={<HomeIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="US Warehouse"
                    link="US WAREHOUSE"
                    count={data.warehouse_us ?? 0}
                    icon={<HomeModernIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="Unseen Customer Email Tickets"
                    count="100"
                    icon={<AtSymbolIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="Customer Responded"
                    count="100"
                    icon={<UserGroupIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="Incomplete Information"
                    count="100"
                    icon={<IdentificationIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="Close Tickets"
                    link="CLOSED"
                    count={data.close ?? 0}
                    icon={<XMarkIcon className="h-10 text-white" />}
                />

                <DashboardCardsComponent
                    title="Willing To Buy"
                    link="CALLBACK"
                    count={data.callback ?? 0}
                    icon={<ShoppingCartIcon className="h-10 text-white" />}
                />

                <DashboardCardsComponent
                    title="Check Availability"
                    link="INTERNALS"
                    count={data.internals ?? 0}
                    icon={<CheckCircleIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="Updates From Curtis"
                    link="AVAILABILITY"
                    count={data.updates_curtis ?? 0}
                    icon={<ComputerDesktopIcon className="h-10 text-white" />}
                />
                <DashboardCardsComponent
                    title="Repair Success"
                    count="100"
                    icon={<CheckBadgeIcon className="h-10 text-white" />}
                />

                <DashboardCardsComponent
                    title="Processed Tickets"
                    count={data.process_ticket ?? 0}
                    icon={<ClipboardIcon className="h-10 text-white" />}
                />

                <DashboardCardsComponent
                    title="Direct Emails"
                    count="100"
                    icon={<EnvelopeIcon className="h-10 text-white" />}
                />

                <DashboardCardsComponent
                    title="ASC Completed"
                    count="100"
                    icon={<DocumentCheckIcon className="h-10 text-white" />}
                />
            </div>
        </div>
    );
}

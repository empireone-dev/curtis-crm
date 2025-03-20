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
import CurtisCardsComponent from "../components/curtis-cards-component";
import { administrator_dashboard_service } from "@/app/services/dashboard-service";

export default function CustomerCardsSection({ account }) {
    const [data, setData] = useState({});
    useEffect(() => {
        async function get_tile(params) {
            const res = await administrator_dashboard_service();
            setData(res);
        }
        get_tile();
    }, []);
    return (
        <div className="mr-3 px-5">
            <div className="text-3xl font-black my-8">Warranty Claim</div>
            <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <CurtisCardsComponent
                    title="Warranty Validation"
                    link="WARRANTY VALIDATION"
                    count={data.warranty_validation ?? 0}
                    icon={<ListBulletIcon className="h-10 text-white" />}
                />
                <CurtisCardsComponent
                    title="Resouce Team"
                    count={data.resource ?? 0}
                    link="RESOURCE"
                    icon={
                        <ArchiveBoxArrowDownIcon className="h-10 text-white" />
                    }
                />
                <CurtisCardsComponent
                    title="ASC Tickets"
                    link="REPAIR"
                    count={data.repair ?? 0}
                    icon={<TicketIcon className="h-10 text-white" />}
                />
                <CurtisCardsComponent
                    title="Refund Tickets"
                    link="REFUND"
                    count={data.refund ?? 0}
                    icon={<BanknotesIcon className="h-10 text-white" />}
                />

                <CurtisCardsComponent
                    title="Replacement"
                    link="REPLACEMENT"
                    count={data.replacement ?? 0}
                    icon={<TagIcon className="h-10 text-white" />}
                />
                <CurtisCardsComponent
                    title="Repair"
                    link="REPAIR"
                    count={data.repair}
                    icon={<CheckBadgeIcon className="h-10 text-white" />}
                />
                <CurtisCardsComponent
                    link="PROCESSED TICKET"
                    title="Processed Tickets for Warranty"
                    count={data.warranty_process_ticket ?? 0}
                    icon={<ClipboardIcon className="h-10 text-white" />}
                />

                <CurtisCardsComponent
                    title="Close Tickets for Warranty"
                    link="WARRANTY CLOSED"
                    count={data.warranty_closed ?? 0}
                    icon={<XMarkIcon className="h-10 text-white" />}
                />
            </div>
            <div className="text-3xl font-black my-8">Parts</div>
            <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <CurtisCardsComponent
                    title="Parts Validation"
                    link="PARTS VALIDATION"
                    count={data.parts_validation ?? 0}
                    icon={
                        <AdjustmentsHorizontalIcon className="h-10 text-white" />
                    }
                />

                <CurtisCardsComponent
                    title="Check Availability"
                    link="INTERNALS"
                    count={data.internals ?? 0}
                    icon={<CheckCircleIcon className="h-10 text-white" />}
                />

                <CurtisCardsComponent
                    title="Replacement For Parts"
                    link="REPLACEMENT PARTS"
                    count={data.replacement_parts ?? 0}
                    icon={<Cog6ToothIcon className="h-10 text-white" />}
                />
                <CurtisCardsComponent
                    link="PARTS PROCESSED TICKET"
                    title="Processed Tickets For Parts"
                    count={data.parts_process_ticket ?? 0}
                    icon={<ClipboardIcon className="h-10 text-white" />}
                />
                <CurtisCardsComponent
                    title="Updates From Curtis"
                    link="AVAILABILITY"
                    count={data.updates_curtis ?? 0}
                    icon={<ComputerDesktopIcon className="h-10 text-white" />}
                />
                <CurtisCardsComponent
                    title="Closed Tickets For Parts"
                    link="PARTS CLOSED"
                    count={data.parts_closed}
                    icon={<UserCircleIcon className="h-10 text-white" />}
                />
            </div>
            <div className="text-3xl font-black my-8">Technical Support</div>

            <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <CurtisCardsComponent
                    title="Technical"
                    link="TECH VALIDATION"
                    count={data.technical ?? 0}
                    icon={<WrenchScrewdriverIcon className="h-10 text-white" />}
                />
                <CurtisCardsComponent
                    title="Close Ticket for Technical"
                    link="TECH CLOSED"
                    count={data.tech_closed ?? 0}
                    icon={<WrenchScrewdriverIcon className="h-10 text-white" />}
                />
            </div>
            <div className="text-3xl font-black my-8">Curtis Internal</div>
            <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <CurtisCardsComponent
                    title="Willing To Buy"
                    link="CALLBACK"
                    count={data.callback ?? 0}
                    icon={<ShoppingCartIcon className="h-10 text-white" />}
                />

                <CurtisCardsComponent
                    title="Check Availability"
                    link="INTERNALS"
                    count={data.internals ?? 0}
                    icon={<CheckCircleIcon className="h-10 text-white" />}
                />
            </div>
            <div className="text-3xl font-black my-8">Warehouse</div>
            <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <CurtisCardsComponent
                    title="CA Warehouse"
                    link="CA WAREHOUSE"
                    count={data.warehouse_ca ?? 0}
                    icon={<HomeIcon className="h-10 text-white" />}
                />
                <CurtisCardsComponent
                    title="US Warehouse"
                    link="US WAREHOUSE"
                    count={data.warehouse_us ?? 0}
                    icon={<HomeModernIcon className="h-10 text-white" />}
                />
            </div>

            <div className="text-3xl font-black my-8">Others</div>
            <div className=" grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                {/* <CurtisCardsComponent
                    title="RMA Request"
                    count="100"
                    icon={<ArrowsRightLeftIcon className="h-10 text-white" />}
                />

                <CurtisCardsComponent
                    title="Incomplete Information"
                    count="100"
                    icon={<IdentificationIcon className="h-10 text-white" />}
                />

                <CurtisCardsComponent
                    title="Direct Emails"
                    count="100"
                    icon={<EnvelopeIcon className="h-10 text-white" />}
                /> */}

                <CurtisCardsComponent
                    title="Authorized Service Center"
                    count={data.asc ?? 0}
                    link="REPAIR"
                    icon={<DocumentCheckIcon className="h-10 text-white" />}
                />
                <CurtisCardsComponent
                    title="Repair Unsuccessful"
                    link="REPAIR UNSUCCESSFUL"
                    count={data.repair_unsuccessful ?? 0}
                    icon={<CheckBadgeIcon className="h-10 text-white" />}
                />
            </div>
        </div>
    );
}

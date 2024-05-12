import React, { useEffect, useState } from "react";
import CustomerCardsComponent from "../components/customer-cards-component";
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

export default function CustomerCardsSection({ account }) {
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
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                <CustomerCardsComponent
                    title="Pending"
                    link="PENDING"
                    count={data.pending??0}
                    icon={<ListBulletIcon className="h-10 text-white" />}
                />
                <CustomerCardsComponent
                    title="Processed"
                    link="PROCESSED"
                    count={data.process??0}
                    icon={
                        <AdjustmentsHorizontalIcon className="h-10 text-white" />
                    }
                />
                <CustomerCardsComponent
                    title="Closed"
                    link="CLOSED"
                    count={data.closed??0}
                    icon={
                        <ArchiveBoxArrowDownIcon className="h-10 text-white" />
                    }
                />
            </div>
        </div>
    );
}

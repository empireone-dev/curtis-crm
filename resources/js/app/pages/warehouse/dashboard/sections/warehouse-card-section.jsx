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
import { warehouse_dashboard_service } from "@/app/services/dashboard-service";
import WarehouseCardsComponent from "../components/warehouse-card-component";

export default function WarehouseCardsSection({ account }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function get_dashboard(params) {
            const res = await warehouse_dashboard_service(account.country);
            setData(res);
        }
        get_dashboard();
    }, []);
    
    return (
        <div className="mt-12 mr-3">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                <WarehouseCardsComponent
                    title="Assigned Ticket"
                    link=""
                    count={data.assigned??0}
                    icon={<ListBulletIcon className="h-10 text-white" />}
                />
            </div>
        </div>
    );
}

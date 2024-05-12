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
import ASCCardsComponent from "../components/asc-card-component";
import { asc_dashboard_service } from "@/app/services/dashboard-service";

export default function ASCCardsSection({ account }) {
    const [data, setData] = useState([]);

    useEffect(()=>{
        async function get_asc_dashboard(params) {
         const res = await asc_dashboard_service(account.id)
         setData(res)
        }
        get_asc_dashboard()
      },[])
    return (
        <div className="mt-12 mr-3">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                <ASCCardsComponent
                    title="Assigned Ticket"
                    link="REPAIR"
                    count={data.assigned??0}
                    icon={<ListBulletIcon className="h-10 text-white" />}
                />
                <ASCCardsComponent
                    title="Successful Repairs"
                    link="REPAIRED"
                    count={data.repaired??0}
                    icon={<ListBulletIcon className="h-10 text-white" />}
                />
                <ASCCardsComponent
                    title="Unsuccessful Repairs"
                    link="NOT REPAIRED"
                    count={data.notrepaired??0}
                    icon={<ListBulletIcon className="h-10 text-white" />}
                />
            </div>
        </div>
    );
}

import React, { useState } from "react";
import LayoutSidebarListComponent from "../../components/layout-sidebar-list-component";
import {
    BriefcaseIcon,
    ClipboardDocumentIcon,
    CloudArrowDownIcon,
    CloudArrowUpIcon,
    ExclamationTriangleIcon,
    HomeIcon,
    InboxArrowDownIcon,
    KeyIcon,
    PuzzlePieceIcon,
    ReceiptPercentIcon,
    ShoppingCartIcon,
    TicketIcon,
    UserCircleIcon,
    UserGroupIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

export default function AgentLayoutSidebarSection({ account }) {
    // State to track whether the sidebar is open or closed

    return (
        <>
            <div className="h-screen flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
                <div className="flex flex-col left-0 w-64 bg-white h-screen border-r">
                    <div className="flex bg-blue-600 text-white items-center justify-center h-14 border-b">
                        <div>Hi! {account.name}</div>
                    </div>
                    <div className="overflow-y-auto overflow-x-hidden flex-grow">
                        <ul className="flex flex-col py-4 space-y-1">
                   
                            <LayoutSidebarListComponent
                                account={account}
                                name="Dashboard"
                                icon={<HomeIcon className="h-6" />}
                                href={"dashboard"}
                            />

                            <LayoutSidebarListComponent
                                account={account}
                                name="Tickets"
                                icon={<TicketIcon className="h-6" />}
                                href={"tickets"}
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

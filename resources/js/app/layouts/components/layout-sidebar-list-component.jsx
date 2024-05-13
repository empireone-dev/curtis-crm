import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function LayoutSidebarListComponent({
    account,
    name,
    icon,
    href,
}) {
    const { component } = usePage();
    const path = component.split("/")[1];
    //  const routing = account.role_id == 1?
    function loginAccount() {
        if (account?.role_id == 1) {
            return "";
        } else if (account?.role_id == 2) {
            return "customer.";
        } else if (account?.role_id == 3) {
            return "warehouse.";
        } else if (account?.role_id == 4) {
            return "asc.";
        }else if (account?.role_id == 5) {
            return "agent.";
        }else if (account?.role_id == 6) {
            return "curtis.";
        } else {
            return "";
        }
    }
    return (
        <Link href={route(loginAccount() + href)}>
            <li
                className={`focus:outline-none  text-gray-600 ${
                    path == href
                        ? "border-blue-500 bg-blue-200"
                        : "hover:border-blue-300 hover:text-gray-800 hover:bg-gray-200  border-transparent"
                }  border-l-4  pr-6`}
            >
                <button className="mx-2 relative flex flex-row items-center h-11 ">
                    {icon}
                    <span className="ml-2 text-sm tracking-wide truncate">
                        {name}
                    </span>
                </button>
            </li>
        </Link>
    );
}

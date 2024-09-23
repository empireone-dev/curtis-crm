import React from "react";
import { useState } from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild,
} from "@headlessui/react";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "../redux/app-slice";
import { Link, router } from "@inertiajs/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ navigation }) {
    const dispatch = useDispatch();
    const { sidebarOpen } = useSelector((state) => state.app);
    const path = window.location.pathname.split("/")[2];
    const path2 = window.location.pathname.split("/")[1];
    // const [sidebarOpen, setSidebarOpen] = useState(false)

    const teams = [
        { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
        {
            id: 2,
            name: "Tailwind Labs",
            href: "#",
            initial: "T",
            current: false,
        },
        { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
    ];

    function close_sidebar(params) {
        dispatch(setSidebarOpen());
    }
    return (
        <>
            <Dialog
                open={sidebarOpen}
                onClose={close_sidebar}
                className="relative z-0 lg:hidden"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 flex">
                    <DialogPanel
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                    >
                        <TransitionChild>
                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                <button
                                    type="button"
                                    onClick={() =>
                                        dispatch(setSidebarOpen(false))
                                    }
                                    className="-m-2.5 p-2.5"
                                >
                                    <span className="sr-only">
                                        Close sidebar
                                    </span>
                                    <XMarkIcon
                                        aria-hidden="true"
                                        className="h-6 w-6 text-white"
                                    />
                                </button>
                            </div>
                        </TransitionChild>
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul
                                    role="list"
                                    className="flex flex-1 flex-col gap-y-7"
                                >
                                    <li>
                                        <ul
                                            role="list"
                                            className="-mx-2 space-y-1"
                                        >
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? "bg-gray-50 text-indigo-600"
                                                                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                                        )}
                                                    >
                                                        <item.icon
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                item.current
                                                                    ? "text-indigo-600"
                                                                    : "text-black group-hover:text-indigo-600",
                                                                "h-6 w-6 shrink-0"
                                                            )}
                                                        />
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li>
                                        <div className="text-xs font-semibold leading-6 text-gray-400">
                                            Your teams
                                        </div>
                                        <ul
                                            role="list"
                                            className="-mx-2 mt-2 space-y-1"
                                        >
                                            {teams.map((team) => (
                                                <li key={team.name}>
                                                    <a
                                                        href={team.href}
                                                        className={classNames(
                                                            team.current
                                                                ? "bg-gray-50 text-indigo-600"
                                                                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                                        )}
                                                    >
                                                        <span
                                                            className={classNames(
                                                                team.current
                                                                    ? "border-indigo-600 text-indigo-600"
                                                                    : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                                                "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                                                            )}
                                                        >
                                                            {team.initial}
                                                        </span>
                                                        <span className="truncate">
                                                            {team.name}
                                                        </span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="mt-auto">
                                        <a
                                            href="#"
                                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                        >
                                            <Cog6ToothIcon
                                                aria-hidden="true"
                                                className="h-6 w-6 shrink-0 text-black group-hover:text-indigo-600"
                                            />
                                            Settings
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <div className="hidden lg:fixed lg:inset-y-0 lg:z-0 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-blue-200 px-6 pb-4">
                    <div className="flex flex-shrink-0 items-center">
                        <div className="flex flex-1 ">
                            <div className="mt-2">
                                <img src="/images/new logo.png" className="w-40" />
                            </div>
                            <div className="mt-3">
                                <img src="/images/vline.png" className="h-14" />
                            </div>
                            <div className="mt-3">
                                <img src="/images/logoIT.png" className="h-14" alt="" />
                            </div>
                        </div>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7"
                        >
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => {
                                        return (
                                            <li key={item.name}>
                                                <button
                                                    onClick={() =>
                                                        router.visit(item.href)
                                                    }
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-gray-200 text-indigo-600 w-full"
                                                            : "text-gray-700 hover:bg-gray-100 w-full hover:text-indigo-600",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                                    )}
                                                >
                                                    <item.icon
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            item.current
                                                                ? "text-indigo-600"
                                                                : "text-black group-hover:text-indigo-600",
                                                            "h-6 w-6 shrink-0"
                                                        )}
                                                    />
                                                    {item.name}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                            {path2 == "admin" && (
                                <li className="mt-auto">
                                    <Link
                                        href="/admin/settings"
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                    >
                                        <Cog6ToothIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 shrink-0 text-black group-hover:text-indigo-600"
                                        />
                                        Settings
                                    </Link>
                                </li>
                            )}

                            {path == "it" && path2 !== "admin" && (
                                <li className="mt-auto">
                                    <Link
                                        href="/employee/it/settings"
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                    >
                                        <Cog6ToothIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 shrink-0 text-black group-hover:text-indigo-600"
                                        />
                                        Settings
                                    </Link>
                                </li>
                            )}
                            {path == "users" && path2 !== "admin" && (
                                <li className="mt-auto">
                                    <Link
                                        href="/employee/users/settings"
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                    >
                                        <Cog6ToothIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 shrink-0 text-black group-hover:text-indigo-600"
                                        />
                                        Settings
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

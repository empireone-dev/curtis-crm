import Input from "@/app/layouts/components/input";
import Modal from "@/app/layouts/components/modal";
import {
    get_tickets_service,
    search_lookup_tickets_service,
} from "@/app/services/tickets-service";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function SearchTicketSection() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState({});
    const [data, setData] = useState([]);
    const { user } = useSelector((state) => state.app);
    const [random, setRandom] = useState(null);
    async function search_ticket(e) {
        e.preventDefault();
        const res = await search_lookup_tickets_service(search);
        setData(res);
        setRandom(Math.random());
    }

    function moveToSearch(value) {
        if (user.role_id == 1) {
            router.visit("/administrator/tickets?search=" + value);
        }else if (user.role_id == 3) {
            router.visit("/warehouse/tickets?search=" + value);
        }  else if (user.role_id == 6) {
            router.visit("/curtis/tickets?search=" + value);
        } else {
            router.visit("/agent/tickets?search=" + value);
        }
    }

    function create_ticket(params) {
        if (user.role_id == 5) {
            window.location.href = "/agent/tickets/create";
        } else if (user.role_id == 1) {
            window.location.href = "/administrator/tickets/create";
        }
    }
 

    function formatPhoneNumber(value) {
        const cleaned = ("" + value).replace(/\D/g, "");
        let numberToFormat = cleaned;
        if (cleaned.length === 11) {
            numberToFormat = cleaned.slice(0, -1);
        }
        if (numberToFormat.length === 10) {
            return numberToFormat.replace(
                /(\d{3})(\d{3})(\d{4})/,
                "($1) $2-$3"
            );
        }
        return value; 
    }
    
    return (
        <div>
            <div>
                <button
                    onClick={() => setOpen(true)}
                    className="text-blue-400 flex items-center justify-center transition-colors duration-200 rounded-full bg-blue-50 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:bg-blue-100 focus:ring-blue-800"
                >
                    <MagnifyingGlassCircleIcon className="h-12 flex items-center justify-center" />
                    &nbsp;
                </button>
            </div>
            <Modal
                width="max-w-7xl"
                position="items-start"
                setOpen={setOpen}
                open={open}
                title="Lookup Ticket"
            >
                <form
                    onSubmit={search_ticket}
                    className="flex flex-col gap-4 w-full"
                >
                    <div className="flex w-full gap-5">
                        <Input
                            type="text"
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    ticket_id: e,
                                })
                            }
                            label="Case File #"
                            value={search?.ticket_id ?? ""}
                            name="ticket_id"
                        />
                    </div>

                    <div className="flex w-full gap-5">
                        <Input
                            type="phone"
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    phone: formatPhoneNumber(e),
                                })
                            }
                            label="Phone"
                            value={search?.phone ?? ""}
                            name="phone"
                        />
                        <Input
                            type="text"
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    email: e,
                                })
                            }
                            label="Email"
                            value={search?.email ?? ""}
                            name="email"
                        />
                    </div>
                    <div className="flex w-full gap-5">
                        <Input
                            type="text"
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    serial_number: e,
                                })
                            }
                            label="Serial #"
                            value={search?.serial_number ?? ""}
                            name="serial_number"
                        />
                        <Input
                            type="text"
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    item_number: e,
                                })
                            }
                            label="Model"
                            value={search?.item_number ?? ""}
                            name="item_number"
                        />
                    </div>
                    <div className="flex w-full gap-5">
                        <Input
                            type="text"
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    fname: e,
                                })
                            }
                            label="First Name"
                            value={search?.fname ?? ""}
                            name="fname"
                        />
                        <Input
                            type="text"
                            onChange={(e) =>
                                setSearch({
                                    ...search,
                                    lname: e,
                                })
                            }
                            label="Last Name"
                            value={search?.lname ?? ""}
                            name="lname"
                        />
                    </div>

                    <div className="bg-gray-50 sm:flex sm:flex-row-reverse ">
                        <button
                            type="Submit"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        >
                            Search
                        </button>
                        <button
                            type="button"
                            // search-autofocus
                            onClick={() => setIsModalOpen(false)}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                <div className="py-4 flex justify-center">
                    <table className="w-full text-md mb-4">
                        <tbody>
                            <tr className="border-b">
                                <th className="text-left p-3 px-5">
                                    Ticket ID
                                </th>
                                <th className="text-left p-3 px-5">Email</th>
                                <th className="text-left p-3 px-5">Phone</th>
                                <th className="text-left p-3 px-5">Fullname</th>
                                <th className="text-left p-3 px-5">
                                    Resolution
                                </th>
                                <th className="text-left p-3 px-5">Issue</th>
                                <th className="text-left p-3 px-5">Action</th>
                            </tr>
                            {data.length == 0 &&
                                search !== "" &&
                                random !== null && (
                                    <>
                                        <div className="text-red-500 font-black">
                                            No Record Found.
                                        </div>
                                        <div className="my-8">
                                            <div className=" flex items-start justify-start">
                                                <button
                                                    onClick={() =>
                                                        create_ticket()
                                                    }
                                                    className="p-3 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
                                                >
                                                    CREATE TICKET
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            {data.map((res, index) => (
                                <tr
                                    key={index}
                                    className={`border-b hover:bg-blue-100 `}
                                >
                                    <td className="p-3 px-5">
                                        {res.ticket_id}
                                    </td>
                                    <td className="p-3 px-5">{res.email}</td>
                                    <td className="p-3 px-5">{res.phone}</td>
                                    <td className="p-3 px-5">
                                        {res.fname} {res.lname}
                                    </td>
                                    <td className="p-3 px-5">
                                        {res.call_type}
                                    </td>
                                    <td className="p-3 px-5">
                                        {JSON.parse(res.issue).map((res, i) => (
                                            <div key={i}>{res}</div>
                                        ))}
                                    </td>
                                    <td className="p-3 px-5">
                                        <button
                                            onClick={() =>
                                                moveToSearch(res.ticket_id)
                                            }
                                        >
                                            <ArrowTopRightOnSquareIcon className="h-6 text-blue-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </div>
    );
}

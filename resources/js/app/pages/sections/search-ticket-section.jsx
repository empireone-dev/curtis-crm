import Modal from "@/app/layouts/components/modal";
import { get_tickets_service } from "@/app/services/tickets-service";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function SearchTicketSection() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const { user } = useSelector((state) => state.app);

    async function search_ticket(e) {
        e.preventDefault();
        const res = await get_tickets_service(`?search=${search}`);
        setData(res.data);
    }

    function moveToSearch(value) {
        if (user.role_id == 1) {
            router.visit("/administrator/tickets?search=" + value);
        } else if (user.role_id == 6) {
            router.visit("/curtis/tickets?search=" + value);
        } else {
            router.visit("/agent/tickets?search=" + value);
        }
    }
    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                className="text-blue-400 transition-colors duration-200 rounded-full bg-blue-50 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:bg-blue-100 focus:ring-blue-800"
            >
                <MagnifyingGlassCircleIcon className="h-12" />
            </button>
            <Modal
                width="max-w-7xl"
                position="items-start"
                setOpen={setOpen}
                open={open}
                title="Lookup Ticket"
            >
                <form
                    onSubmit={search_ticket}
                    className="pt-2 relative mx-auto w-full text-gray-600"
                >
                    <input
                        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
                        type="text"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                    />
                    <button
                        type="submit"
                        className="absolute right-0 top-0 mt-5 mr-4"
                    >
                        <svg
                            className="text-gray-600 h-4 w-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            id="Capa_1"
                            x="0px"
                            y="0px"
                            viewBox="0 0 56.966 56.966"
                            style={{
                                enableBackground: "new 0 0 56.966 56.966",
                            }}
                            xmlSpace="preserve"
                            width="512px"
                            height="512px"
                        >
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </button>
                </form>
                <div className="py-4 flex justify-center">
                    <table className="w-full text-md mb-4">
                        <tbody>
                            <tr className="border-b">
                                <th className="text-left p-3 px-5">
                                    Ticket ID
                                </th>
                                <th className="text-left p-3 px-5">Email</th>
                                <th className="text-left p-3 px-5">Fullname</th>
                                <th className="text-left p-3 px-5">
                                    Resolution
                                </th>
                                <th className="text-left p-3 px-5">Issue</th>
                                <th className="text-left p-3 px-5">Action</th>
                            </tr>
                            {data.map((res, index) => (
                                <tr
                                    key={index}
                                    className={`border-b hover:bg-blue-100 `}
                                >
                                    <td className="p-3 px-5">
                                        {res.ticket_id}
                                    </td>
                                    <td className="p-3 px-5">{res.email}</td>
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

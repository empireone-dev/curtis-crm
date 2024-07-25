import Textarea from "@/app/layouts/components/textarea";
import { patch_warranty_checkque_shipped_service } from "@/app/services/refund-service";
import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/app/store/store";
import Input from "@/app/layouts/components/input";
import Loading from "@/app/layouts/components/loading";
import { setTicket } from "../../../../_redux/tickets-slice";
import { parts_replacement_not_shipped_service, parts_replacement_shipped_service } from "@/app/services/replacement-service";
import moment from "moment";
import routing from "../../../components/routing";

export default function ContentReplacementPartsForm() {
    const { internals, ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app);
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const dispatch = useDispatch();
    const [form, setForm] = useState({});

    useEffect(() => {
        setForm({
            ...ticket,
            ...(ticket.receipt ?? {}),
            ...(ticket.refund ?? {}),
            notes: ticket?.replacement?.notes ?? "",
            tracking: ticket?.replacement?.tracking ?? "",
            ticket_id: ticket.id,
        });
    }, [ticket]);

    function formHandler(value, name) {
        setForm({
            ...form,
            [name]: value,
        });
    }

    async function process_ticket_handler() {
        if (confirm("Are you sure you want to shipped the ticket?")) {
            setIsLoading1(true);
            try {
                const result = await parts_replacement_shipped_service({
                    ...form,
                    internals,
                    account: user,
                    status: "PARTS PROCESSED TICKET",
                    activity_status: "PARTS REPLACEMENT SHIPPED",
                });
                console.log('result',result)
                router.visit(routing("files"));
                // dispatch(setTicket(result.status));
                // setIsLoading1(false);
                // router.visit(routing("files"));
                // window.location.href=routing("files")
            } catch (error) {
                router.visit(routing("files"));
                setIsLoading1(false);
            }
        }
    }

    async function not_shipped_handler() {
        if (confirm(`Are you sure you want to move in parts replacement?`)) {
            setIsLoading2(true);
            try {
                await parts_replacement_not_shipped_service({
                    internals,
                    ...form,
                    account: user,
                    status: "REPLACEMENT PARTS",
                    activity_status: "PARTS REPLACEMENT NOT SHIPPED",
                })
                setIsLoading2(false);
                router.visit(routing("replacement_parts"));
            } catch (error) {
                setIsLoading2(true);
            }
        }
    }

    return (
        <div className="bg-white h-full px-3">
            <div className="flex flex-col mt-6 ">
                <div>
                    <div className="w-full py-2">
                        <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead className="">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left "
                                        >
                                            <button className="flex items-center gap-x-3 focus:outline-none">
                                                <span>Name</span>
                                            </button>
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left "
                                        >
                                            Part Number
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left "
                                        >
                                            Location
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left "
                                        >
                                            Cost
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left "
                                        >
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 ">
                                    {internals.map((res, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div>
                                                        <h2 className="font-medium text-gray-800">
                                                            {res.name}
                                                        </h2>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                    <div className="inline  py-1 text-sm font-normal rounded-full">
                                                        {res.part_number}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h4 className="text-gray-700 ">
                                                            {res.location}
                                                        </h4>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h4 className="text-gray-700 ">
                                                            {res.cost}
                                                        </h4>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div>
                                                        <h4 className="text-gray-700 ">
                                                            {res.status}
                                                        </h4>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3 w-full">
                <h1 className="mt-2">Parts Internal Remarks/Notes:</h1>
                <Textarea
                    disabled={true}
                    value={ticket.validation_notes}
                    type="text"
                    className="w-full"
                />
            </div>
            <div className="mt-3 w-full">
                <h1>Updates from Curtis Notes:</h1>
                <Textarea
                    type="text"
                    disabled={true}
                    value={ticket.internal_notes}
                    className="w-full"
                />
            </div>
            <div className="mt-5 my-4 w-full">
                <div className="my-2 flex flex-col">
                    Date: {form.ship_date ?? ""}
                    <input
                        type="date"
                        className="w-52"
                        name="ship_date"
                        pattern="\d{1,2}/\d{1,2}/\d{4}"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                ship_date: moment(e.target.value).format("L"),
                            })
                        }
                    />
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                    <Input
                        onChange={formHandler}
                        name="unit"
                        span=""
                        required={true}
                        value={String(form.unit ?? " ")}
                        label="Unit"
                        type="text"
                        errorMessage="Unit is required"
                    />
                    <Input
                        onChange={formHandler}
                        name="brand"
                        span=""
                        required={true}
                        value={String(form.brand ?? " ")}
                        label="Brand"
                        type="text"
                        errorMessage="Brand is required"
                    />
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <Input
                        onChange={formHandler}
                        name="model"
                        span=""
                        required={true}
                        value={String(form.item_number ?? " ")}
                        label="model"
                        type="text"
                        errorMessage="model is required"
                    />
                    <Input
                        onChange={formHandler}
                        name="serial_number"
                        span=""
                        required={true}
                        value={String(form.serial_number ?? " ")}
                        label="Serial"
                        type="text"
                        errorMessage="Serial is required"
                    />

                    <Input
                        onChange={formHandler}
                        name="tracking"
                        span=""
                        required={true}
                        value={String(form.tracking ?? " ")}
                        label="Tracking"
                        type="text"
                        errorMessage="Tracking is required"
                    />
                </div>

                <div className="px-4 py-2 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0">
                    <Textarea
                        required={true}
                        onChange={formHandler}
                        name="notes"
                        value={String(form.notes ?? " ")}
                        label="Resource Notes:"
                        type="text"
                        errorMessage="notes is required"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        disabled={isLoading1}
                        onClick={process_ticket_handler}
                        type="button"
                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 "
                    >
                        {isLoading1 ? <Loading /> : "REPLACEMENT SHIPPED"}
                    </button>
                    <button
                        onClick={not_shipped_handler}
                        type="button"
                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 "
                    >
                        {isLoading2 ? <Loading /> : "REPLACEMENT NOT SHIPPED"}
                    </button>
                </div>
            </div>
        </div>
    );
}

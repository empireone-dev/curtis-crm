import Input from "@/app/layouts/components/input";
import Select from "@/app/layouts/components/select";
import Textarea from "@/app/layouts/components/textarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAsc, setRepair } from "../../../../_redux/tickets-slice";
import { get_user_by_role_service } from "@/app/services/user-service";

export default function RepairSection() {
    const { repair, asc,ticket } = useSelector((state) => state.tickets);
    const dispatch = useDispatch()

    function formHandler(value, name) {
        dispatch(setRepair({
            ...repair,
            [name]: value,
        }))
    }

    useEffect(() => {
        async function get_user_role() {
            const res = await get_user_by_role_service(4)
            dispatch(setAsc(res.data))
        }
        get_user_role()
    }, []);

    return (
        <>
            <div className=" my-3">
                <a
                    href={`/administrator/google_map/`+ticket.id}
                    target="_blank"
                    className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                    OPEN ASC
                </a>
            </div>
            <section className="container border-2 Fborder-slate-400 bg-white">
                <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-900/10">
                    <div className="w-full flex justify-center">
                        <div className="flex items-center gap-x-3 mt-4 my-4 ">
                            <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  ">
                                REPAIR
                            </h1>
                        </div>
                    </div>
                </div>
                <form className="container px-4 mx-auto">
                    <div className="mt-4 mb-4 grid grid-cols-1 gap-x-6 gap-y-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 flex-1">
                            <Select
                                onChange={formHandler}
                                name="asc"
                                required={false}
                                value={repair.asc ?? ""}
                                label="Select ASC"
                                errorMessage=""
                                data={[
                                    {
                                        value: '',
                                        name: ''
                                    },
                                    ...asc?.map(res => ({
                                        value: res.id,
                                        name: res.name
                                    }))
                                ]}
                            />
                            <Input
                                onChange={formHandler}
                                name="repair_cost"
                                span="$"
                                required={true}
                                value={repair.repair_cost}
                                label="Repair Cost"
                                type="text"
                                errorMessage="Repair Cost is required"
                            />
                            <Select
                                onChange={formHandler}
                                name="instruction"
                                required={false}
                                value={repair.instruction ?? ""}
                                label="Warranty Instruction"
                                errorMessage=""
                                data={[
                                    {
                                        value: "",
                                        name: "",
                                    },
                                    {
                                        value: "warehouse",
                                        name: "Return to warehouse Canada",
                                    },
                                    {
                                        value: "home",
                                        name: "Destroy in Home",
                                    },
                                    {
                                        value: "asc",
                                        name: "Refer to ASC",
                                    },
                                ]}
                            />

                            <Textarea
                                required={true}
                                onChange={formHandler}
                                name="notes"
                                value={repair.notes ?? " "}
                                label="Notes"
                                type="text"
                                errorMessage="Notes is required"
                            />
                        </div>
                    </div>

                    <div className="mb-2 mt-4 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

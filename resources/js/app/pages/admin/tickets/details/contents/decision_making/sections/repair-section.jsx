import Input from "@/app/layouts/components/input";
import Select from "@/app/layouts/components/select";
import Textarea from "@/app/layouts/components/textarea";
import React, { useState } from "react";

export default function RepairSection() {
    const [form, setForm] = useState({});

    function formHandler(value, name) {
        setForm({
            ...form,
            [name]: value,
        });
    }

    return (
        <>
            <section className="container border-2 border-slate-400">
                <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-900/10">
                    <div className="w-full flex justify-center">
                        <div className="flex items-center gap-x-3 mt-4 my-4 ">
                            <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
                                REPAIR
                            </h1>
                        </div>
                    </div>
                </div>
                <form className="container px-4 mx-auto">
                    <div className="mt-4 mb-4 grid grid-cols-1 gap-x-6 gap-y-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 flex-1">
                            <Input
                                onChange={formHandler}
                                name="asc"
                                required={true}
                                value={form.asc}
                                label="ASC"
                                type="text"
                                errorMessage="ASC is required"
                            />
                            <Input
                                onChange={formHandler}
                                name="repair_cost"
                                required={true}
                                value={form.repair_cost}
                                label="Repair Cost"
                                type="text"
                                errorMessage="Repair Cost is required"
                            />
                            <Select
                                onChange={formHandler}
                                name="instruction"
                                required={false}
                                value={form.instruction ?? ""}
                                label="Warranty Instruction"
                                errorMessage=""
                                data={[
                                    {
                                        value: "",
                                        name: "",
                                    },
                                    {
                                        value: "warehouse",
                                        name: "Return to warehouse(the US or CANADA)",
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
                                value={form.notes ?? " "}
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

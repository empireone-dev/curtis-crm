import Input from "@/app/layouts/components/input";
import Select from "@/app/layouts/components/select";
import Textarea from "@/app/layouts/components/textarea";
import { GlobeAmericasIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

export default function ReplacementSection() {
    const [form, setForm] = useState({});

    function formHandler(value, name) {
        setForm({
            ...form,
            [name]: value,
        });
    }
    return (
        <>
            <section className="container border-2 border-slate-400  p-4">
                <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-900/10">
                    <div className="w-full flex justify-center">
                        <div className="flex items-center gap-x-3 mt-4 my-4">
                            <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
                                REPLACEMENT
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <Input
                        onChange={formHandler}
                        name="unit_cost"
                        required={true}
                        value={form.unit_cost}
                        label="Cost of Unit"
                        type="text"
                        errorMessage="Cost of Unit is required"
                    />
                    <Input
                        onChange={formHandler}
                        name="cube_weight"
                        required={true}
                        value={form.cube_weight}
                        label="Cube Weight"
                        type="text"
                        errorMessage="Cube Weight is required"
                    />
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Dimension
                    </h2>
                    <div className="flex gap-3">
                        <Input
                            onChange={formHandler}
                            name="length"
                            required={true}
                            value={form.length}
                            label="Length"
                            type="text"
                            errorMessage="Length is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="width"
                            required={true}
                            value={form.width}
                            label="Width"
                            type="text"
                            errorMessage="Width is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="height"
                            required={true}
                            value={form.height}
                            label="Height"
                            type="text"
                            errorMessage="Height is required"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            className="w-96 bg-transparent py-2 hover:bg-blue-50 text-blue-700 font-semibold px-4 border border-blue-500 rounded w-lg  shadow-sm shadow-black"
                        >
                            GET FEDEX RATES
                        </button>
                        <Input
                            onChange={formHandler}
                            name="shipping_cost"
                            required={true}
                            value={form.shipping_cost}
                            label="Shipping Cost"
                            type="text"
                            errorMessage="Shipping Cost is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="estimate_cost"
                            required={true}
                            value={form.estimate_cost}
                            label="Estimated Cost"
                            type="text"
                            errorMessage="Estimated Cost is required"
                        />
                    </div>
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
                    <div className="mb-2 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-sm bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

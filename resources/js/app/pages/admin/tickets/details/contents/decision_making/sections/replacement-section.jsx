import Input from "@/app/layouts/components/input";
import Loading from "@/app/layouts/components/loading";
import Select from "@/app/layouts/components/select";
import Textarea from "@/app/layouts/components/textarea";
import { get_fedex_rate_service } from "@/app/services/fedex-rate-service";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReplacement, setTicket } from "../../../../_redux/tickets-slice";

export default function ReplacementSection() {
    const { replacement } = useSelector((state) => state.tickets);
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()


    function formHandler(value, name) {
        dispatch(setReplacement({
            ...replacement,
            [name]: value,
        }))
    }


    async function get_fedex_rate() {
        setIsLoading(true)
        try {
            const result = await get_fedex_rate_service(replacement)
            dispatch(setReplacement({
                ...replacement,
                shipping_cost: `${parseFloat(result.rates.FEDEX_GROUND.PAYOR_ACCOUNT_PACKAGE).toFixed(2)}`,
                estimated_cost: `${(parseFloat(result.rates.FEDEX_GROUND.PAYOR_ACCOUNT_PACKAGE) + parseFloat(replacement.cost)).toFixed(2)}`
            }))
        } catch (error) {
            alert('No rates Found!')
        }
        setIsLoading(false)
    }
    return (
        <>
            <section className="container border-2 border-slate-400  p-4 bg-white">
                <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-900/10">
                    <div className="w-full flex justify-center">
                        <div className="flex items-center gap-x-3 mt-4 my-4">
                            <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  ">
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
                        value={replacement?.cost ?? '0'}
                        label="Cost of Unit"
                        type="text"
                        errorMessage="Cost of Unit is required"
                    />
                    <Input
                        onChange={formHandler}
                        name="cube_weight"
                        required={true}
                        value={replacement?.cubed_weight ?? '0'}
                        label="Cube Weight"
                        type="number"
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
                            value={replacement?.length ?? '0'}
                            label="Length"
                            type="number"
                            errorMessage="Length is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="width"
                            required={true}
                            value={replacement?.width ?? '0'}
                            label="Width"
                            type="number"
                            errorMessage="Width is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="height"
                            required={true}
                            value={replacement?.height ?? '0'}
                            label="Height"
                            type="number"
                            errorMessage="Height is required"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={get_fedex_rate}
                            type="button"
                            className={`w-96 flex items-center justify-center mr-12 py-2 ${isLoading ? 'bg-blue-500' : ' bg-transparent  hover:bg-blue-50'}  text-blue-700 font-semibold px-4 border border-blue-500 rounded w-lg  shadow-sm shadow-black`}
                        >
                            {
                                isLoading ? <Loading /> : 'GET FEDEX RATES'
                            }
                        </button>
                        <Input
                            onChange={formHandler}
                            name="shipping_cost"
                            required={true}
                            value={replacement?.shipping_cost ?? '0'}
                            label="Shipping Cost"
                            type="number"
                            errorMessage="Shipping Cost is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="estimated_cost"
                            required={true}
                            value={replacement?.estimated_cost ?? '0'}
                            label="Estimated Cost"
                            type="number"
                            errorMessage="Estimated Cost is required"
                        />
                    </div>
                    <Select
                        onChange={formHandler}
                        name="instruction"
                        required={false}
                        value={replacement.instruction ?? ""}
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
                        value={replacement.notes ?? ""}
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

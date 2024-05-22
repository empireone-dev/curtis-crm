import Input from "@/app/layouts/components/input";
import Loading from "@/app/layouts/components/loading";
import Select from "@/app/layouts/components/select";
import Textarea from "@/app/layouts/components/textarea";
import { get_fedex_rate_service } from "@/app/services/fedex-rate-service";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setReplacement,
    setSelectedTemplate,
    setTicket,
} from "../../../../_redux/tickets-slice";
import Wysiwyg from "@/app/layouts/components/wysiwyg";
import {
    get_decision_making_replacement_by_id_service,
    store_decision_making_replacement_service,
} from "@/app/services/replacement-service";
import { router } from "@inertiajs/react";
import routing from "../../../components/routing";

export default function ReplacementSection() {
    const { replacement } = useSelector((state) => state.tickets);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const dispatch = useDispatch();
    const { email_templates } = useSelector((state) => state.email_templates);

    useEffect(() => {
        async function fetData() {
            const replacementExist =
                await get_decision_making_replacement_by_id_service(
                    replacement.id
                );
            dispatch(
                setReplacement({
                    ...replacement,
                    instruction: replacementExist?.instruction ?? " ",
                    notes: replacementExist?.notes ?? " ",
                    shipping_cost: replacementExist?.shipping_cost ?? 0,
                    estimated_cost: replacementExist?.estimated_cost ?? 0,
                    template_text: " ",
                })
            );
        }
        fetData();
    }, []);

    function formHandler(value, name) {
        if (name == "wysiwyg") {
            dispatch(
                setReplacement({
                    ...replacement,
                    template_text: value,
                })
            );
        } else {
            if ((value || value == "") && name) {
                dispatch(
                    setReplacement({
                        ...replacement,
                        [name]: value,
                    })
                );
            }
        }
    }
    function formHandlerTemplates(value) {
        const findTemplates = email_templates.find((res) => res.id == value);
        dispatch(
            setReplacement({
                ...replacement,
                template_text: findTemplates.template_text,
            })
        );
    }

    async function get_fedex_rate() {
        setIsLoading(true);
        try {
            const result = await get_fedex_rate_service(replacement);
            dispatch(
                setReplacement({
                    ...replacement,
                    shipping_cost: `${parseFloat(
                        result.rates.FEDEX_GROUND.PAYOR_ACCOUNT_PACKAGE
                    ).toFixed(2)}`,
                    estimated_cost: `${(
                        parseFloat(
                            result.rates.FEDEX_GROUND.PAYOR_ACCOUNT_PACKAGE
                        ) + parseFloat(replacement.unit_cost)
                    ).toFixed(2)}`,
                })
            );
        } catch (error) {
            alert("No rates Found!");
        }
        setIsLoading(false);
    }

    async function submitFormhandler(e) {
        e.preventDefault();
        setIsLoading2(true);
        try {
            const result = await store_decision_making_replacement_service({
                ...replacement,
                decision_status: "REPLACEMENT",
            });
            dispatch(setTicket(result.status));
            setIsLoading2(false);
            if (
                replacement.instruction == "US Warehouse" ||
                replacement.instruction == "CA Warehouse"
            ) {
                router.visit(routing("warehouse"));
            } else {
                router.visit(routing("refund"));
            }
        } catch (error) {
            setIsLoading2(false);
        }
    }
    return (
        <>
            <form
                onSubmit={submitFormhandler}
                className="container border-2 border-slate-400  p-4 bg-white"
            >
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
                        span="$"
                        required={true}
                        value={replacement?.unit_cost ?? "0"}
                        label="Cost of Unit"
                        type="text"
                        errorMessage="Cost of Unit is required"
                    />
                    <Input
                        onChange={formHandler}
                        name="cubed_weight"
                        required={true}
                        value={replacement?.cubed_weight ?? "0"}
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
                            value={replacement?.length ?? "0"}
                            label="Length"
                            type="number"
                            errorMessage="Length is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="width"
                            required={true}
                            value={replacement?.width ?? "0"}
                            label="Width"
                            type="number"
                            errorMessage="Width is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="height"
                            required={true}
                            value={replacement?.height ?? "0"}
                            label="Height"
                            type="number"
                            errorMessage="Height is required"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={get_fedex_rate}
                            type="button"
                            className={`w-96 flex items-center justify-center mr-12 py-2 ${
                                isLoading
                                    ? "bg-blue-500"
                                    : " bg-transparent  hover:bg-blue-50"
                            }  text-blue-700 font-semibold px-4 border border-blue-500 rounded w-lg  shadow-sm shadow-black`}
                        >
                            {isLoading ? <Loading /> : "GET FEDEX RATES"}
                        </button>
                        <Input
                            onChange={formHandler}
                            name="shipping_cost"
                            span="$"
                            required={true}
                            value={String(replacement?.shipping_cost) ?? "0"}
                            label="Shipping Cost"
                            type="number"
                            errorMessage="Shipping Cost is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="estimated_cost"
                            span="$"
                            required={true}
                            value={String(replacement?.estimated_cost) ?? "0"}
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
                            ...(replacement.country === "CA"
                                ? [
                                      {
                                          value: "CA Warehouse",
                                          name: "Return to (CA Warehouse)",
                                      },
                                  ]
                                : []),
                            ...(replacement.country === "US"
                                ? [
                                      {
                                          value: "US Warehouse",
                                          name: "Return to (US Warehouse)",
                                      },
                                  ]
                                : []),
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

                    <Select
                        onChange={formHandlerTemplates}
                        name="email_template"
                        value=""
                        label="Email Templates"
                        errorMessage=""
                        data={email_templates.map((res) => ({
                            name: res.template_name,
                            value: res.id,
                        }))}
                    />
                    <Wysiwyg
                        label=""
                        name="wysiwyg"
                        value={replacement?.template_text ?? " "}
                        onChange={formHandler}
                    />
                    <div className="my-12">
                        <Textarea
                            required={true}
                            onChange={formHandler}
                            name="notes"
                            value={replacement.notes ?? " "}
                            label="Notes"
                            type="text"
                            errorMessage="Notes is required"
                        />
                    </div>

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
                            {isLoading2 ? <Loading /> : "Submit"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

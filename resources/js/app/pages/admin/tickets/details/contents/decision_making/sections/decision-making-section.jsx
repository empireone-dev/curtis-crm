import Input from "@/app/layouts/components/input";
import Select from "@/app/layouts/components/select";
import Textarea from "@/app/layouts/components/textarea";
import { get_user_by_role_service } from "@/app/services/user-service";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAsc } from "../../../../_redux/tickets-slice";
import Loading from "@/app/layouts/components/loading";
import { GlobeAmericasIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import { get_fedex_rate_service } from "@/app/services/fedex-rate-service";
import Wysiwyg from "@/app/layouts/components/wysiwyg";
import {
    get_decision_making_by_ticket_id,
    store_decision_making_service,
} from "@/app/services/desicion-making-service";
import { router } from "@inertiajs/react";

export default function DecisionMakingSection() {
    const { user } = useSelector((state) => state.app);
    const { asc, ticket } = useSelector((state) => state.tickets);
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading1, setIsLoading1] = useState(false);
    const { email_templates } = useSelector((state) => state.email_templates);

    useEffect(() => {
        async function get_decision_making(params) {
            const response = await get_decision_making_by_ticket_id(ticket.id);
            if (response.status) {
                setData({
                    ...ticket,
                    ...response.status,
                    id: ticket.id,
                    user_id: user.id,
                    emp_id: user.emp_id,
                });
            } else {
                setData({
                    ...ticket,
                    ticket_type: "REPLACEMENT",
                    retailers_price: ticket.receipt?.retailers_price ?? "0",
                    discount: ticket.receipt?.discount ?? "0",
                    id: ticket.id,
                    user_id: user.id,
                    emp_id: user.emp_id,
                });
            }
        }
        get_decision_making();
    }, []);

    function formHandler(value, name) {
        if (name == "wysiwyg") {
            setData({
                ...data,
                template_text: value,
            });
        } else {
            if ((value || value == "") && name) {
                setData({
                    ...data,
                    [name]: value,
                });
            }
        }
    }

    useEffect(() => {
        async function get_user_role() {
            const res = await get_user_by_role_service(4);
            dispatch(setAsc(res.data));
        }
        get_user_role();
    }, []);

    async function get_fedex_rate() {
        setIsLoading(true);
        try {
            const result = await get_fedex_rate_service(data);
            setData({
                ...data,
                shipping_cost: `${parseFloat(
                    result.rates.FEDEX_GROUND.PAYOR_ACCOUNT_PACKAGE
                ).toFixed(2)}`,
                estimated_cost: `${(
                    parseFloat(
                        result.rates.FEDEX_GROUND.PAYOR_ACCOUNT_PACKAGE
                    ) + parseFloat(data.cost_of_unit ?? "0")
                ).toFixed(2)}`,
            });
        } catch (error) {
            alert("No rates Found!");
        }
        setIsLoading(false);
    }

    function formHandlerTemplates(value) {
        const findTemplates = email_templates.find((res) => res.id == value);
        setData({
            ...data,
            template_text: findTemplates.template_text,
        });
    }

    async function submit_form(e) {
        e.preventDefault();
        setIsLoading1(true);
        const response = await store_decision_making_service(data);
        router.visit("#warehouse");
        setIsLoading1(false);
    }
    return (
        <form>
            <section className="container bg-white">
                <div className="flex gap-3 mt-2 px-4">
                    <button
                        type="button"
                        className="flex items-center rounded-md mt-3 bg-white px-2.5 py-1.5 text-sm text-green-500 font-semibold shadow-sm ring-1 ring-inset ring-green-500 hover:bg-green-500 hover:text-gray-500"
                    >
                        <GlobeAmericasIcon className="h-5" />
                        <span>{ticket.country}</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center rounded-md mt-3 bg-white px-2.5 py-1.5 text-sm text-yellow-500 font-semibold shadow-sm ring-1 ring-inset ring-yellow-500 hover:bg-yellow-300 hover:text-gray-500"
                    >
                        <Squares2X2Icon className="h-5" />
                        <span>{ticket.item_number}</span>
                    </button>
                </div>
                <div className=" my-5 mx-3">
                    <a
                        href={`/administrator/google_map/` + ticket.id}
                        target="_blank"
                        className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                        OPEN ASC
                    </a>
                </div>
                {ticket.country == "CA" && (
                    <div className="flex">
                        <div className=" border-b border-gray-900/10 w-96">
                            <div className="w-full flex justify-start px-4">
                                <div className="flex items-start gap-x-3 mt-4 my-4 ">
                                    <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  ">
                                        REPAIR
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="container px-4 mx-auto">
                            <div className="mt-4 mb-4 grid grid-cols-1 gap-x-6 gap-y-8">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 flex-1">
                                    <Select
                                        onChange={formHandler}
                                        name="asc"
                                        required={false}
                                        value={data.asc ?? ""}
                                        label="Select ASC"
                                        errorMessage=""
                                        data={[
                                            {
                                                value: "",
                                                name: "",
                                            },
                                            ...asc?.map((res) => ({
                                                value: res.id,
                                                name: res.name,
                                            })),
                                        ]}
                                    />
                                    <Input
                                        onChange={formHandler}
                                        name="repair_cost"
                                        span="$"
                                        required={false}
                                        value={data.repair_cost}
                                        label="Repair Cost"
                                        type="text"
                                        errorMessage="Repair Cost is required"
                                    />

                                    <Input
                                        onChange={formHandler}
                                        name="repair_notes"
                                        span=""
                                        // required={false}
                                        value={data?.repair_notes ?? ""}
                                        label="Notes"
                                        type="text"
                                        // errorMessage="Notes is required"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex">
                    <div className=" border-b border-gray-900/10 w-96">
                        <div className="w-full flex justify-start px-4">
                            <div className="flex items-start gap-x-3 mt-4 my-4 ">
                                <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  ">
                                    REFUND
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="container px-4 mx-auto">
                        <div className="mt-4 mb-4 grid grid-cols-1 gap-x-6 gap-y-8">
                            <div className="flex flex-col gap-6 ">
                                <div className="flex gap-3 w-full">
                                    <Input
                                        onChange={formHandler}
                                        name="cost_refund"
                                        span="$"
                                        required={true}
                                        value={String(data.cost_refund ?? "0")}
                                        label="Estimated Cost of Refund"
                                        type="text"
                                        errorMessage="Estimated Cost of Refund is required"
                                    />
                                    <Input
                                        onChange={formHandler}
                                        span="$"
                                        name="retailers_price"
                                        required={false}
                                        value={data?.retailers_price ?? " "}
                                        label="Retailer's Price"
                                        type="number"
                                        errorMessage="Retailer's Price is required"
                                    />
                                    <Input
                                        onChange={formHandler}
                                        name="discount"
                                        span="$"
                                        required={false}
                                        value={data?.discount ?? " "}
                                        label="Discount"
                                        type="number"
                                        errorMessage="Discount is required"
                                    />
                                    <Input
                                        onChange={formHandler}
                                        span="$"
                                        name="after_discount"
                                        required={false}
                                        value={String(
                                            parseFloat(data?.retailers_price) -
                                                parseFloat(
                                                    data?.discount ?? "0"
                                                )
                                        )}
                                        label="Price After Discount"
                                        type="number"
                                        errorMessage="Price After Discount is required"
                                        readOnly
                                    />
                                </div>

                                <div className="flex gap-3 w-full">
                                    <Input
                                        onChange={formHandler}
                                        name="cheque_no"
                                        required={false}
                                        value={data?.cheque_no ?? " "}
                                        label="Cheque No."
                                        type="text"
                                        errorMessage="Cheque No. is required"
                                    />
                                    <Input
                                        onChange={formHandler}
                                        name="cheque_amount"
                                        span="$"
                                        required={false}
                                        value={data?.cheque_amount ?? " "}
                                        label="Cheque Amount"
                                        type="number"
                                        errorMessage="Cheque Amount is required"
                                    />
                                    <Input
                                        onChange={formHandler}
                                        name="mail_date"
                                        value={data?.mail_date ?? " "}
                                        label="Mail Date"
                                        type="date"
                                        // errorMessage="Mail Date is required"
                                    />
                                </div>
                                <Input
                                    onChange={formHandler}
                                    name="refund_notes"
                                    span=""
                                    required={false}
                                    value={data?.refund_notes ?? ""}
                                    label="Notes"
                                    type="text"
                                    // errorMessage="Notes is required"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex ">
                    <div className=" border-b border-gray-900/10 w-96">
                        <div className="w-full flex justify-start px-4">
                            <div className="flex items-start gap-x-3 mt-4 my-4 ">
                                <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  ">
                                    REPLACEMENT
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="container px-4 mx-auto ">
                        <div className="mt-4 mb-4 grid grid-cols-1 gap-x-6 gap-y-8">
                            <div className="container  bg-white">
                                <div className="flex flex-col gap-6">
                                    <Input
                                        onChange={formHandler}
                                        name="cost_of_unit"
                                        span="$"
                                        required={false}
                                        value={data?.cost_of_unit ?? "0"}
                                        label="Cost of Unit"
                                        type="text"
                                        errorMessage="Cost of Unit is required"
                                    />
                                    <Input
                                        onChange={formHandler}
                                        name="cube_weight"
                                        required={false}
                                        value={data?.cube_weight ?? "0"}
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
                                            required={false}
                                            value={data?.length ?? "0"}
                                            label="Length"
                                            type="number"
                                            errorMessage="Length is required"
                                        />
                                        <Input
                                            onChange={formHandler}
                                            name="width"
                                            required={false}
                                            value={data?.width ?? "0"}
                                            label="Width"
                                            type="number"
                                            errorMessage="Width is required"
                                        />
                                        <Input
                                            onChange={formHandler}
                                            name="height"
                                            required={false}
                                            value={data?.height ?? "0"}
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
                                            {isLoading ? (
                                                <Loading />
                                            ) : (
                                                "GET FEDEX RATES"
                                            )}
                                        </button>
                                        <Input
                                            onChange={formHandler}
                                            name="shipping_cost"
                                            span="$"
                                            required={false}
                                            value={
                                                String(data?.shipping_cost) ??
                                                "0"
                                            }
                                            label="Shipping Cost"
                                            type="number"
                                            errorMessage="Shipping Cost is required"
                                        />
                                        <Input
                                            onChange={formHandler}
                                            name="estimated_cost"
                                            span="$"
                                            required={false}
                                            value={
                                                String(data?.estimated_cost) ??
                                                "0"
                                            }
                                            label="Estimated Cost"
                                            type="number"
                                            errorMessage="Estimated Cost is required"
                                        />
                                    </div>

                                    <Select
                                        onChange={formHandler}
                                        name="instruction"
                                        required={false}
                                        value={data.instruction ?? ""}
                                        label="Warranty Instruction"
                                        errorMessage=""
                                        data={[
                                            {
                                                value: "",
                                                name: "",
                                            },
                                            ...(data.country === "CA"
                                                ? [
                                                      {
                                                          value: "CA Warehouse",
                                                          name: "Return to (CA Warehouse)",
                                                      },
                                                  ]
                                                : []),
                                            ...(data.country === "US"
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
                                        ]}
                                    />

                                    <Input
                                        onChange={formHandler}
                                        name="replacement_notes"
                                        span=""
                                        // required={false}
                                        value={data?.replacement_notes ?? ""}
                                        label="Notes"
                                        type="text"
                                        // errorMessage="Notes is required"
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
                                        value={data?.template_text ?? null}
                                        onChange={formHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex gap-5 my-12">
                <div class="flex items-center">
                    <input
                        checked={data.ticket_type == "REPLACEMENT"}
                        id="default-radio-2"
                        onChange={(e) =>
                            setData({
                                ...data,
                                ticket_type: e.target.value,
                            })
                        }
                        type="radio"
                        value="REPLACEMENT"
                        name="ticket_type"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                    />
                    <label
                        htmlFor="default-radio-2"
                        class="ms-2 text-xl font-medium text-gray-900"
                    >
                        Replacement
                    </label>
                </div>
                <div class="flex items-center">
                    <input
                        checked={data.ticket_type == "REFUND"}
                        id="default-radio-3"
                        onChange={(e) =>
                            setData({
                                ...data,
                                ticket_type: e.target.value,
                            })
                        }
                        type="radio"
                        value="REFUND"
                        name="ticket_type"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                    />
                    <label
                        htmlFor="default-radio-3"
                        class="ms-2 text-xl font-medium text-gray-900"
                    >
                        Refund
                    </label>
                </div>
                <div class="flex items-center ">
                    <input
                        checked={data.ticket_type == "REPAIR"}
                        id="default-radio-1"
                        onChange={(e) =>
                            setData({
                                ...data,
                                ticket_type: e.target.value,
                            })
                        }
                        type="radio"
                        value="REPAIR"
                        name="ticket_type"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                    />
                    <label
                        htmlFor="default-radio-1"
                        class="ms-2 text-xl font-medium text-gray-900"
                    >
                        Repair
                    </label>
                </div>
            </div>

            <button
                onClick={submit_form}
                className="p-3 bg-blue-600 hover:bg-blue-700  w-full font-bold text-white rounded-sm "
            >
                {isLoading1 ? (
                    <div className="p-1.5 flex items-center justify-center">
                        <Loading />
                    </div>
                ) : (
                    "SUBMIT VALIDATION"
                )}
            </button>
        </form>
    );
}

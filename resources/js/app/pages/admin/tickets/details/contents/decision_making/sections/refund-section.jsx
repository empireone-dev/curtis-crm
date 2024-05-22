import Input from "@/app/layouts/components/input";
import { get_fedex_rate_service } from "@/app/services/fedex-rate-service";
import { GlobeAmericasIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRefund, setTicket } from "../../../../_redux/tickets-slice";
import Loading from "@/app/layouts/components/loading";
import { get_receipt_by_ticket_id_service } from "@/app/services/receipt-service";
import {
    get_decision_making_refund_by_id_service,
    store_decision_making_refund_service,
} from "@/app/services/refund-service";
import Select from "@/app/layouts/components/select";
import Wysiwyg from "@/app/layouts/components/wysiwyg";
import { router } from "@inertiajs/react";
import routing from "../../../components/routing";

export default function RefundSection() {
    const { refund, ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading1, setIsLoading1] = useState(false);
    const dispatch = useDispatch();

    const { email_templates } = useSelector((state) => state.email_templates);

    useEffect(() => {
        async function get_receipt() {
            const response = await get_receipt_by_ticket_id_service(ticket.id);
            const data = response.status;
            const refundExist = await get_decision_making_refund_by_id_service(
                ticket.id
            );
            dispatch(
                setRefund({
                    ...refund,
                    instruction: refundExist?.instruction ?? " ",
                    shipping_cost: String(refundExist?.shipping_cost ?? 0),
                    estimated_cost: String(refundExist?.estimated_cost ?? 0),
                    cheque_no: String(ticket?.refund?.cheque_no ?? 0),
                    cheque_amount: String(ticket?.refund?.cheque_amount ?? 0),
                    mail_date: String(ticket?.refund?.mail_date ?? ""),
                    ...data,
                    id: ticket.id,
                    template_text: null,
                    notes: ticket?.refund?.notes ?? " ",
                })
            );
        }
        get_receipt();
    }, [ticket.id]);

    function formHandler(value, name) {
        if (name == "wysiwyg") {
            dispatch(
                setRefund({
                    ...refund,
                    template_text: value,
                })
            );
        } else {
            if ((value || value == "") && name) {
                dispatch(
                    setRefund({
                        ...refund,
                        [name]: value,
                    })
                );
            }
        }
    }

    async function get_fedex_rate() {
        setIsLoading(true);
        try {
            const result = await get_fedex_rate_service(refund);
            dispatch(
                setRefund({
                    ...refund,
                    shipping_cost: `${parseFloat(
                        result.rates.FEDEX_GROUND.PAYOR_ACCOUNT_PACKAGE
                    ).toFixed(2)}`,
                    estimated_cost: `${(
                        parseFloat(
                            result.rates.FEDEX_GROUND.PAYOR_ACCOUNT_PACKAGE
                        ) + parseFloat(refund.unit_cost)
                    ).toFixed(2)}`,
                })
            );
        } catch (error) {
            alert("No rates Found!");
        }
        setIsLoading(false);
    }

    function formHandlerTemplates(value) {
        const findTemplates = email_templates.find((res) => res.id == value);
        dispatch(
            setRefund({
                ...refund,
                template_text: findTemplates.template_text,
            })
        );
    }

    async function refundSubmit(e) {
        e.preventDefault();
        setIsLoading1(true);
        try {
            const result = await store_decision_making_refund_service({
                ...refund,
                account: user,
                decision_status: "REFUND",
            });
            dispatch(setTicket(result.status));
            if (
                refund.instruction == "US Warehouse" ||
                refund.instruction == "CA Warehouse"
            ) {
                router.visit(routing("warehouse"));
            } else {
                router.visit(routing("refund"));
            }
            setIsLoading1(false);
        } catch (error) {
            setIsLoading1(false);
        }
    }
    return (
        <>
            <section className="container border-2 border-slate-400 py-3 bg-white">
                <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-900/10">
                    <div className="w-full flex justify-center ">
                        <div className="flex items-center gap-3 mt-4 my-4">
                            <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  ">
                                REFUND
                            </h1>
                        </div>
                    </div>
                </div>
                <form
                    onSubmit={refundSubmit}
                    className="flex flex-col gap-6 px-4 "
                >
                    <div className="flex gap-3 mt-2">
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

                    <div className="flex gap-3 w-full">
                        <Input
                            onChange={formHandler}
                            span="$"
                            name="retailers_price"
                            required={true}
                            value={refund?.retailers_price ?? " "}
                            label="Retailer's Price"
                            type="number"
                            errorMessage="Retailer's Price is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="discount"
                            span="$"
                            required={true}
                            value={refund?.discount ?? " "}
                            label="Discount"
                            type="number"
                            errorMessage="Discount is required"
                        />
                        <Input
                            onChange={formHandler}
                            span="$"
                            name="after_discount"
                            required={true}
                            value={String(
                                parseFloat(refund?.retailers_price) -
                                    parseFloat(refund?.discount ?? "0")
                            )}
                            label="Price After Discount"
                            type="number"
                            errorMessage="Price After Discount is required"
                            readOnly
                        />
                        {/* <Input
                            onChange={formHandler}
                            name="estimated_fund"
                            span="$"
                            required={true}
                            value={refund?.estimated ?? ' '}
                            label="Estimated Cost of Refund"
                            type="number"
                            errorMessage="Estimated Cost of Refund is required"
                        /> */}
                    </div>
                    <div className="flex gap-3 w-full">
                        <Input
                            onChange={formHandler}
                            name="cheque_no"
                            required={true}
                            value={refund?.cheque_no ?? " "}
                            label="Cheque No."
                            type="text"
                            errorMessage="Cheque No. is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="cheque_amount"
                            span="$"
                            required={true}
                            value={refund?.cheque_amount ?? " "}
                            label="Cheque Amount"
                            type="number"
                            errorMessage="Cheque Amount is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="mail_date"
                            value={refund?.mail_date ?? " "}
                            label="Mail Date"
                            type="date"
                            // errorMessage="Mail Date is required"
                        />
                    </div>

                    <div className="flex gap-3 ">
                        <Input
                            onChange={formHandler}
                            name="unit_cost"
                            span="$"
                            required={true}
                            value={refund?.unit_cost ?? "0"}
                            label="Cost of Unit"
                            type="text"
                            errorMessage="Cost of Unit is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="cube_weight"
                            required={true}
                            value={refund?.cubed_weight ?? "0"}
                            label="Cube Weight"
                            type="number"
                            errorMessage="Cube Weight is required"
                        />
                    </div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Dimension
                    </h2>

                    <div className="flex gap-3">
                        <Input
                            onChange={formHandler}
                            name="length"
                            required={true}
                            value={refund?.length ?? "0"}
                            label="Length"
                            type="number"
                            errorMessage="Length is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="width"
                            required={true}
                            value={refund?.width ?? "0"}
                            label="Width"
                            type="number"
                            errorMessage="Width is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="height"
                            required={true}
                            value={refund?.height ?? "0"}
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
                            value={refund?.shipping_cost ?? "0"}
                            label="Shipping Cost"
                            type="number"
                            errorMessage="Shipping Cost is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="estimated_cost"
                            span="$"
                            required={true}
                            value={refund?.estimated_cost ?? "0"}
                            label="Estimated Cost"
                            type="number"
                            errorMessage="Estimated Cost is required"
                        />
                    </div>
                    <Select
                        onChange={formHandler}
                        name="instruction"
                        required={false}
                        value={refund.instruction ?? ""}
                        label="Warranty Instruction"
                        errorMessage=""
                        data={[
                            {
                                value: "",
                                name: "",
                            },
                            ...(refund.country === "CA"
                                ? [
                                      {
                                          value: "CA Warehouse",
                                          name: "Return to (CA Warehouse)",
                                      },
                                  ]
                                : []),
                            ...(refund.country === "US"
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
                    <div className="my-12">
                        <Wysiwyg
                            label=""
                            name="wysiwyg"
                            value={refund?.template_text ?? null}
                            onChange={formHandler}
                        />
                    </div>
                    <div className="my-6">
                        <Input
                            onChange={formHandler}
                            name="notes"
                            span=""
                            required={true}
                            value={refund?.notes ?? ""}
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
                            onClick={refundSubmit}
                            type="submit"
                            className="rounded-sm bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {isLoading1 ? (
                                <div className="py-1">
                                    <Loading />
                                </div>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

import Input from "@/app/layouts/components/input";
import { get_fedex_rate_service } from "@/app/services/fedex-rate-service";
import { get_specific_item_service } from "@/app/services/product-search";
import { GlobeAmericasIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTicket } from "../../../../_redux/tickets-slice";
import Loading from "@/app/layouts/components/loading";

export default function RefundSection() {
    const [form, setForm] = useState({});
    const { ticket } = useSelector((state) => state.tickets);
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setForm(ticket)
    }, [ticket?.product]);

    function formHandler(value, name) {
        setForm({
            ...form,
            [name]: value,
        });
    }


    async function get_fedex_rate() {
        setIsLoading(true)
        const result = await get_fedex_rate_service(ticket)

        dispatch(setTicket({
            ...ticket,
            product: {
                ...ticket.product,
                shipping_cost: parseFloat(result.rates.FEDEX_GROUND.PAYOR_ACCOUNT_PACKAGE).toFixed(2),
                estimate_cost: (parseFloat(result.rates.FEDEX_GROUND.PAYOR_ACCOUNT_PACKAGE) + parseFloat(ticket.product.cost)).toFixed(2)
            }
        }))
        setIsLoading(false)
    }

    return (
        <>
            <section className="container border-2 border-slate-400 py-3">
                <div className="sm:flex sm:items-center sm:justify-between border-b border-gray-900/10">
                    <div className="w-full flex justify-center ">
                        <div className="flex items-center gap-3 mt-4 my-4">
                            <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
                                REFUND
                            </h1>
                        </div>
                    </div>
                </div>
                <form className="flex flex-col gap-6 px-4 ">
                    <div className="flex gap-3 mt-2">
                        <button
                            type="button"
                            className="flex items-center rounded-md mt-3 bg-white px-2.5 py-1.5 text-sm text-green-500 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-green-500 hover:bg-green-500 hover:text-gray-500"
                        >
                            <GlobeAmericasIcon className="h-5" />
                            <span>CA</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center rounded-md mt-3 bg-white px-2.5 py-1.5 text-sm text-yellow-500 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-yellow-500 hover:bg-yellow-300 hover:text-gray-500"
                        >
                            <Squares2X2Icon className="h-5" />
                            <span>VSE3B9</span>
                        </button>
                    </div>
                    <div className="flex gap-3 w-full">
                        <Input
                            onChange={formHandler}
                            span="$"
                            name="retailer"
                            required={true}
                            value={form.retailer}
                            label="Retailer's Price"
                            type="text"
                            errorMessage="Retailer's Price is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="discount"
                            span="$"
                            required={true}
                            value={form.discount}
                            label="Discount"
                            type="text"
                            errorMessage="Discount is required"
                        />
                        <Input
                            onChange={formHandler}
                            span="$"
                            name="after_discount"
                            required={true}
                            value={form.after_discount}
                            label="Price After Discount"
                            type="text"
                            errorMessage="Price After Discount is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="estimated"
                            span="$"
                            required={true}
                            value={form.estimated}
                            label="Estimated Cost of Refund"
                            type="text"
                            errorMessage="Estimated Cost of Refund is required"
                        />
                    </div>
                    <div className="flex gap-3 w-full">
                        <Input
                            onChange={formHandler}
                            name="cheque_no"
                            required={true}
                            value={form.cheque_no}
                            label="Cheque No."
                            type="text"
                            errorMessage="Cheque No. is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="cheque_amount"
                            required={true}
                            value={form.cheque_amount}
                            label="Cheque Amount"
                            type="text"
                            errorMessage="Cheque Amount is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="mail_date"
                            required={true}
                            value={form.mail_date}
                            label="Mail Date"
                            type="date"
                            errorMessage="Mail Date is required"
                        />
                    </div>
                    <div className="flex gap-3 ">
                        <Input
                            onChange={formHandler}
                            name="unit_cost"
                            required={true}
                            value={form?.product?.cost ?? '0'}
                            label="Cost of Unit"
                            type="text"
                            errorMessage="Cost of Unit is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="cube_weight"
                            required={true}
                            value={form?.product?.cubed_weight ?? '0'}
                            label="Cube Weight"
                            type="text"
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
                            value={form?.product?.length ?? '0'}
                            label="Length"
                            type="text"
                            errorMessage="Length is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="width"
                            required={true}
                            value={form?.product?.width ?? '0'}
                            label="Width"
                            type="text"
                            errorMessage="Width is required"
                        />
                        <Input
                            onChange={formHandler}
                            name="height"
                            required={true}
                            value={form?.product?.height ?? '0'}
                            label="Height"
                            type="text"
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
                                    span="$"
                                    required={true}
                                    value={form?.product?.shipping_cost ?? '0'}
                                    label="Shipping Cost"
                                    type="number"
                                    errorMessage="Shipping Cost is required"
                                />
                                <Input
                                    onChange={formHandler}
                                    name="estimate_cost"
                                    span="$"
                                    required={true}
                                    value={form?.product?.estimate_cost ?? '0'}
                                    label="Estimated Cost"
                                    type="number"
                                    errorMessage="Estimated Cost is required"
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
                            Submit
                        </button>
                    </div>

                </form>
            </section>
        </>
    );
}

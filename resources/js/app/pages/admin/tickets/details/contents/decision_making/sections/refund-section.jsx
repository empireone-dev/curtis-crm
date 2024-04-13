import Input from "@/app/layouts/components/input";
import { GlobeAmericasIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

export default function RefundSection() {
    const [form, setForm] = useState({});

    function formHandler(value, name) {
        setForm({
            ...form,
            [name]: value,
        });
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
                    </div>
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

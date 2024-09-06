import Input from "@/app/layouts/components/input";
import Select from "@/app/layouts/components/select";
import { store_receipt_service } from "@/app/services/receipt-service";
import { router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTicket } from "../../../../_redux/tickets-slice";
import { get_retailers } from "@/app/services/product-search";
import Loading from "@/app/layouts/components/loading";
import routing from "../../../components/routing";
import { message } from "antd";
import { close_ticket_service } from "@/app/services/tickets-service";

export default function WarratyValidationSection() {
    const { ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const [retailers, setRetailers] = useState([]);
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

    const [form, setForm] = useState({
        store: null,
        retailers_price: "0",
        discount: "0",
        total_price: "0",
        refurbished: "true",
        notes: null,
        reason: "",
    });

    useEffect(() => {
        setForm({
            ...form,
            total_price: form.retailers_price,
        });
    }, [form.retailers_price]);
    useEffect(() => {
        async function retailers(params) {
            const res = await get_retailers();
            setRetailers(
                res.map((res) => ({
                    name: res,
                    value: res,
                }))
            );
            if (ticket?.receipt) {
                setForm({
                    ...ticket.receipt,
                    id: ticket.id,
                });
            }
        }
        retailers();
    }, []);

    function formHandler(value, name) {
        setForm({
            ...form,
            [name]: value,
        });
    }

    async function markValidHandler(e) {
        e.preventDefault();
        if (!form.store) {
            message.error("Store Name is required!");
        }
        if (!form.retailers_price || form.retailers_price == "0") {
            message.error("Retailers is required!");
        }
        if (!form.total_price || form.total_price == "0") {
            message.error("Total Price is required!");
        }
        if (!form.notes) {
            message.error("Notes is required!");
        } else {
            setIsLoading1(true);
            try {
                const result = await store_receipt_service({
                    ...ticket,
                    ...form,
                    emp_id: user.emp_id,
                });
                dispatch(setTicket(result.status));
                setIsLoading1(false);
                router.visit(routing("decision"));
            } catch (error) {
                setIsLoading1(false);
            }
        }
    }

    async function markInValidHandler() {
        setIsLoading1(true);
        try {
            await close_ticket_service(ticket, form.reason, {
                ...ticket,
                ...user,
            });
            router.visit(routing("files"));
        } catch (error) {
            setIsLoading1(false);
        }
    }

    const reasons = [
        "OOW",
        "HAS PHYSICAL DAMAGE",
        "REFURBISHED",
        "UNAUTHORIZED RETAILER",
        "NON-CURTIS PRODUCT (MODEL, SERIAL)",
        "PHYSICAL DAMAGE - FRONT",
        "PHYSICAL DAMAGE - BACK",
        "SHIPPING DAMAGE",
        "THIRD PARTY SELLER",
    ];

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="text-4xl font-black">Receipt details</div>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={markValidHandler}
                >
                    <Select
                        onChange={formHandler}
                        name="store"
                        value={form.store}
                        required={true}
                        label="Store Name"
                        errorMessage="Store Name is required"
                        data={retailers}
                    />
                    <Input
                        span={"$"}
                        required={true}
                        onChange={formHandler}
                        name="retailers_price"
                        value={form.retailers_price}
                        label="Retailers Price"
                        type="text"
                        errorMessage="Retailers Price is required"
                    />
                    <Input
                        span={"$"}
                        onChange={formHandler}
                        name="discount"
                        value={form.discount}
                        label="Discount"
                        type="text"
                        errorMessage="Discount is required"
                    />
                    <Input
                        span={"$"}
                        required={true}
                        onChange={formHandler}
                        name="total_price"
                        value={
                            parseFloat(form.retailers_price) -
                            parseFloat(form.discount)
                        }
                        label="Total Price"
                        type="text"
                        errorMessage="Total Price is required"
                    />
                    <Select
                        onChange={formHandler}
                        name="refurbished"
                        value={form.refurbished}
                        label="Refurbished Logo?"
                        errorMessage="Refurbished is required"
                        data={[
                            {
                                value: "true",
                                name: "Yes",
                            },
                            {
                                value: "false",
                                name: "No",
                            },
                        ]}
                    />
                    <Input
                        onChange={formHandler}
                        name="notes"
                        value={form.notes}
                        label="Validation Notes"
                        type="text"
                        errorMessage="Validation Notes is required"
                    />
                    {form.refurbished == "false" && (
                        <div className="flex flex-col bg-blue-700 text-white p-3 rounded-md gap-4">
                            <div className="text-2xl font-bold">
                                Mark this Ticket Valid
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    onClick={markValidHandler}
                                    className="bg-gray-400 hover:bg-gray-300 text-blue-700 p-3 rounded-md font-black"
                                >
                                    {/* MARK VALID */}
                                    {isLoading1 ? (
                                        <div className="p-2">
                                            <Loading />
                                        </div>
                                    ) : (
                                        "MARK VALID"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </form>

                {form.refurbished == "true" && (
                    <div className="flex flex-col bg-red-600 text-white p-3 rounded-md gap-4">
                        <div className="text-2xl font-bold">
                            Mark this Ticket In-Valid
                        </div>
                        <div className="bg-white p-5 rounded-md text-black">
                            <div>
                                <div className="relative">
                                    <select
                                        required={false}
                                        onChange={(e) =>
                                            formHandler(
                                                e.target.value,
                                                e.target.name
                                            )
                                        }
                                        id={"reason"}
                                        name={"reason"}
                                        className="peer text-black placeholder-transparent w-full py-2.5 px-5 border-gray-500 border bg-transparent rounded-sm bg-white focus-within:outline-none focus-within:border-blue-500"
                                        placeholder=""
                                    >
                                        <option selected disabled></option>
                                        {reasons.map((res, i) => {
                                            return (
                                                <option
                                                    selected={
                                                        `${form.reason}` ==
                                                        `${res}`
                                                    }
                                                    key={i}
                                                    value={res}
                                                >
                                                    {res}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <label
                                        htmlFor={"reason"}
                                        className="absolute left-2.5 px-2.5 transition-all bg-white text-blue-black/60 text-sm -top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white"
                                    >
                                        Select Reason
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={markInValidHandler}
                                className="bg-white hover:bg-gray-300 text-red-600 p-3 rounded-md font-black"
                            >
                                {isLoading1 ? (
                                    <div className="p-2">
                                        <Loading />
                                    </div>
                                ) : (
                                    " MARK INVALID"
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

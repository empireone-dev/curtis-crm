import Input from "@/app/layouts/components/input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "@/app/layouts/components/select";
import TicketCreateSearchProductSection from "@/app/pages/admin/tickets/create/sections/tickets-create-search-product-section";
import store from "@/app/store/store";
import Textarea from "@/app/layouts/components/textarea";
import { get_products_thunk } from "@/app/pages/admin/ticket_form/redux/ticket-form-thunk";
import { countries } from "./../../../../../../json/country.json";
import { call_type } from "./../../../../../../json/call_type.json";
import { router } from "@inertiajs/react";
import Loading from "@/app/layouts/components/loading";
import Autocomplete from "@/app/layouts/components/autocomplete";
import {
    get_tickets_by_ticket_id,
    update_tickets_by_user_id,
} from "@/app/services/tickets-service";
import { update_tickets_status_thunk } from "@/app/pages/admin/tickets/_redux/tickets-thunk";
import routing from "@/app/pages/admin/tickets/details/components/routing";
import { setForm } from "@/app/pages/admin/tickets/create/redux/tickets-create-slice";
import ReasonToClose from "@/app/pages/admin/tickets/details/contents/details/id/sections/reason-to-close";

export default function EditTicketFormSection() {
    const dispatch = useDispatch();
    const { form } = useSelector((state) => state.tickets_create)
    const { common_issues } = useSelector((state) => state.common_issues);
    const { ticket } = useSelector((state) => state.tickets);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const ticketid = window.location.pathname.split("/")[4];

    useEffect(() => {
        async function get_ticket(params) {
            const res = await get_tickets_by_ticket_id(ticketid);
            dispatch(setForm({
                ...res,
                isHasEmail: "true",
            }));
        }
        get_ticket();
    }, []);
    function formHandler(value, name) {
        dispatch(setForm({
            ...form,
            [name]: value,
        }));
    }
    useEffect(() => {
        store.dispatch(get_products_thunk());
    }, []);
    async function submitFormTicket(e) {
        e.preventDefault();
        setLoading(true);
        const data = {
            ...form,
            id: ticketid,
            status: ticket.status,
            store:ticket?.receipt?.store??'N/A'
        };
        try {
            await update_tickets_by_user_id(data);
            setLoading(false);
            router.visit(`/agent/tickets/details/${ticketid}/details`);
        } catch (error) {
            setLoading(false);
        }
    }

    const findCountry = (countryName) => {
        return countries.find((country) => country.value === countryName);
    };

    const { regions } = findCountry(form.country ?? "CA");

    async function close_ticket() {
        if (confirm("Are you sure you want to close the ticket?")) {
            setIsLoading(true);
            try {
                await store.dispatch(
                    update_tickets_status_thunk(ticket.id, "CLOSED")
                );
                setIsLoading(false);
                router.visit(
                    `/agent/tickets/details/${ticket.id}/details`
                );
            } catch (error) {
                setIsLoading(false);
            }
        }
    }
    return (
        <form
            onSubmit={submitFormTicket}
            className=" w-full px-8 pt-6 pb-8 mb-4 flex flex-col gap-3"
        >
            <div className="flex items-center justify-center font-black text-3xl my-6">
                EDIT Ticket Form
            </div>
            <div className=" md:flex mb-3">
                <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                    <Input
                        required={false}
                        onChange={formHandler}
                        name="fname"
                        value={form.fname}
                        label="First Name"
                        type="text"
                        errorMessage="First Name is required"
                    />
                </div>
                <div className="md:w-1/2 px-3">
                    <Input
                        required={false}
                        onChange={formHandler}
                        name="lname"
                        value={form.lname}
                        label="Last Name"
                        type="text"
                        errorMessage="Last Name is required"
                    />
                </div>
            </div>
            <div className=" md:flex mb-3">
                <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                    <div className="flex gap-4">
                        <div className="basis-1/3">
                            <Select
                                onChange={formHandler}
                                name="isHasEmail"
                                required={false}
                                value={form.isHasEmail ?? true}
                                label="Has Email?"
                                errorMessage=""
                                data={[
                                    {
                                        value: true,
                                        name: "Yes",
                                    },
                                    {
                                        value: false,
                                        name: "No",
                                    },
                                ]}
                            />
                        </div>

                        <div className="basis-full">
                            {form.isHasEmail == "true" ? (
                                <Input
                                    required={false}
                                    onChange={formHandler}
                                    name="email"
                                    value={form.email}
                                    label="Email"
                                    type="email"
                                    errorMessage="Email is required"
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 px-3">
                    <Input
                        onChange={formHandler}
                        name="phone"
                        required={true}
                        value={form.phone}
                        label="Phone Number"
                        type="phone"
                        errorMessage="Phone Number is required"
                    />
                </div>
            </div>
            <div className=" md:flex mb-3">
                <div className="md:w-full px-3 mb-3 md:mb-0">
                    <TicketCreateSearchProductSection />
                </div>
            </div>
            <div className=" md:flex mb-3">
                <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                    <Input
                        onChange={formHandler}
                        name="item_number"
                        required={false}
                        value={form.item_number}
                        label="Item Number"
                        type="text"
                        errorMessage="Item Number is required"
                    />
                </div>
                <div className="md:w-1/2 px-3">
                    <Input
                        onChange={formHandler}
                        name="unit"
                        required={false}
                        value={form.unit}
                        label="Item Unit"
                        type="text"
                        errorMessage="Item Unit is required"
                    />
                </div>
            </div>

            <div className=" md:flex mb-3">
                <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                    <Input
                        onChange={formHandler}
                        name="brand"
                        required={false}
                        value={form.brand}
                        label="Brand"
                        type="text"
                        errorMessage="Brand is required"
                    />
                </div>
                <div className="md:w-1/2 px-3">
                    <Input
                        onChange={formHandler}
                        name="class"
                        required={false}
                        value={form.class}
                        label="Item Class"
                        type="text"
                        errorMessage="Item Class is required"
                    />
                </div>
            </div>
            <div className=" md:flex mb-3">
                <div className="md:w-2/6 px-3 mb-3 md:mb-0">
                    <Input
                        onChange={formHandler}
                        name="serial_number"
                        required={false}
                        value={form.serial_number}
                        label="Serial Number"
                        type="text"
                        errorMessage="Serial Number is required"
                    />
                </div>

                <div className="md:w-2/6 px-3">
                    <Select
                        onChange={formHandler}
                        name="call_type"
                        required={false}
                        value={form.call_type}
                        label="Call Type"
                        errorMessage="Call Type is required"
                        data={call_type}
                    />
                </div>
                <div className="md:w-2/6 px-3">
                    <Input
                        onChange={formHandler}
                        name="purchase_date"
                        required={false}
                        value={form.purchase_date}
                        label="Purchase Date"
                        type="date"
                        errorMessage="Purchase Date is required"
                    />
                </div>
            </div>

            <div className=" md:flex mb-3">
                <div className="md:w-1/4 px-3 mb-3 md:mb-0">
                    <Input
                        onChange={formHandler}
                        name="zip_code"
                        required={false}
                        value={form.zip_code}
                        label="Zip Code / Postal Code"
                        type="text"
                        errorMessage="Zip Code is required"
                    />
                </div>

                <div className="md:w-1/4 px-3">
                    <Select
                        onChange={formHandler}
                        name="country"
                        required={false}
                        value={form.country}
                        label="Country"
                        errorMessage="Country is required"
                        data={countries.map((res) => ({
                            name: res.name,
                            value: res.value,
                        }))}
                    />
                </div>
                <div className="md:w-1/4 px-3">
                    <Select
                        onChange={formHandler}
                        name="state"
                        required={false}
                        value={form.state}
                        label="State"
                        errorMessage="State is required"
                        data={regions}
                    />
                </div>
                <div className="md:w-1/4 px-3">
                    <Input
                        onChange={formHandler}
                        name="city"
                        required={false}
                        value={form.city}
                        label="City"
                        type="text"
                        errorMessage="City is required"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 mb-3">
                <div className="md:w-full px-3 mb-3 md:mb-0">
                    <Input
                        onChange={formHandler}
                        name="address"
                         required={false}
                        value={form.address}
                        label="Address"
                        type="text"
                        // errorMessage='Address is required'
                    />
                </div>
                <div className="md:w-full px-3 mb-3 md:mb-0">
                    {form.call_type == "Parts" ? (
                        <Autocomplete
                            defaultValue={form.issue ?? "[]"}
                            onChange={formHandler}
                            value={[
                                {
                                    id: "Missing Parts",
                                    name: "Missing Parts",
                                },
                                {
                                    id: "Damage Parts",
                                    name: "Damage Parts",
                                },
                                {
                                    id: "Want to buy Parts",
                                    name: "Want to buy Parts",
                                },
                            ]}
                        />
                    ) : (
                        <Autocomplete
                            defaultValue={form.issue ?? "[]"}
                            onChange={formHandler}
                            value={common_issues.map((res) => ({
                                id: res.id,
                                name: res.name,
                            }))}
                        />
                    )}
                </div>
                <div className="md:w-full flex px-3 mb-3 md:mb-0 gap-5">
                    <div className="basis-full">
                        <Textarea
                            required={true}
                            onChange={formHandler}
                            name="remarks"
                            value={form.remarks}
                            label="Remarks"
                            type="text"
                            errorMessage="Remarks is required"
                        />
                    </div>
                </div>
                <div className="flex gap-4 items-center justify-center">
                    <button
                    disabled={loading}
                        type="submit"
                        className="p-3 flex items-center justify-center w-36 bg-blue-500 text-white rounded-sm hover:to-blue-600"
                    >
                        {loading ? (
                            <div className="py-1.5">
                                <Loading />
                            </div>
                        ) : (
                            "UPDATE"
                        )}
                    </button>
                    <ReasonToClose data={form} />
                </div>
            </div>
        </form>
    );
}

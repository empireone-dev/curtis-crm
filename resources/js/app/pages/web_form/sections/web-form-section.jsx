import Input from "@/app/layouts/components/input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "@/app/layouts/components/select";
import TicketCreateSearchProductSection from "../../admin/tickets/create/sections/tickets-create-search-product-section";
import store from "@/app/store/store";
import Textarea from "@/app/layouts/components/textarea";
import { get_products_thunk } from "@/app/pages/admin/ticket_form/redux/ticket-form-thunk";
import { countries } from "./../../../json/country.json";
// import { call_type } from "./../../../json/call_type.json";
import Loading from "@/app/layouts/components/loading";
import Autocomplete from "@/app/layouts/components/autocomplete";
import { tickets_create_thunk } from "../../admin/tickets/create/redux/tickets-create-thunk";
import { get_common_issues_thunk } from "../../admin/common_issues/redux/common-issues-thunk";
import { setForm } from "../../admin/tickets/create/redux/tickets-create-slice";
import { parts_initial, warranty_initial } from "@/app/json/initial-templates";
import Swal from "sweetalert2";

export default function WebFormFormSection() {
    const dispatch = useDispatch();
    const { form } = useSelector((state) => state.tickets_create);
    const { common_issues } = useSelector((state) => state.common_issues);
    const [loading, setLoading] = useState(false);
    const [warranty, setWarranty] = useState("");
    const [parts, setParts] = useState("");

    const getQueryParam = (paramName) => {
        const searchParams = new URLSearchParams(window.location.search);
        return searchParams.get(paramName);
    };

    const call_type = getQueryParam("call_type");

    console.log("window.location", call_type);

    useEffect(() => {
        if (call_type == "CF-Warranty Claim" || call_type == "Parts") {
        } else {
            window.location.href = "https://www.curtisint.com/product-support/";
        }
        store.dispatch(get_common_issues_thunk());
    }, []);

    // function formHandler(value, name) {
    //     dispatch(
    //         setForm({
    //             ...form,
    //             [name]: value,
    //         })
    //     );
    // }

    function formatPhoneNumber(value) {
        const cleaned = ("" + value).replace(/\D/g, "");
        let numberToFormat = cleaned;
        if (cleaned.length === 11) {
            numberToFormat = cleaned.slice(0, -1);
        }
        if (numberToFormat.length === 10) {
            return numberToFormat.replace(
                /(\d{3})(\d{3})(\d{4})/,
                "($1) $2-$3"
            );
        }
        return value;
    }

    function formHandler(value, name) {
        if (name == "phone" || name == "phone2") {
            dispatch(
                setForm({
                    ...form,
                    [name]: formatPhoneNumber(value),
                })
            );
        } else if (name == "issue") {
            if (value.name) {
                const issue = `["${value.name}"]`;
                dispatch(
                    setForm({
                        ...form,
                        issue: issue,
                    })
                );
            }
        } else if (name == "country") {
            dispatch(
                setForm({
                    ...form,
                    country: value,
                    state: "",
                })
            );
        } else {
            dispatch(
                setForm({
                    ...form,
                    [name]: value,
                })
            );
        }
    }

    useEffect(() => {
        store.dispatch(get_products_thunk());
    }, []);

    useEffect(() => {
        async function getData(params) {
            const w = await warranty_initial(form);
            const p = await parts_initial(form);
            setWarranty(w.template_text);
            setParts(p.template_text);
        }
        getData();
    }, []);

    async function submitFormTicket(e) {
        e.preventDefault();
        setLoading(true);
        dispatch(
            setForm({
                ...form,
                created_from: "WEB FORM",
                status: null,
                isSendEmail: true,
                call_type: call_type,
                email:
                    form.isHasEmail == "true" || form.isHasEmail == true
                        ? form.email
                        : null,
                body: form.call_type == "Parts" ? parts : warranty,
            })
        );
        const response = await store.dispatch(tickets_create_thunk());
        setLoading(false);
        Swal.fire({
            title: "You Product has been Successfully Registered.",
            text: "If the receipt is incomplete, the registration will be invalid.",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Back to website",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href =
                    "https://www.curtisint.com/product-support/";
            }
        });
    }

    const findCountry = (countryName) => {
        return countries.find((country) => country.value === countryName);
    };

    const { regions } = findCountry(form.country ?? "CA");

    return (
        <form
            onSubmit={submitFormTicket}
            className=" w-full px-8 pt-6 pb-8 mb-4 flex flex-col gap-3"
        >
            <div className="flex items-center justify-center font-black text-3xl">
                Web Ticket Form ({`${call_type}`})
            </div>
            <div className=" md:flex mb-3">
                <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                    <Input
                        required={true}
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
                        required={true}
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
                        <div className="basis-full">
                            <Input
                                required={true}
                                onChange={formHandler}
                                name="email"
                                value={form.email}
                                label="Email"
                                type="email"
                                errorMessage="Email is required"
                            />
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 px-3 flex flex-col gap-5">
                    <Input
                        onChange={formHandler}
                        name="phone"
                        required={true}
                        value={form?.phone}
                        label="Phone Number"
                        type="phone"
                        errorMessage="Phone Number is required"
                    />
                    <Input
                        onChange={formHandler}
                        name="phone2"
                        required={true}
                        value={form?.phone2}
                        label="Secondary Phone Number"
                        type="phone"
                        // errorMessage="Phone Number is required"
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
                        required={true}
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
                        required={true}
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
                        required={true}
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
                        required={true}
                        value={form.class}
                        label="Item Class"
                        type="text"
                        errorMessage="Item Class is required"
                    />
                </div>
            </div>
            <div className=" md:flex mb-3">
                <div className="md:w-1/2 px-3 mb-3 md:mb-0">
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

                {/* <div className="md:w-2/6 px-3">
                    <Select
                        onChange={formHandler}
                        name="call_type"
                        required={true}
                        value={form.call_type}
                        label="Call Type"
                        errorMessage="Call Type is required"
                        data={call_type}
                    />
                </div> */}
                <div className="md:w-1/2 px-3">
                    <Input
                        onChange={formHandler}
                        name="purchase_date"
                        // required={true}
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
                        required={true}
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
                        required={true}
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
                        required={true}
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
                        required={true}
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
                        // required={true}
                        value={form.address}
                        label="Address"
                        type="text"
                        // errorMessage='Address is required'
                    />
                </div>
                <div className="md:w-full px-3 mb-3 md:mb-0">
                    <Input
                        onChange={formHandler}
                        name="address2"
                        required={false}
                        value={form?.address2}
                        label="Mailing Address"
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
                        className="p-3 flex items-center justify-center w-36 bg-blue-500 text-white rounded-sm hover:to-blue-600"
                    >
                        {loading ? (
                            <div className="py-1.5">
                                <Loading />
                            </div>
                        ) : (
                            "SUBMIT"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}

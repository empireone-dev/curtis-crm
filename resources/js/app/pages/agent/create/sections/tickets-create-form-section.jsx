import Input from "@/app/layouts/components/input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "@/app/layouts/components/select";
import TicketCreateSearchProductSection from "./tickets-create-search-product-section";
import store from "@/app/store/store";
import Textarea from "@/app/layouts/components/textarea";
import { get_products_thunk } from "@/app/pages/admin/ticket_form/redux/ticket-form-thunk";
import { countries } from "./../../../../json/country.json";
import { call_type } from "./../../../../json/call_type.json";
import { setForm } from "../redux/tickets-create-slice";
import { tickets_create_thunk } from "../redux/tickets-create-thunk";
import { router } from "@inertiajs/react";
import Loading from "@/app/layouts/components/loading";
import Autocomplete from "@/app/layouts/components/autocomplete";
import TicketCloseSection from "@/app/pages/admin/tickets/create/sections/ticket-close-section";
import { parts_initial, warranty_initial } from "@/app/json/initial-templates";
import { message } from "antd";
import { check_serial_number_service } from "@/app/services/tickets-service";
import { get_product_registration_by_serial_service } from "@/app/services/product-registration-service";

export default function TicketCreateFormSection() {
    const dispatch = useDispatch();
    const { form } = useSelector((state) => state.tickets_create);
    const { common_issues } = useSelector((state) => state.common_issues);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.app);
    const [messageApi, contextHolder] = message.useMessage();
    const [warranty, setWarranty] = useState("");
    const [parts, setParts] = useState("");
    const [loading1, setLoading1] = useState(false);

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
    async function formHandler(value, name) {
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
                    zip_code: "",
                })
            );
        } else if (name == "zip_code") {
            if (form.country === "US") {
                const onlyNumbers = /^\d+$/;
                if (onlyNumbers.test(value)) {
                    dispatch(setForm({ ...form, zip_code: value }));
                } else if (value.length == 0) {
                    dispatch(setForm({ ...form, zip_code: value }));
                }
            } else {
                dispatch(setForm({ ...form, zip_code: value }));
            }
        } else if (name == "serial_number") {
            if (value.length == 17) {
                setLoading1(true);
                try {
                    const res =
                        await get_product_registration_by_serial_service(value);
                    console.log("res", res);
                    if (res.length !== 0) {
                        dispatch(
                            setForm({
                                ...form,
                                ...res,
                                serial_number: res.serial,
                                address: res.address1,
                            })
                        );
                        setLoading1(false);
                    } else {
                        dispatch(
                            setForm({
                                ...form,
                                [name]: value,
                            })
                        );
                        setLoading1(false);
                    }
                } catch (error) {
                    setLoading1(false);
                }
            } else {
                dispatch(
                    setForm({
                        ...form,
                        [name]: value,
                    })
                );
            }
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
        const data = await check_serial_number_service(form.serial_number);
        if (!data.result) {
            dispatch(
                setForm({
                    ...form,
                    user: user,
                    status: null,
                    created_from: "AGENT FORM",
                    email:
                        form?.isHasEmail == "true" || form?.isHasEmail == true
                            ? form?.email
                            : null,
                    body: form.call_type == "Parts" ? parts : warranty,
                })
            );
            const response = await store.dispatch(tickets_create_thunk());
            setLoading(false);
            if (user.role_id == 1) {
                router.visit(
                    `/administrator/tickets?search=` + response?.ticket_id
                );
            } else {
                router.visit(`/agent/tickets?search=` + response?.ticket_id);
            }
        } else {
            messageApi.open({
                type: "error",
                content: "Serial number is already exist!",
            });
            setLoading(false);
        }
    }

    const findCountry = (countryName) => {
        return countries.find((country) => country.value === countryName);
    };

    const { regions } = findCountry(form?.country ?? "CA");

    return (
        <form
            onSubmit={submitFormTicket}
            className=" w-full px-8 pt-6 pb-8 mb-4 flex flex-col gap-3"
        >
            {contextHolder}
            <div className="flex items-center justify-center font-black text-3xl">
                Ticket Form
            </div>
            <div className=" md:flex mb-3">
                <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                    <Input
                        required={false}
                        onChange={formHandler}
                        name="fname"
                        value={form?.fname}
                        label="First Name"
                        type="text"
                        // errorMessage='First Name is required'
                    />
                </div>
                <div className="md:w-1/2 px-3">
                    <Input
                        required={false}
                        onChange={formHandler}
                        name="lname"
                        value={form?.lname}
                        label="Last Name"
                        type="text"
                        // errorMessage='Last Name is required'
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
                                value={form?.isHasEmail ?? true}
                                label="Has Email?"
                                // errorMessage=''
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
                            {(form.isHasEmail ?? "true") == "true" && (
                                <Input
                                    required={false}
                                    onChange={formHandler}
                                    name="email"
                                    value={form.email}
                                    label="Email"
                                    type="email"
                                    // errorMessage="Email is required"
                                />
                            )}
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
                        // errorMessage='Phone Number is required'
                    />
                    <Input
                        onChange={formHandler}
                        name="phone2"
                        required={false}
                        value={form?.phone2}
                        label="Calling From"
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
                        required={false}
                        value={form?.item_number}
                        label="Item Number"
                        type="text"
                        // errorMessage='Item Number is required'
                    />
                </div>
                <div className="md:w-1/2 px-3">
                    <Input
                        onChange={formHandler}
                        name="unit"
                        required={false}
                        value={form?.unit}
                        label="Item Unit"
                        type="text"
                        // errorMessage='Item Unit is required'
                    />
                </div>
            </div>

            <div className=" md:flex mb-3">
                <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                    <Input
                        onChange={formHandler}
                        name="brand"
                        required={false}
                        value={form?.brand}
                        label="Brand"
                        type="text"
                        // errorMessage='Brand is required'
                    />
                </div>
                <div className="md:w-1/2 px-3">
                    <Input
                        onChange={formHandler}
                        name="class"
                        required={false}
                        value={form?.class}
                        label="Item Class"
                        type="text"
                        // errorMessage='Item Class is required'
                    />
                </div>
            </div>
            <div className=" md:flex mb-3">
                <div className="md:w-2/6 px-3 mb-3 md:mb-0">
                    <Input
                        onChange={formHandler}
                        name="serial_number"
                        required={false}
                        value={form?.serial_number}
                        label={loading1 ? "Loading ..." : "Serial Number"}
                        type="text"
                        // errorMessage='Serial Number is required'
                    />
                </div>

                <div className="md:w-2/6 px-3">
                    <Select
                        onChange={formHandler}
                        name="call_type"
                        required={false}
                        value={form?.call_type}
                        label="Call Type"
                        // errorMessage='Call Type is required'
                        data={call_type}
                    />
                </div>
                <div className="md:w-2/6 px-3">
                    <Input
                        onChange={formHandler}
                        name="purchase_date"
                        required={false}
                        value={form?.purchase_date}
                        label="Purchase Date"
                        type="date"
                        // errorMessage='Purchase Date is required'
                    />
                </div>
            </div>

            <div className=" md:flex mb-3">
                <div className="md:w-1/4 px-3">
                    <Select
                        onChange={formHandler}
                        name="country"
                        required={false}
                        value={form?.country}
                        label="Country"
                        // errorMessage='Country is required'
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
                        value={form?.state}
                        label="State"
                        // errorMessage='State is required'
                        data={regions}
                    />
                </div>
                <div className="md:w-1/4 px-3">
                    <Input
                        onChange={formHandler}
                        name="city"
                        required={false}
                        value={form?.city}
                        label="City"
                        type="text"
                        // errorMessage='City is required'
                    />
                </div>
                <div className="md:w-1/4 px-3 mb-3 md:mb-0">
                    <Input
                        onChange={formHandler}
                        name="zip_code"
                        required={false}
                        value={form?.zip_code}
                        label="Zip Code / Postal Code"
                        type="text"
                        // errorMessage='Zip Code is required'
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 mb-3">
                <div className="md:w-full px-3 mb-3 md:mb-0">
                    <Input
                        onChange={formHandler}
                        name="address"
                        required={false}
                        value={form?.address}
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
                    {form?.call_type == "Parts" ? (
                        <Autocomplete
                            defaultValue={"[]"}
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
                        // <Select
                        //     onChange={formHandler}
                        //     name="issue"
                        //     required={false}
                        //     value={form.issue ?? '["Missing Parts"]'}
                        //     label="Parts Issue"
                        //     data={[
                        //         {
                        //             value: null,
                        //             name: "",
                        //         },
                        //         {
                        //             value: '["Missing Parts"]',
                        //             name: "Missing Parts",
                        //         },
                        //         {
                        //             value: '["Damage Parts"]',
                        //             name: "Damage Parts",
                        //         },
                        //         {
                        //             value: '["Want to buy Parts"]',
                        //             name: "Want to buy Parts",
                        //         },
                        //     ]}
                        // />
                        <Autocomplete
                            onChange={formHandler}
                            defaultValue={"[]"}
                            value={common_issues.map((res) => ({
                                id: res.id,
                                name: res.name,
                            }))}
                        />
                        // <Select
                        //     onChange={formHandler}
                        //     name="issue"
                        //     required={false}
                        //     value={form.issue ?? '["Power :: No Power"]'}
                        //     label="Warranty Issue"
                        //     data={
                        //         [
                        //             {
                        //                 value: null,
                        //                 name: "",
                        //             },
                        //             ...common_issues.map((res) => ({
                        //                 value: `["${res.name}"]`,
                        //                 name: res.name,
                        //             }))
                        //         ]
                        //     }
                        // />
                    )}
                </div>
                <div className="md:w-full flex px-3 mb-3 md:mb-0 gap-5">
                    <div className="basis-3/4">
                        <Textarea
                            required={true}
                            onChange={formHandler}
                            name="remarks"
                            value={form?.remarks}
                            label="Remarks"
                            type="text"
                            // errorMessage='Remarks is required'
                        />
                    </div>
                    <div className="basis-1/4 flex items-center justify-center">
                        <div className="flex items-center justify-center">
                            {form.email !== "" &&
                                form.email !== null &&
                                form.email !== undefined &&
                                (form.isHasEmail ?? "true") == "true" && (
                                    <>
                                        <input
                                            id="checked-checkbox"
                                            checked={form.isSendEmail ?? true}
                                            onChange={(e) =>
                                                formHandler(
                                                    e.target.checked,
                                                    "isSendEmail"
                                                )
                                            }
                                            type="checkbox"
                                            name="isSendEmail"
                                            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                                        />
                                        <label
                                            htmlFor="checked-checkbox"
                                            className="ms-2 text-sm font-black text-gray-900 "
                                        >
                                            Send Initial Email
                                        </label>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 items-center justify-center">
                    {form?.call_type !== "General Inquiry" &&
                        form?.call_type !== "Others" && (
                            <button
                                disabled={loading}
                                className="p-3 flex items-center justify-center w-36 bg-blue-500 text-white rounded-sm hover:to-blue-600"
                            >
                                {loading ? (
                                    <div className="py-1.5">
                                        <Loading />
                                    </div>
                                ) : (
                                    "Open"
                                )}
                            </button>
                        )}

                    {/* <button className='p-3 w-36 bg-red-500 text-white rounded-sm hover:to-red-600'>
                        Closed
                    </button> */}

                    <TicketCloseSection data={form} />
                </div>
            </div>
        </form>
    );
}

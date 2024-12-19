import Input from "@/app/layouts/components/input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "@/app/layouts/components/select";
import TicketCreateSearchProductSection from "@/app/pages/admin/tickets/create/sections/tickets-create-search-product-section";
import store from "@/app/store/store";
import Textarea from "@/app/layouts/components/textarea";
import { get_products_thunk } from "@/app/pages/admin/ticket_form/redux/ticket-form-thunk";
import { countries } from "./../../../../../../../../json/country.json";
import { call_type } from "./../../../../../../../../json/call_type.json";
import { router, usePage } from "@inertiajs/react";
import Loading from "@/app/layouts/components/loading";
import Autocomplete from "@/app/layouts/components/autocomplete";
import {
    check_serial_number_service,
    get_tickets_by_ticket_id,
    update_tickets_by_user_id,
} from "@/app/services/tickets-service";
import ReasonToClose from "./reason-to-close";
import { setTicket } from "@/app/pages/admin/tickets/_redux/tickets-slice";
import { get_retailers } from "@/app/services/product-search";
import Skeleton from "@/app/layouts/components/skeleton";
import { message, Select as SelectData } from "antd";
import { setForm } from "@/app/pages/admin/tickets/create/redux/tickets-create-slice";
import axios from "axios";
import SearchAddressSection from "./search-address-section";

const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
export default function EditTicketFormSection() {
    const dispatch = useDispatch();
    // const [form, setForm] = useState({
    //     store: "",
    //     isHasEmail: "true",
    // });

    const { common_issues } = useSelector((state) => state.common_issues);
    const { ticket } = useSelector((state) => state.tickets);
    const { form } = useSelector((state) => state.tickets_create);
    const [loading, setLoading] = useState(false);
    const ticketid = window.location.pathname.split("/")[4];
    const [storeData, setStoreData] = useState([]);
    const { url } = usePage();
    const [load, setLoad] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get_tickets_by_ticket_id(
                    url.split("/")[url.split("/").length - 2].split("#")[0]
                );
                dispatch(setTicket(res));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [url]);

    useEffect(() => {
        async function get_ticket(params) {
            const res = await get_tickets_by_ticket_id(ticketid);
            dispatch(
                setForm({
                    ...res,
                    store: res?.receipt?.store ?? "N/A",
                    state: res?.state ?? "AB",
                    country: res?.country ?? "CA",
                })
            );
        }
        if (ticket) {
            get_ticket();
        }
    }, []);

    useEffect(() => {
        const { country, state, zip_code } = ticket;

        const getAddress = async () => {
            if (country && state && zip_code) {
                try {
                    console.log("Fetching address suggestions with:", {
                        country,
                        state,
                        zip_code,
                    });

                    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=CO&types=(cities)&components=country:us&key=AIzaSyDaV8ZAZSCsml9di5U6ouSQHQ_mj9jq5Jo`;
                    console.log("Request URL:", url);
                    const res = await axios.get(url);

                    const data = await res.json();
                    console.log("API Response:", data);

                    if (data.error_message) {
                        console.error("API Error:", data.error_message);
                    } else {
                        console.log("City suggestions:", data.predictions);
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                }
            } else {
                console.log("Missing required fields:", {
                    country,
                    state,
                    zip_code,
                });
            }
        };

        getAddress();
    }, [ticket]);

    useEffect(() => {
        async function get_ticket(params) {
            setLoad(true);
            const result = await get_retailers();
            setStoreData(
                result.map((res) => ({
                    name: res,
                    value: res,
                }))
            );
            setLoad(false);
        }
        get_ticket();
    }, []);

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

    // function formHandler(value, name) {
    //     dispatch(
    //         setForm({
    //             ...form,
    //             [name]: value,
    //         })
    //     );
    // }
    function formHandler(value, name) {
        if (name == "phone") {
            dispatch(
                setForm({
                    ...form,
                    phone: formatPhoneNumber(value),
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
    async function submitFormTicket(e) {
        e.preventDefault();
        setLoading(true);
        const checked = await check_serial_number_service(form.serial_number);
        if (!checked.result || checked.result.ticket_id == form.ticket_id) {
            const data = {
                ...form,
                id: ticketid,
                status: ticket.status,
            };
            try {
                await update_tickets_by_user_id(data);
                setLoading(false);
                router.visit(
                    `/administrator/tickets/details/${ticketid}/details`
                );
            } catch (error) {
                setLoading(false);
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
            {load ? (
                <Skeleton />
            ) : (
                <div className="min-h-screen h-full">
                    <div className="flex items-center justify-center font-black text-3xl my-6">
                        EDIT TICKET FORM
                    </div>
                    {contextHolder}
                    <div className=" md:flex mb-3">
                        <div className="md:w-1/2 px-3 mb-3">
                            <Input
                                required={false}
                                onChange={formHandler}
                                name="fname"
                                value={form?.fname}
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
                                value={form?.lname}
                                label="Last Name"
                                type="text"
                                errorMessage="Last Name is required"
                            />
                        </div>
                    </div>
                    <div className=" md:flex mb-3">
                        <div className="md:w-1/2 px-3 mb-3">
                            <div className="flex gap-4">
                                <div className="basis-1/3">
                                    <Select
                                        onChange={formHandler}
                                        name="isHasEmail"
                                        required={false}
                                        value={form?.isHasEmail ?? true}
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
                                    {(form?.isHasEmail ?? "true") == "true" ? (
                                        <Input
                                            required={false}
                                            onChange={formHandler}
                                            name="email"
                                            value={form?.email}
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
                                value={form?.phone}
                                label="Phone Number"
                                type="phone"
                                errorMessage="Phone Number is required"
                            />
                        </div>
                    </div>

                    <div className=" md:flex mb-3">
                        <div className="md:w-1/4 px-3 mb-3">
                            <TicketCreateSearchProductSection />
                        </div>
                        <div className="basis-full">
                            <div className="md:wfull px-3 mb-3">
                                <Select
                                    onChange={formHandler}
                                    name="store"
                                    value={form?.store}
                                    label="Store Name"
                                    errorMessage="Store Name is required"
                                    data={storeData}
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" md:flex mb-3">
                        <div className="md:w-1/2 px-3 mb-3">
                            <Input
                                onChange={formHandler}
                                name="item_number"
                                required={false}
                                value={form?.item_number}
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
                                value={form?.unit}
                                label="Item Unit"
                                type="text"
                                errorMessage="Item Unit is required"
                            />
                        </div>
                    </div>

                    <div className=" md:flex mb-3">
                        <div className="md:w-1/2 px-3 mb-3">
                            <Input
                                onChange={formHandler}
                                name="brand"
                                required={false}
                                value={form?.brand}
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
                                value={form?.class}
                                label="Item Class"
                                type="text"
                                errorMessage="Item Class is required"
                            />
                        </div>
                    </div>
                    <div className=" md:flex mb-3">
                        <div className="md:w-2/6 px-3 mb-3">
                            <Input
                                onChange={formHandler}
                                name="serial_number"
                                required={false}
                                value={form?.serial_number}
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
                                value={form?.call_type}
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
                                value={form?.purchase_date}
                                label="Purchase Date"
                                type="date"
                                errorMessage="Purchase Date is required"
                            />
                        </div>
                    </div>
                    <div  className=" px-3 ">
                        <SearchAddressSection data={form}/>
                    </div>
                    <div className=" md:flex mb-3">
                        <div className="flex gap-3 md:w-1/4 px-3 mb-3">
                        <Input
                                onChange={formHandler}
                                name="street"
                                required={false}
                                value={form?.street}
                                label="Street"
                                type="text"
                                errorMessage=""
                            />
                            <Input
                                onChange={formHandler}
                                name="zip_code"
                                required={false}
                                value={form?.zip_code}
                                label="Zip/Postal Code"
                                type="text"
                                errorMessage="Zip Code is required"
                            />
                        </div>

                        <div className="md:w-1/4 px-3">
                            <Select
                                onChange={formHandler}
                                name="country"
                                required={false}
                                value={form?.country}
                                label="Country"
                                errorMessage="Country is required"
                                data={countries.map((res) => ({
                                    name: res.name,
                                    value: res.value,
                                }))}
                            />
                        </div>
                        {/* {form.country},
                        {form.state} */}
                        <div className="md:w-1/4 px-3">
                            <Select
                                onChange={formHandler}
                                name="state"
                                required={false}
                                value={form?.state}
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
                                value={form?.city}
                                label="City"
                                type="text"
                                errorMessage="City is required"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mb-3">
                        <div className="md:w-full px-3 mb-3">
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
                        <div className="md:w-full px-3 mb-3">
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

                        <div className="md:w-full px-3 mb-3">
                            {/* {form?.issue && form?.call_type == "Parts" && (
                                <SelectData
                                    mode="multiple"
                                    size={"large"}
                                    placeholder="Please select"
                                    defaultValue={
                                        JSON.parse(form?.issue ?? "[]") 
                                    }
                                    onChange={formHandlerIssue}
                                    style={{
                                        width: "100%",
                                    }}
                                    options={[
                                        {
                                            value: "Missing Parts",
                                            label: "Missing Parts",
                                        },
                                        {
                                            value: "Damage Parts",
                                            label: "Damage Parts",
                                        },
                                        {
                                            value: "Want to buy Parts",
                                            label: "Want to buy Parts",
                                        },
                                    ]}
                                />
                            )}

                            {form?.issue && form?.call_type !== "Parts" && (
                                <SelectData
                                    mode="multiple"
                                    size={"large"}
                                    placeholder="Please select"
                                    defaultValue={
                                        JSON.parse(form?.issue ?? "[]") ?? []
                                    }
                                    onChange={formHandlerIssue}
                                    style={{
                                        width: "100%",
                                    }}
                                    options={common_issues.map((res) => ({
                                        value: res.id,
                                        label: res.name,
                                    }))}
                                />
                            )} */}
                            <div className="md:w-full  mb-3 md:mb-0">
                                {form?.call_type == "Parts" ? (
                                    <Autocomplete
                                        defaultValue={form?.issue ?? "[]"}
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
                                        defaultValue={form?.issue ?? "[]"}
                                        onChange={formHandler}
                                        value={common_issues.map((res) => ({
                                            id: res.id,
                                            name: res.name,
                                        }))}
                                    />
                                )}
                            </div>
                            {/* {form?.call_type == "Parts" ? (
                                <Autocomplete
                                    defaultValue={form?.issue ?? "[]"}
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
                                    defaultValue={form?.issue ?? "[]"}
                                    onChange={formHandler}
                                    value={common_issues.map((res) => ({
                                        id: res.id,
                                        name: res.name,
                                    }))}
                                />
                            )} */}
                        </div>
                        <div className="md:w-full flex px-3 mb-3 gap-5">
                            <div className="basis-full">
                                <Textarea
                                    required={true}
                                    onChange={formHandler}
                                    name="remarks"
                                    value={form?.remarks}
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
                </div>
            )}
        </form>
    );
}

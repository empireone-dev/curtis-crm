import Input from "@/app/layouts/components/input";
import Select from "@/app/layouts/components/select";
import React, { useState } from "react";
import { countries } from "@/app/json/country.json";
import Loading from "@/app/layouts/components/loading";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { product_registration_service } from "@/app/services/product-registration-service";

export default function ProductRegistrationForm() {
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);

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
        if (name == "phone") {
            setForm({
                ...form,
                phone: formatPhoneNumber(value),
            });
        } else if (name == "issue") {
            if (value.name) {
                const issue = `["${value.name}"]`;

                setForm({
                    ...form,
                    issue: issue,
                });
            }
        } else if (name == "country") {
            setForm({
                ...form,
                country: value,
                state: "",
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
    }

    async function submitFormTicket(e) {
        setLoading(true);
        e.preventDefault();
        const fd = new FormData();
        fd.append("fname", form.fname);
        fd.append("lname", form.lname);
        fd.append("phone", form.phone);
        fd.append("email", form.email);
        fd.append("model", form.model);
        fd.append("serial", form.serial);
        fd.append("country", form.country);
        fd.append("state", form.state);
        fd.append("city", form.city);
        fd.append("zipcode", form.zipcode);
        fd.append("address1", form.address1);
        fd.append("address2", form.address2);
        fd.append("fname", form.fname);

        if (form.fileList && form.fileList.length !== 0) {
            if (form.serial == 17) {
                form.fileList.forEach((file) => {
                    if (file.name !== "uploaded" && file.status === "done") {
                        fd.append("files[]", file.originFileObj);
                    }
                });
                try {
                    await product_registration_service(fd);
                    message.success(`Product Registration Successfully!`);
                    setForm({});
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                }
            } else {
                message.error(`Serial # must have 17 digits and start with the letter "A"`);
            }
        } else {
            message.error(`Please attach your receipt.`);
            setLoading(false);
        }
    }

    const findCountry = (countryName) => {
        return countries.find((country) => country.value === countryName);
    };
    const { regions } = findCountry(form?.country ?? "CA");

    const props = {
        name: "file",
        method: "GET",
        action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
        multiple: true,
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            setForm({
                ...form,
                fileList: info.fileList,
            });
        },
    };
    console.log("form?.fileList", form);
    return (
        <div>
            <form
                onSubmit={submitFormTicket}
                className=" w-full px-8 pt-6 pb-8 mb-4 flex flex-col gap-3 "
            >
                <div className="flex items-center justify-center font-black text-3xl">
                    <div className="flex flex-col gap-3">
                        <img src="/images/logo.png" />
                        Product Registration Form
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <Input
                            required={true}
                            onChange={formHandler}
                            name="fname"
                            value={form.fname}
                            label="First Name"
                            type="text"
                            errorMessage="First Name is required"
                        />
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
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="phone"
                        value={form.phone}
                        label="Phone"
                        type="phone"
                        errorMessage="Phone is required"
                    />
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="email"
                        value={form.email}
                        label="Email"
                        type="email"
                        errorMessage="Email is required"
                    />
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="model"
                        value={form.model}
                        label="Model"
                        type="text"
                        errorMessage="Model is required"
                    />
                    <div className="mt-2">
                        <Input
                            required={true}
                            onChange={formHandler}
                            name="serial"
                            value={form.serial}
                            label="Serial # (starts with letter A and 16 digits)"
                            type="text"
                            errorMessage="Serial is required"
                        />
                    </div>
                    <div className="mt-2">
                        <Select
                            onChange={formHandler}
                            name="country"
                            required={true}
                            value={form?.country}
                            label="Country"
                            // errorMessage='Country is required'
                            data={countries.map((res) => ({
                                name: res.name,
                                value: res.value,
                            }))}
                        />
                    </div>
                    <Select
                        onChange={formHandler}
                        name="state"
                        required={true}
                        value={form?.state}
                        label="State / Province / Region"
                        // errorMessage='State is required'
                        data={regions}
                    />
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="city"
                        value={form.city}
                        label="City"
                        type="text"
                        errorMessage="City is required"
                    />
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="zipcode"
                        value={form.zipcode}
                        label="Zip / Postal Code"
                        type="text"
                        errorMessage="Zipcode is required"
                    />
                    <Input
                        onChange={formHandler}
                        name="address1"
                        required={true}
                        value={form?.address1}
                        label="Address 1"
                        type="text"
                        // errorMessage='Address is required'
                    />
                    <Input
                        onChange={formHandler}
                        name="address2"
                        required={false}
                        value={form?.address2}
                        label="Address 2"
                        type="text"
                        // errorMessage='Address is required'
                    />
                    Entire Picture of the Receipt that shows Date of Purchase,
                    Name of Store,
                    <br />
                    Unit Description, Unit Price, Order Summary with Total
                    Breakdown:
                    <br />
                    <div className="text-red-500">
                        NOTE: It must be clear and readable. Not valid if
                        required information is incomplete.
                    </div>
                    <Upload
                        fileList={form?.fileList ?? []}
                        listType="picture"
                        {...props}
                    >
                        <Button icon={<UploadOutlined />}>
                            Click to upload receipt/bill of sale.
                        </Button>
                    </Upload>
                    <button
                        disabled={loading}
                        className="p-3 flex w-full items-center justify-center bg-blue-500 text-white rounded-sm hover:to-blue-600"
                    >
                        {loading ? (
                            <div className="py-1.5">
                                <Loading />
                            </div>
                        ) : (
                            "REGISTER"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

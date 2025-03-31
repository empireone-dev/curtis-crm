import Input from "@/app/_components/input";
import Select from "@/app/_components/select";
import Textarea from "@/app/_components/textarea";
import React, { useState } from "react";

export default function DealerFormSection({ form, setForm }) {
    function formHandler(e) {
        setForm({
            ...form,
            dealer: {
                ...form.dealer,
                [e.target.name]: e.target.value,
            },
        });
    }

    const labour_details = [
        {
            label: "In Home Appliance Repair (Electro Experts Only)",
            value: "In Home Appliance Repair (Electro Experts Only)",
        },
        {
            label: 'LCD/LED TV 60" - 69", in home repair',
            value: 'LCD/LED TV 60" - 69", in home repair',
        },
        {
            label: "LED 6549 Resistor Modification +$25 ron",
            value: "LED 6549 Resistor Modification +$25 ron",
        },
        {
            label: "LED 6049 or greater Backlight jumper repair +$50",
            value: "LED 6049 or greater Backlight jumper repair +$50",
        },
        {
            label: 'LCD/LED TV (70" & above) new',
            value: 'LCD/LED TV (70" & above) new',
        },
        { label: 'LCD/LED TV (51" - 69°)', value: 'LCD/LED TV (51" - 69°)' },
        { label: 'LCD/LED TV (41" - 50")', value: 'LCD/LED TV (41" - 50")' },
        { label: 'LCD/LED TV (30" - 40*)', value: 'LCD/LED TV (30" - 40*)' },
        { label: 'LCD/LED TV (up to 29")', value: 'LCD/LED TV (up to 29")' },
        { label: "Microwave Oven", value: "Microwave Oven" },
    ];

    
    return (
        <div>
            <div className="flex flex-col gap-3 mt-10">
                <div className="flex">
                    <div className="w-full">
                        <div className="text-xl font-bold">
                            Dealer Information
                        </div>
                        <br />
                        <Input
                            required={true}
                            onChange={formHandler}
                            name="name"
                            value={form?.dealer?.name}
                            label="Dealer Name"
                            type="text"
                            errorMessage="Dealer is required"
                        />
                    </div>
                </div>
                <div className="text-xl font-bold">Repair Information</div>
                <div className="flex gap-3">
                    <Select
                        onChange={formHandler}
                        name="major_labour_details"
                        required={true}
                        value={form?.dealer?.major_labour_details ?? ""}
                        label="Major Labour Details"
                        // errorMessage='Country is required'
                        options={labour_details.map((res) => ({
                            label: res.label,
                            value: res.value,
                        }))}
                    />
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="major_labour_rate"
                        value={form?.dealer?.major_labour_rate}
                        label="Major Labour Rate"
                        type="number"
                        errorMessage="Major Labour Rate is required"
                    />
                </div>

                <div className="flex">
                    <div className="w-full">
                        <Textarea
                            onChange={formHandler}
                            value={form?.dealer?.major_labour_notes}
                            required={true}
                            name="major_labour_notes"
                            label="Major Labour Notes"
                            type="textarea"
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-3">
                    <Select
                        onChange={formHandler}
                        name="minor_labour_details"
                        required={true}
                        value={form?.dealer?.minor_labour_details ?? ""}
                        label="Minor Labour Details"
                        // errorMessage='Country is required'
                        options={labour_details.map((res) => ({
                            label: res.label,
                            value: res.value,
                        }))}
                    />
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="minor_labour_rate"
                        value={form?.dealer?.minor_labour_rate}
                        label="Minor Labour Rate"
                        type="number"
                        errorMessage="Minor Labour Rate is required"
                    />
                </div>

                <div className="flex">
                    <div className="w-full">
                        <Textarea
                            onChange={formHandler}
                            value={form?.dealer?.minor_labour_notes}
                            required={true}
                            name="minor_labour_notes"
                            label="Minor Labour Notes"
                            type="textarea"
                        />
                    </div>
                </div>

                <Input
                    required={true}
                    onChange={formHandler}
                    name="misc_cost"
                    value={form?.dealer?.misc_cost}
                    label="Misc Cost"
                    type="number"
                    errorMessage="Misc Cost Rate is required"
                />
                <div className="flex gap-3">
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="invoice_number"
                        value={form?.dealer?.invoice_number}
                        label="Invoice Number"
                        type="number"
                        errorMessage="Invoice Number Rate is required"
                    />
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="invoice_date"
                        value={form?.dealer?.invoice_date}
                        label="Invoice Date"
                        type="date"
                        errorMessage="Invoice Date Rate is required"
                    />
                </div>

                <div className="flex gap-3">
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="repair_start"
                        value={form?.dealer?.repair_start}
                        label="Repair Start Date"
                        type="date"
                        errorMessage="Repair Start Date Rate is required"
                    />
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="repair_end"
                        value={form?.dealer?.repair_end}
                        label="Repair End Date"
                        type="date"
                        errorMessage="Repair End Date Rate is required"
                    />
                </div>
                <div className="flex gap-3">
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="sub_total"
                        value={form?.dealer?.sub_total}
                        label="Subtotal"
                        type="number"
                        errorMessage="Subtotal Rate is required"
                    />
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="tax"
                        value={form?.dealer?.tax}
                        label="Tax Misc Cost"
                        type="number"
                        errorMessage="Tax  Rate is required"
                    />
                    <Input
                        required={true}
                        onChange={formHandler}
                        name="total"
                        value={form?.dealer?.total}
                        label="Total"
                        type="number"
                        errorMessage="Total Rate is required"
                    />
                </div>
            </div>
        </div>
    );
}

import Input from "@/app/layouts/components/input";
import Textarea from "@/app/layouts/components/textarea";
import store from "@/app/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_tickets_status_thunk } from "../../../../_redux/tickets-thunk";
import { router } from "@inertiajs/react";
import { patch_warranty_checkque_shipped_service } from "@/app/services/refund-service";
import { setTicket } from "../../../../_redux/tickets-slice";
import Loading from "@/app/layouts/components/loading";

export default function ContentRefundFormSection() {
    const [form, setForm] = useState({});
    const { ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setForm({
            ...(ticket.decision_making ?? {}),
            ...(ticket.refund ?? {}),
        });
    }, [ticket]);

    function formHandler(value, name) {
        if (name == "estimated_cost") {
            setForm({
                ...form,
                estimated_cost: value.replace(/[^0-9.]/g, ""),
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
    }

    async function process_ticket_handler() {
        if (confirm("Are you sure you want to shipped the ticket?")) {
            setIsLoading(true);
            try {
                const result = await patch_warranty_checkque_shipped_service({
                    ...form,
                    account: user,
                    status: "PROCESSED TICKET",
                });
                dispatch(setTicket(result.status));
                setIsLoading(false);
                router.visit("#files");
            } catch (error) {
                setIsLoading(false);
            }
        }
        
    }
    return (
        <div className="flex flex-col gap-8 my-12">
            <div className="grid grid-cols-4 gap-4">
                <Input
                    onChange={formHandler}
                    name="retailers_price"
                    span="$"
                    required={true}
                    value={String(form.retailers_price) ?? " "}
                    label="Retailer's Price"
                    type="number"
                    errorMessage="Retailers Price is required"
                />
                <Input
                    onChange={formHandler}
                    name="discount"
                    span="$"
                    required={true}
                    value={String(form.discount) ?? " "}
                    label="discount"
                    type="text"
                    errorMessage="Discount is required"
                />
                <Input
                    onChange={formHandler}
                    name="after_discount"
                    span="$"
                    required={true}
                    value={String(
                        parseFloat(form?.retailers_price) -
                            parseFloat(form?.discount ?? "0")
                    )}
                    label="Price After Discount"
                    type="text"
                    errorMessage="Price After Discount is required"
                />
                <Input
                    onChange={formHandler}
                    name="cost_refund"
                    span="$"
                    required={true}
                    value={String(form.cost_refund ?? "0")}
                    label="Estimated Cost of Refund"
                    type="text"
                    errorMessage="Estimated Cost of Refund is required"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input
                    onChange={formHandler}
                    name="cheque_no"
                    required={true}
                    value={form.cheque_no ?? "0"}
                    label="Cheque Number"
                    type="text"
                    errorMessage="Cheque Number is required"
                />
                <Input
                    onChange={formHandler}
                    name="cheque_amount"
                    span="$"
                    required={true}
                    value={form.cheque_amount ?? "0"}
                    label="Cheque Amount"
                    type="text"
                    errorMessage="Cheque Amount is required"
                />
                <div className=" text-red-500">
                    Resource Notes: Refund is cheaper than replacement.
                </div>
            </div>

            <Textarea
                required={true}
                onChange={formHandler}
                name="notes"
                value={form.notes ?? " "}
                label="Resource Notes:"
                type="text"
                errorMessage="notes is required"
            />
            <button
                onClick={process_ticket_handler}
                className=" rounded-sm bg-green-600 text-white text-bold hover:bg-green-700 flex items-center justify-center p-2.5"
            >
                {isLoading ? <Loading /> : "CHECKQUE SHIPPED"}
            </button>
        </div>
    );
}

import Input from "@/app/layouts/components/input";
import Textarea from "@/app/layouts/components/textarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTicket } from "../../../../_redux/tickets-slice";
import { router } from "@inertiajs/react";
import {
    unrepair_service,
    update_repair_service,
} from "@/app/services/repair-service";
import Loading from "@/app/layouts/components/loading";
import routing from "../../../components/routing";

export default function ContentRepairFormection() {
    const [form, setForm] = useState({});
    const { ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app);
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setForm({
            ...ticket.decision_making,
            repair_cost: ticket?.repair?.repair_cost ?? ticket.repair_cost,
            notes: ticket?.repair?.notes ?? ticket.notes,
            asc_data:ticket.asc
        });
    }, []);
    function formHandler(value, name) {
        if (name === "repair_cost") {
            setForm({
                ...form,
                repair_cost: value.replace(/[^0-9.]/g, ""),
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
    }

    async function submit_repaired_asc(params) {
        if (confirm("Are you sure you want to mark as repaired the ticket?")) {
            setIsLoading1(true);
            try {
                const result = await update_repair_service({
                    ...form,
                    account: user,
                    status: "REPAIR SUCCESS",
                });
                // dispatch(setTicket(result.status))
                setIsLoading1(false);
                router.visit(routing("files"));
            } catch (error) {
                setIsLoading1(false);
            }
        }
    }

    async function submit_not_repaired_asc(params) {
        if (confirm("Are you sure you want to mark as unrepair the ticket?")) {
            setIsLoading2(true);
            try {
                const newData = {
                    ...form,
                    account: user,
                    status: "REPAIR UNSUCCESSFUL",
                }
                const result = await unrepair_service(form.ticket_id,newData);
                console.log("result", result);
                setIsLoading2(false);
                router.visit(routing("decision"));
            } catch (error) {
                setIsLoading2(false);
            }
        }
    }
    return (
        <div className="flex flex-col gap-6">
            <div>ASC Name: {ticket.asc?.user?.name ?? "None"}</div>
            <div>
                Address: {ticket.asc?.user?.address ?? ""},{" "}
                {ticket.asc?.user?.city ?? ""}, {ticket.asc?.user?.state ?? ""},{" "}
                {ticket.asc?.user?.zip_code ?? ""} Canada
            </div>
            <div>Email: {ticket.asc?.user?.email ?? ""}</div>
            <div>Phone: {ticket.asc?.user?.phone ?? ""}</div>
            <Input
                onChange={formHandler}
                name="repair_cost"
                required={true}
                value={form?.repair_cost ?? " "}
                label="Repair Cost"
                type="text"
                errorMessage="Repair Cost is required"
            />
            <Textarea
                required={true}
                onChange={formHandler}
                name="notes"
                value={form?.notes ?? " "}
                label="notes"
                type="text"
                errorMessage="notes is required"
            />
            <div className="flex gap-4">
                <button
                    onClick={submit_repaired_asc}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                    {isLoading1 ? <Loading /> : "REPAIRED"}
                </button>

                <button
                    onClick={submit_not_repaired_asc}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                    {isLoading2 ? <Loading /> : " NOT REPAIRED"}
                </button>
            </div>
        </div>
    );
}

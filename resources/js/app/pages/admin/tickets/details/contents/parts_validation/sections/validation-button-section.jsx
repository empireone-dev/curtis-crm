import Loading from "@/app/layouts/components/loading";
import { validation_service } from "@/app/services/email-template-service";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTemplate } from "../../../../_redux/tickets-slice";
import { router } from "@inertiajs/react";
import routing from "../../../components/routing";

export default function ValidationButtonSection() {
    const { selectedTemplate } = useSelector((state) => state.tickets);
    const { ticket } = useSelector((state) => state.tickets);
    const { user } = useSelector((state) => state.app);
    const [loading, setLoading] = useState("");
    const dispatch = useDispatch();

    async function submitValidation(value) {
        setLoading(value);
        await validation_service({
            ...selectedTemplate,
            user: user,
            mark: value,
        });
        dispatch(setSelectedTemplate({}));
        setLoading("");
        if (ticket.call_type == "CF-Warranty Claim") {
            if (value == "IW" || value == "OOW") {
                router.visit(routing("decision"));
            } else {
                router.visit(routing("files"));
            }
        } else if (ticket.call_type == "Parts") {
            if (value == "IW") {
                router.visit(routing("internals"));
            } else if (value == "OOW") {
                router.visit(routing("internals"));
            } else {
                router.visit(routing("files"));
            }
        } else {
            router.visit(routing("files"));
        }
    }

    return (
        <div className="py-4 flex gap-4">
            <button
                onClick={() => submitValidation("IW")}
                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
                {loading == "IW" ? <Loading /> : "MARK VALID - IW"}
            </button>
            <button
                onClick={() => submitValidation("OOW")}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                {loading == "OOW" ? <Loading /> : " MARK VALID - OOW"}
            </button>
            <button
                onClick={() => submitValidation("INVALID")}
                className="p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
                {loading == "INVALID" ? <Loading /> : "MARK INVALID"}
            </button>
            <button
                onClick={() => submitValidation("INCOMPLETE")}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
                {loading == "INCOMPLETE" ? <Loading /> : "MARK INCOMPLETE"}
            </button>
        </div>
    );
}

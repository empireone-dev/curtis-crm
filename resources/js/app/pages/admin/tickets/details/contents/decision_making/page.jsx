import React, { useEffect, useState } from "react";
import ReplacementSection from "./sections/replacement-section";
import RefundSection from "./sections/refund-section";
import RepairSection from "./sections/repair-section";
import { get_specific_item_service } from "@/app/services/product-search";
import { useDispatch, useSelector } from "react-redux";
import { setTicket } from "../../../_redux/tickets-slice";
import store from "@/app/store/store";
import { get_making_decision_thunk } from "../../../_redux/tickets-thunk";
import Skeleton from "@/app/layouts/components/skeleton";
import { get_email_templates_thunk } from "@/app/pages/admin/email_template/redux/email-template-thunk";

export default function TicketsDecisionMakingContent() {
    const { ticket } = useSelector((state) => state.tickets);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    async function get_specific_item() {
        const result = await get_specific_item_service(ticket);
        store.dispatch(
            get_making_decision_thunk({
                ...ticket,
                ...result,
            })
        );
        setIsLoading(false);
    }

    useEffect(() => {
        store.dispatch(get_email_templates_thunk())
        get_specific_item();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="flex flex-col gap-8">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            ) : (
                !isLoading && (
                    <>
                        <RepairSection />
                        <div className="mt-7">
                            <RefundSection />
                        </div>
                        <div className="mt-7">
                            <ReplacementSection />
                        </div>
                    </>
                )
            )}
        </div>
    );
}

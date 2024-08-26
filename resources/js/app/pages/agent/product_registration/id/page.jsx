
import store from "@/app/store/store";
import React, { useEffect } from "react";
import { get_product_registration_by_id_thunk } from "../redux/product-registration-thunk";
import ProductRegistrationIDDetailsSection from "./sections/product-registration-id-details-section";
import AgentLayout from "@/app/layouts/agent/agent-layout";

export default function ProductRegistrationIDPage({auth}) {
    useEffect(() => {
        store.dispatch(get_product_registration_by_id_thunk());
    }, []);
    return (
        <AgentLayout account={auth.user}>
            <div className="p-5">
                <ProductRegistrationIDDetailsSection />
            </div>
        </AgentLayout>
    );
}

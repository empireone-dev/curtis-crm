import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import store from "@/app/store/store";
import React, { useEffect } from "react";
import { get_product_registration_by_id_thunk } from "../redux/product-registration-thunk";
import ProductRegistrationIDDetailsSection from "./sections/product-registration-id-details-section";

export default function ProductRegistrationIDPage() {
    useEffect(() => {
        store.dispatch(get_product_registration_by_id_thunk());
    }, []);
    return (
        <AdministratorLayout>
            <div className="p-5">
                <ProductRegistrationIDDetailsSection />
            </div>
        </AdministratorLayout>
    );
}

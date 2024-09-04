
import React, { useEffect } from "react";
import ProductRegistrationTableSection from "./sections/product-registration-table-section";
import store from "@/app/store/store";
import { get_product_registration_thunk } from "./redux/product-registration-thunk";
import ProductRegistrationSearchSection from "./sections/product-registration-search-section";
import CurtisLayout from "@/app/layouts/curtis/curtis-layout";

export default function ProductRegistrationPage({auth}) {
    useEffect(() => {
        store.dispatch(get_product_registration_thunk());
    }, []);
    return (
        <CurtisLayout  account={auth.user}>
            <div className="text-xl p-3 font-bold">Products Registration Table</div>
            {/* <ProductRegistrationSearchSection /> */}
            <ProductRegistrationTableSection />
        </CurtisLayout>
    );
}


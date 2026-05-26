import React, { useEffect } from "react";
import WebFormFormSection from "./sections/web-form-section";

export default function WebFormPage() {
    useEffect(()=>{
        // if (window.confirm('First Page: Asking the customer: "Have you already registered your unit?" YES or NO button')) {
            
        // }
    },[])
    return (
        <div className="flex w-full items-center justify-center">
            <div className="max-w-7xl ">
                <WebFormFormSection />
            </div>
        </div>
    );
}

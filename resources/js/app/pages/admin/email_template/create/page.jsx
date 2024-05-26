import AdministratorLayout from "@/app/layouts/admin/administrator-layout";
import React, { useEffect, useState } from "react";
import Wysiwyg from "@/app/layouts/components/wysiwyg";
import {
    store_email_template_service,
} from "@/app/services/email-template-service";
import { Button } from "antd";
import Input from "@/app/layouts/components/input";

export default function EmailTemplatesCreatePage() {
    const [data, setData] = useState({
        template_name: "",
        template_text: " ",
    });
    const [notes, setNotes] = useState(false);
    const [loading, setLoading] = useState(false);

    async function formHandlerWysiwyg(value, name) {
        if (data.id !== 0) {
            await setData({
                ...data,
                [name]: value,
            });
        }
    }

    async function submitEvent(e) {
        e.preventDefault();
        setLoading(true);
        const result = await store_email_template_service(data);
        setNotes(true);
        setTimeout(() => {
            setData({
                template_name: "",
                template_text: " ",
            });
            setNotes(false);
            setLoading(false);
        }, 2000);
    }
    return (
        <AdministratorLayout>
            <form className="m-4" onSubmit={() => submitEvent()}>
                <div className="flex w-full text-2xl font-black items-center justify-center">
                    Create Email Template
                </div>
                {notes && (
                    <div className="text-2xl text-green-500 font-black my-8">
                        Updated Successfully!
                    </div>
                )}
                <Input
                    onChange={formHandlerWysiwyg}
                    name="template_name"
                    value={data.template_name}
                    label="Template Name"
                    type="text"
                    errorMessage="Template Name is required"
                />
                <Wysiwyg
                    label="WYSIWYG"
                    name="template_text"
                    value={data?.template_text ?? " "}
                    onChange={formHandlerWysiwyg}
                />
                <div className="mt-14">
                    <Button
                        loading={loading}
                        onClick={submitEvent}
                        type="primary"
                        size="large"
                    >
                        Create Template
                    </Button>
                </div>
            </form>
        </AdministratorLayout>
    );
}

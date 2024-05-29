import Wysiwyg from "@/app/layouts/components/wysiwyg";
import {
    get_email_template_by_id_service,
    update_email_template_service,
} from "@/app/services/email-template-service";
import { Button } from "antd";
import React, { useEffect, useState } from "react";

export default function EditEmailTemplateSection() {
    const [data, setData] = useState({
        id: 0,
        template_text: " ",
    });
    const [notes, setNotes] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function get_email_template() {
            const result = await get_email_template_by_id_service(
                window.location.pathname.split("/")[3]
            );
            setData({
                ...data,
                id: result.data.id,
                template_text: result.data.template_text,
            });
        }
        get_email_template();
    }, []);

    async function formHandlerWysiwyg(value, name) {
        if (data.id !== 0) {
            await setData({
                ...data,
                id: data.id,
                template_text: value,
            });
        }
    }

    async function submitEvent(e) {
        e.preventDefault();
        setLoading(true)
        const result = await update_email_template_service(data);
        setNotes(true);
        setTimeout(() => {
            setNotes(false);
            setLoading(false)
        }, 2000);
    }
    return (
        <form className="m-4" onSubmit={() => submitEvent()}>
            {notes && (
                <div className="text-2xl text-green-500 font-black">
                    Updated Successfully!
                </div>
            )}
            <Wysiwyg
                label="WYSIWYG"
                name="template_text"
                value={data?.template_text ?? " "}
                onChange={formHandlerWysiwyg}
            />
            <div className="mt-14">
                <Button 
                loading={loading}
                onClick={submitEvent} type="primary" size="large">
                    Save Changes
                </Button>
            </div>
        </form>
    );
}

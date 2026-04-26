import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { store_tech_call_back_service } from "@/app/services/tech-call-back-service";
import { useDispatch, useSelector } from "react-redux";
import { get_tickets_by_ticket_id } from "@/app/services/tickets-service";
import { setTicket } from "../../_redux/tickets-slice";
import { usePage } from "@inertiajs/react";

export default function RequestCallback() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false); // 1. Added loading state

    const { ticket } = useSelector((state) => state.tickets);
    const [form] = Form.useForm();
    const { url } = usePage();
    const dispatch = useDispatch();

    // Handles closing the modal and resetting the form fields
    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
    };

    // Handles the form submission
    const onFinish = async (values) => {
        setLoading(true); // 2. Start loading

        try {
            console.log("Callback Request Submitted:", values);
            await store_tech_call_back_service({
                ...ticket,
                ...values,
            });

            const ticketId = url
                .split("/")
                [url.split("/").length - 2].split("#")[0];

            const ress = await get_tickets_by_ticket_id(ticketId);
            dispatch(setTicket(ress));

            message.success("Callback requested successfully!");

            // Close modal and clear form after successful submission
            setOpen(false);
            form.resetFields();
        } catch (error) {
            console.error("Error submitting callback request:", error);
            message.error("Failed to request callback. Please try again.");
        } finally {
            setLoading(false); // 3. Stop loading whether it succeeds or fails
        }
    };

    return (
        <div>
            <Button size="large" type="primary" onClick={() => setOpen(true)}>
                Request Callback
            </Button>

            <Modal
                title="Request a Callback"
                open={open}
                onCancel={handleCancel}
                onOk={() => form.submit()}
                okText="Submit Request"
                cancelText="Cancel"
                confirmLoading={loading} // 4. Connect state to Modal's loading prop
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="callback_form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="notes"
                        label="Notes"
                        rules={[{ required: false }]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Let us know what this is regarding or the best time to call..."
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

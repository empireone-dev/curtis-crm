import React, { useState } from "react";
import { Button, Modal, Radio } from "antd";
import store from "@/app/store/store";
import {
    get_tickets_thunk,
    update_tickets_status_thunk,
} from "@/app/pages/admin/tickets/_redux/tickets-thunk";

export default function MoveTicketSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState("REFUND");
    const [loading, setLoading] = useState(false);
    const onChange = (e) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setLoading(true);
        try {
            await store.dispatch(update_tickets_status_thunk(data.id, value));
            if (window.location.hash == "") {
                await store.dispatch(get_tickets_thunk(window.location.search));
            } else {
                await store.dispatch(
                    get_tickets_thunk(
                        "?search=" + window.location.hash.slice(1)
                    )
                );
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Move Ticket
            </Button>
            <Modal
                confirmLoading={loading}
                title={`Move ticket ${data?.ticket_id ?? ""}`}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value="REFUND">REFUND</Radio>
                    <Radio value="REPLACEMENT">REPLACEMENT</Radio>
                </Radio.Group>
            </Modal>
        </>
    );
}

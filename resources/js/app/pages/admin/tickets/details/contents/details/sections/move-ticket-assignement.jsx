import { parts_initial, warranty_initial } from "@/app/json/initial-templates";
import { move_ticket_assignment_service } from "@/app/services/tickets-service";
import { router } from "@inertiajs/react";
import { Modal, Select } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function MoveTicketAssignement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { ticket } = useSelector((state) => state.tickets);
    const [callType, setCallType] = useState("");

    const showModal = () => {
        setIsModalOpen(true);
    };
    const warranty = warranty_initial(ticket);
    const parts = parts_initial(ticket);

    async function handleOk() {
        setIsLoading(true);
        await move_ticket_assignment_service({
            ticket_id: ticket.id,
            call_type: callType,
            body: callType == "Parts" ? parts : warranty,
            subject: ticket.ticket_id,
            recipient: ticket.email,
        });
        if (callType == "TS-Tech Support") {
            router.visit("status");
        } else {
            router.visit("files");
        }
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChange = (value) => {
        setCallType(value);
        console.log(`selected ${value}`);
    };

    return (
        <div>
            <button
                onClick={showModal}
                className="bg-green-500 p-2 text-white  hover:bg-green-600  w-48"
            >
                <div className="p-1 w-full flex items-center justify-center">
                    MOVE TICKET
                </div>
            </button>
            <Modal
                confirmLoading={isLoading}
                title="Move Ticket Assignment"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Select
                    className="w-full"
                    defaultValue={callType}
                    onChange={handleChange}
                    options={[
                        ...(ticket.call_type !== "CF-Warranty Claim"
                            ? [
                                  {
                                      value: "CF-Warranty Claim",
                                      label: "CF-Warranty Claim",
                                  },
                              ]
                            : []),
                        ...(ticket.call_type !== "Parts"
                            ? [{ value: "Parts", label: "Parts" }]
                            : []),
                        ...(ticket.call_type !== "TS-Tech Support"
                            ? [
                                  {
                                      value: "TS-Tech Support",
                                      label: "TS-Tech Support",
                                  },
                              ]
                            : []),
                    ]}
                />
            </Modal>
        </div>
    );
}

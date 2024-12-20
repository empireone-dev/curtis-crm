import React, { useState } from "react";
import { Button, Modal, Select } from "antd";
import Input from "@/app/layouts/components/input";
import { store_users_service } from "@/app/services/user-service";
import { useDispatch } from "react-redux";
import { setUsers } from "../redux/users-slice";

export default function UsersCreateSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const showModal = () => {
        setIsModalOpen(true);
    };

    console.log("result", form);
    async function handleOk(params) {
        const result = await store_users_service(form);
        if (result.status == "exist") {
            alert("Email is already exist!");
        } else {
            dispatch(setUsers(result.status));
            setForm({});
            setIsModalOpen(false);
        }
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function formHandler(value, name) {
        if ((value || value == "") && name) {
            setForm({
                ...form,
                [name]: value,
            });
        }
    }
    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Create Account
            </Button>
            <Modal
                okText="Submit"
                title="Account Information"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="py-3 flex flex-col gap-4">
                    <Select
                        className="border border-gray-500 rounded-md-"
                        size="large"
                        placeholder="Select Position"
                        optionFilterProp="label"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                agent_type: e,
                            })
                        }
                        options={[
                            {
                                value: null,
                                label: "Admin",
                            },
                            {
                                value: "CSR",
                                label: "CSR",
                            },
                            {
                                value: "Warranty",
                                label: "Warranty Claim",
                            },
                            {
                                value: "Tech",
                                label: "Tech Support",
                            },
                            {
                                value: "Parts",
                                label: "Parts",
                            },
                        ]}
                    />
                    <Input
                        onChange={formHandler}
                        name="emp_id"
                        required={true}
                        value={form?.emp_id}
                        label="Employee ID"
                        type="text"
                        errorMessage="Employee ID is required"
                    />
                    <Input
                        onChange={formHandler}
                        name="email"
                        required={true}
                        value={form?.email}
                        label="Email"
                        type="email"
                        errorMessage="Email is required"
                    />
                    <Input
                        onChange={formHandler}
                        name="name"
                        required={true}
                        value={form?.name}
                        label="Fullname"
                        type="text"
                        errorMessage="Fullname is required"
                    />
                </div>
            </Modal>
        </div>
    );
}

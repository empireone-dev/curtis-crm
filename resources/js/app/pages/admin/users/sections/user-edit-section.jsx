import Drawer from "@/app/layouts/components/drawer";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { update_users_thunk } from "../redux/users.thunk";
import store from "@/app/store/store";
import Modal from "antd/es/modal/Modal";
import { Select } from "antd";
import Input from "@/app/layouts/components/input";
import { message } from 'antd';

export default function UserEditSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({});
    const [messageApi, contextHolder] = message.useMessage();

    const handleCancel = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        setForm(data);
    }, []);

    async function handleOk(params) {
        const result = await store.dispatch(update_users_thunk(form));
            setIsModalOpen(false);
            messageApi.success('Updated Successfully!');
    }
    const showModal = () => {
        setIsModalOpen(true);
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
        <>
            <button onClick={() => showModal()}>
                <PencilIcon className="h-5 text-green-500" />
            </button>
            {contextHolder}
            <Modal
                okText="Submit"
                title="Edit Account Information"
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
                        defaultValue={form.agent_type}
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
        </>
    );
}

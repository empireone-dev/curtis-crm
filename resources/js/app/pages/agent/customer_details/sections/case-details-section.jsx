import { transfer_ticket_cases_service } from "@/app/services/tickets-service";
import { router } from "@inertiajs/react";
import { Button } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function CaseDetailsSection() {
    const { users } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.app);
    const [data, setData] = useState({});
    const ticket_id = window.location.pathname.split("/")[3];
    const [loading, setLoading] = useState(false);
    async function re_assign(params) {
        setLoading(true);
        const newData = {
            ...data,
            ticket_id: ticket_id,
        };
        await transfer_ticket_cases_service(newData);
        router.visit("/agent/open_cases?page=1");
    }
    return (
        <div>
            <div class="text-gray-600 mb-2">
                <p class="font-medium text-lg">Case Details</p>
            </div>
            <h1>
                <b>Currently assigned to:</b> Regine
            </h1>
            <div class="md:col-span-5 mt-3">
                <label>Reassigned to</label>
                <select
                    onChange={(e) =>
                        setData({
                            ...data,
                            user_id: e.target.value,
                        })
                    }
                    id="countries"
                    class="bg-gray-50 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                    <option disabled selected>
                        Select
                    </option>
                    {users.map((res, i) => {
                        if (res.agent_type === user.agent_type) {
                            return (
                                <option key={res.id} value={res.id}>
                                    {res.name}
                                </option>
                            );
                        }
                        return null; // Ensure there's a return value in all branches
                    })}
                </select>
            </div>
            <Button
                loading={loading}
                onClick={() => re_assign()}
                type="primary"
                className="my-3 w-full"
                danger
            >
                Reassign
            </Button>
        </div>
    );
}

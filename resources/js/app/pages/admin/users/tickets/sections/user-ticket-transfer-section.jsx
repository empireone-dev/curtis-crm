import Loading from "@/app/layouts/components/loading";
import Modal from "@/app/layouts/components/modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import reasons from "@/app/json/reason.json";
import Select from "@/app/layouts/components/select";
import store from "@/app/store/store";
import { transfer_ticket_service } from "@/app/services/user-service";
import { get_tickets_by_user_id_thunk } from "@/app/pages/customer/tickets/redux/customer-tickets-thunk";

export default function UserTicketTransferSection({ selected }) {
    const account_id = window.location.pathname.split("/")[3];
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { users } = useSelector((state) => state.users);
    const [agent, setAgent] = useState("");
    const { user } = useSelector((state) => state.app);

    async function close_ticket(e) {
        e.preventDefault();
        setIsLoading(true);
        if (agent) {
            try {
                await transfer_ticket_service({
                    user: user,
                    selected: selected,
                    agent: agent,
                    account_id: account_id,
                });
                await store.dispatch(get_tickets_by_user_id_thunk(account_id));
                setIsLoading(false);
                setOpen(false);
            } catch (error) {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }
    function formHandler(user_id) {
        setAgent(user_id);
    }
    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="p-3 w-52 bg-blue-500 text-white rounded-sm hover:to-blue-600 my-4"
            >
                TRANSFER TICKETS
            </button>
            <Modal open={open} setOpen={setOpen} title="Transfer Ticket(s)">
                <form onSubmit={close_ticket}>
                    {selected.length} ticket(s) will be transfer!
                    <div className="my-4">
                        <Select
                            required={true}
                            onChange={formHandler}
                            name="agent"
                            value={agent}
                            label="Select Agent"
                            errorMessage="Agent is required"
                            data={[
                                {
                                    name: "",
                                    value: "",
                                },
                                ...users
                                    .filter((res) => account_id != res.id)
                                    .map((res) => ({
                                        name: res.name,
                                        value: res.id,
                                    })),
                            ]}
                        />
                    </div>
                    <div className="flex border-gray-200 rounded-b  mt-3.5">
                        <button
                            onClick={close_ticket}
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                        >
                            {isLoading ? (
                                <div className="py-1.5">
                                    <Loading />
                                </div>
                            ) : (
                                "Yes, Proceed"
                            )}
                        </button>
                        <button
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100     "
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

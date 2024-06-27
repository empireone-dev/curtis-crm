import Loading from "@/app/layouts/components/loading";
import Modal from "@/app/layouts/components/modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import reasons from "@/app/json/reason.json";
import Select from "@/app/layouts/components/select";
import { create_ticket_close_service } from "@/app/services/tickets-service";
import { router } from "@inertiajs/react";
import routing from "../../details/components/routing";
export default function TicketCloseSection({ data }) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reason, setReason] = useState("");
    const { user } = useSelector((state) => state.app);
    const { ticket } = useSelector((state) => state.tickets);
console.log('user',user)
    async function close_ticket(e) {
        e.preventDefault();
        setIsLoading(true);
        if (reason) {
            try {
                const response= await create_ticket_close_service({
                    ...data,
                    reason:reason
                })
                setIsLoading(false);
                if (user.role_id == 1) {
                    router.visit(`/administrator/tickets?search=` + response?.ticket_id);
                }else{
                    router.visit(`/agent/tickets?search=` + response?.ticket_id);
                }
                
            } catch (error) {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }

    function formHandler(value) {
        setReason(value);
    }
    async function click_close(e) {
        e.preventDefault()
        if ((data.fname == null || data.fname == '' || data.fname == undefined) || (data.phone == null || data.phone == '' || data.phone == undefined) || (data.remarks == null || data.remarks == ''|| data.remarks == undefined)) {
            alert('Name, Phone Number & Remarks must be required!')
        }else{
            setOpen(true)
        }
        //
    }
    return (
        <div>
            <button
                type="button"
                onClick={(e) =>click_close(e)}
                className="p-3 w-36 bg-red-500 text-white rounded-sm hover:to-red-600"
            >
                CLOSE
            </button>
            <Modal open={open} setOpen={setOpen} title="Close Ticket">
                <form onSubmit={close_ticket}>
                    <div className="text-lg">Ticket ID: {data.ticket_id}</div>
                    Are you sure you want to close the ticket?
                    <div className="my-4">
                        <Select
                            required={true}
                            onChange={formHandler}
                            name="reason"
                            value={reason}
                            label="Reason to Close"
                            errorMessage="Reason is required"
                            data={reasons.map((res) => ({
                                name: res.name,
                                value: res.value,
                            }))}
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

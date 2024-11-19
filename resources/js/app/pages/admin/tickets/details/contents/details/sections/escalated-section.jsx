import Loading from "@/app/layouts/components/loading";
import { escalated_service } from "@/app/services/tickets-service";
import React, { useEffect, useState } from "react";

export default function EscalatedSection({ data }) {
    const [loading, setLoading] = useState(false);
    const [notif, setNotif] = useState(false);

    useEffect(() => {
        if (notif) {
            setTimeout(() => {
                setNotif(false);
            }, [2000]);
        }
    }, [notif]);

    async function escalated_button(params) {
        setLoading(true);
        try {
            await escalated_service(data);
            setLoading(false);
            setNotif(true);
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <div>
            <button
                onClick={escalated_button}
                className="bg-red-800 p-2 text-white  hover:bg-red-900 flex items-center justify-center w-64"
            >
                {loading ? (
                    <div className="py-2">
                        <Loading />
                    </div>
                ) : (
                    <div className="p-1 w-full flex items-center justify-center">
                        {notif ? (
                            <div className="text-white uppercase text-xs py-1">
                                The casefile has been escalated.
                            </div>
                        ) : (
                            "ESCALATED"
                        )}
                    </div>
                )}
            </button>
        </div>
    );
}

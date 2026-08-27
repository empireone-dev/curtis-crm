import React from 'react'
import axios from 'axios'

export default function Page() {

    async function submit() {
        const token = "ZXZtnyAKALO4FHsBwbflth7aYyb7IC9RLHbdXY8tebAqgykx09IeWp3R5fHy"; // Replace with your token (or fetch from localStorage/env)

        try {
            const response = await axios.post(
                '/api/tickets', 
                {
                    "phone": "(222) 222-2222",
                    "item_number": "EFIC228-SF",
                    "unit": "33LBS NUGGET ICE MAKER - STAINLESS STEEL",
                    "brand": "Frigidaire",
                    "class": "Appliance",
                    "purchase_date": "2026-04-29",
                    "remarks": "Warranty eligibility confirmed; webform referral delivered and caller confirmed nothing else needed.",
                    "call_type": "CF-Warranty Claim",
                    "isSendEmail": false,
                    "isHasEmail": false,
                    "created_from": "AGENT FORM"
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Success:", response.data);
        } catch (error) {
            console.error("Error submitting ticket:", error);
        }
    }

    return (
        <div>
            <button onClick={submit}>
                CLICK ME
            </button>
        </div>
    )
}
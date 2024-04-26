import axios from "axios"

export async function store_receipt_service(data){
    const res = await axios.post('/api/receipt',data)
    return res.data
}

export async function get_receipt_by_ticket_id_service(ticketid){
    const res = await axios.get('/api/receipt/'+ticketid)
    return res.data
}
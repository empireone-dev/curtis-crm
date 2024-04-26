export async function store_decision_making_refund_service(data){
    const res = await axios.post('/api/refund',data)
    return res.data
}


export async function get_decision_making_refund_by_id_service(ticket_id){
    const res = await axios.get(`/api/replacement/${ticket_id}`)
    return res.data.status
}

export async function patch_warranty_checkque_shipped_service(data){
    const res = await axios.post('/api/warranty_checkque_shipped',data)
    return res.data
}



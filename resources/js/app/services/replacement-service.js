export async function store_decision_making_replacement_service(data){
    const res = await axios.post('/api/replacement',data)
    return res.data
}

export async function get_decision_making_replacement_by_id_service(ticket_id){
    const res = await axios.get(`/api/replacement/${ticket_id}`)
    return res.data.status
}

export async function parts_replacement_shipped_service(data){
    const res = await axios.post('/api/parts_replacement_shipped',data)
    return res.data
}


export async function parts_replacement_not_shipped_service(data){
    const res = await axios.post('/api/parts_replacement_not_shipped',data)
    return res.data
}

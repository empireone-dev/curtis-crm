export async function store_internals_service(data){
    const res = await axios.post('/api/internals',data)
    return res.data
}

export async function get_internals_by_ticket_id_service(ticket_id){
    const res = await axios.get('/api/internals/'+ticket_id)
    return res.data
}
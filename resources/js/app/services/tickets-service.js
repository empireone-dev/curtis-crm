export async function get_tickets_service(query){
    const ticket_id = query??''
    const res = await axios.get('/api/tickets?ticket_id='+ticket_id)
    return res.data.result
}

export async function store_tickets_service(data){
    const res = await axios.post('/api/tickets',data)
    return res.data.result
}